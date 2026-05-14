import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateRetroAgenda } from '../lib/ai';
import { RetroSession, AgendaItem } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { getEntriesBySprintId } from '../lib/storage';

const priorityColor: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

const typeEmoji: Record<string, string> = {
  Blocker: '🚧',
  Improvement: '💡',
  Win: '🏆',
  Risk: '⚠️',
  Question: '❓',
};

export default function RetroAgendaTab() {
  const { currentSprint, session, upsertSession, updateAgendaItem } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const agendaItems = session?.agendaItems ?? [];

  const handleGenerate = async () => {
    const entries = getEntriesBySprintId(currentSprint);
    if (entries.length === 0) {
      setError('No daily notes found for this sprint. Add some notes first!');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const items = await generateRetroAgenda(
        entries.map((e) => ({ role: e.memberRole, text: e.text }))
      );
      const newSession: RetroSession = {
        id: `session-${currentSprint}`,
        sprintId: currentSprint,
        generatedAt: new Date().toISOString(),
        agendaItems: items,
        actionItems: session?.actionItems ?? [],
      };
      upsertSession(newSession);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate agenda');
    } finally {
      setLoading(false);
    }
  };

  const selectedCount = agendaItems.filter((a) => a.selected).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">AI Retro Gündemi</h2>
            <p className="text-sm text-gray-500 mt-1">
              AI tüm sprint notlarını okur, anonimleştirir, temelere gruplar ve önceliklendirir.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="shrink-0 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            {loading ? 'Oluşturuluyor…' : agendaItems.length > 0 ? '↻ Yeniden Oluştur' : 'Retro Gündemi Oluştur'}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
      </div>

      {loading && <LoadingSpinner text="AI is analyzing your team notes…" />}

      {!loading && agendaItems.length > 0 && (
        <>
          <p className="text-sm text-gray-500">
            Aksiyon oluşturmak istediğiniz gündem maddelerini seçin. <strong>{selectedCount}</strong> adet seçili.
          </p>
          <div className="space-y-3">
            {agendaItems.map((item: AgendaItem) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl border shadow-sm p-4 transition-all ${item.selected ? 'border-indigo-300' : 'border-gray-100 opacity-60'}`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={(e) => updateAgendaItem(item.id, { selected: e.target.checked })}
                    className="mt-1 w-4 h-4 accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base">{typeEmoji[item.type] ?? '📌'}</span>
                      <span className="font-semibold text-gray-800 text-sm">{item.theme}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColor[item.priority]}`}>
                        {item.priority}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.type}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && agendaItems.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🧠</p>
          <p className="text-sm">Takımınızın notlarını AI&apos;ın analiz etmesi için Retro Gündemi Oluştur&apos;a tıklayın.</p>
        </div>
      )}
    </div>
  );
}
