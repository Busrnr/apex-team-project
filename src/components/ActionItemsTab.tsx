import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateActionItems } from '../lib/ai';
import { RetroSession } from '../types';
import LoadingSpinner from './LoadingSpinner';

const priorityColor: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

const statusStyle: Record<string, string> = {
  open: 'bg-blue-50 text-blue-700',
  done: 'bg-green-50 text-green-700',
  forgotten: 'bg-gray-100 text-gray-500',
};

export default function ActionItemsTab() {
  const { members, currentSprint, session, upsertSession, updateActionItem } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const actionItems = session?.actionItems ?? [];
  const selectedAgenda = session?.agendaItems.filter((a) => a.selected) ?? [];

  const handleGenerate = async () => {
    if (selectedAgenda.length === 0) {
      setError('Lütfen önce Retro Gündemi sekmesinden en az bir gündem maddesi seçin.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const items = await generateActionItems(selectedAgenda, members, currentSprint);
      const updated: RetroSession = {
        ...(session ?? {
          id: `session-${currentSprint}`,
          sprintId: currentSprint,
          generatedAt: new Date().toISOString(),
          agendaItems: [],
        }),
        actionItems: items,
      };
      upsertSession(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate actions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Aksiyonlar</h2>
            <p className="text-sm text-gray-500 mt-1">
              AI seçili gündem maddelerinden somut, sahibi atanmış aksiyonlar üretir.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="shrink-0 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            {loading ? 'Oluşturuluyor…' : 'Aksiyonları Oluştur'}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
      </div>

      {loading && <LoadingSpinner text="AI is creating action items…" />}

      {!loading && actionItems.length > 0 && (
        <div className="space-y-3">
          {actionItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-gray-400 font-medium">{item.agendaItemTheme}</p>
                  <p className="text-sm text-gray-800 leading-relaxed font-medium">{item.action}</p>
                </div>
                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${priorityColor[item.priority]}`}>
                  {item.priority}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Sahip:</span>
                  <select
                    value={item.assignedOwner}
                    onChange={(e) => updateActionItem(item.id, { assignedOwner: e.target.value })}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                    <option value={item.suggestedOwner}>{item.suggestedOwner}</option>
                  </select>
                  {item.assignedOwner === item.suggestedOwner && (
                    <span className="text-xs text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded">AI önerdi</span>
                  )}
                </div>

                <div className="flex items-center gap-1 ml-auto">
                  {(['open', 'done', 'forgotten'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateActionItem(item.id, { status: s })}
                      className={`text-xs px-2 py-1 rounded-lg font-medium transition-colors ${item.status === s ? statusStyle[s] : 'text-gray-400 hover:bg-gray-100'}`}
                    >
                      {s === 'open' ? '🔵 Açık' : s === 'done' ? '✅ Tamamlandı' : '😶 Unutuldu'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && actionItems.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">⚡</p>
          <p className="text-sm">Önce Retro Gündemi sekmesinden madde seçin, sonra Aksiyonları Oluştur&apos;a tıklayın.</p>
        </div>
      )}
    </div>
  );
}
