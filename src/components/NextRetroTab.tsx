import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateReminder } from '../lib/ai';
import { ReminderData, ActionItem } from '../types';
import LoadingSpinner from './LoadingSpinner';

export default function NextRetroTab() {
  const { allSessions, currentSprint } = useApp();
  const [reminder, setReminder] = useState<ReminderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const prevSessions = allSessions.filter((s) => s.sprintId !== currentSprint);
  const lastSession = prevSessions[prevSessions.length - 1];
  const prevActions = lastSession?.actionItems ?? [];

  const handleGenerate = async () => {
    if (prevActions.length === 0) {
      setError('Önceki aksiyon bulunamadı. Önce bir retro tamamlayın!');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await generateReminder(prevActions);
      setReminder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hatırlatma oluşturulamadı');
    } finally {
      setLoading(false);
    }
  };

  const statCards = reminder
    ? [
        { label: 'Tamamlandı', count: reminder.completedCount, color: 'bg-green-50 text-green-700', icon: '✅' },
        { label: 'Hâlâ Açık', count: reminder.openCount, color: 'bg-blue-50 text-blue-700', icon: '🔵' },
        { label: 'Unutuldu', count: reminder.forgottenCount, color: 'bg-red-50 text-red-700', icon: '😶' },
      ]
    : [];

  function statusLabel(s: ActionItem['status']) {
    if (s === 'done') return 'Tamamlandı';
    if (s === 'forgotten') return 'Unutuldu';
    return 'Açık';
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Sonraki Retro Hatırlatması</h2>
            <p className="text-sm text-gray-500 mt-1">
              AI takıma önceki sprintte verilen sözleri ve hâlâ çözülmemiş ne olduğunu hatırlatır.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="shrink-0 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            {loading ? 'Oluşturuluyor…' : 'Hatırlatma Oluştur'}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
      </div>

      {loading && <LoadingSpinner text="AI retro hatırlatması hazırlıyor…" />}

      {!loading && reminder && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {statCards.map((s) => (
              <div key={s.label} className={`rounded-xl p-4 text-center ${s.color}`}>
                <p className="text-2xl font-bold">{s.count}</p>
                <p className="text-xs font-medium mt-1">{s.icon} {s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-sm text-gray-800 leading-relaxed">{reminder.reminderText}</p>
          </div>

          {reminder.highlight && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
              <span className="text-lg">🚨</span>
              <div>
                <p className="text-xs font-semibold text-red-700 mb-1">En Kritik Çözümsüz</p>
                <p className="text-sm text-red-800">{reminder.highlight}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && prevActions.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {lastSession?.sprintId} — Önceki Aksiyonlar
          </h3>
          {prevActions.map((a) => (
            <div key={a.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex items-center justify-between gap-3">
              <p className="text-sm text-gray-700 flex-1">{a.action}</p>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-500">{a.assignedOwner}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  a.status === 'done' ? 'bg-green-100 text-green-700'
                  : a.status === 'forgotten' ? 'bg-gray-100 text-gray-500'
                  : 'bg-blue-100 text-blue-700'
                }`}>
                  {statusLabel(a.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && prevActions.length === 0 && !reminder && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔮</p>
          <p className="text-sm">Aksiyonları olan bir retro tamamlayın, sonra bir sonraki retro öncesinde buraya dönün.</p>
        </div>
      )}
    </div>
  );
}
