import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DailyEntry } from '../types';
import { getEntriesBySprintId } from '../lib/storage';

export default function DailyNotesTab() {
  const { members, currentSprint, addEntry } = useApp();
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id ?? '');
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!text.trim()) return;
    const member = members.find((m) => m.id === selectedMemberId);
    if (!member) return;
    const entry: DailyEntry = {
      id: `entry-${Date.now()}`,
      memberId: member.id,
      memberRole: member.role,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      sprintId: currentSprint,
    };
    addEntry(entry);
    setText('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const allEntries = getEntriesBySprintId(currentSprint);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Günlük Notlar</h2>
        <p className="text-sm text-gray-500">İstediğiniz şeyi yazın — blokaj, kazanım, sorun, fikir. Format şart değil.</p>

        <select
          value={selectedMemberId}
          onChange={(e) => setSelectedMemberId(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {members.map((m) => (
            <option key={m.id} value={m.id}>{m.name} — {m.role}</option>
          ))}
        </select>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Örn. Deployment pipeline tekrar patladı, 3 saat uğraştık. Zeynep ile güzel bir pair programming yaptık..."
          rows={5}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Notu Kaydet
          </button>
          {saved && <span className="text-green-600 text-sm font-medium">Kaydedildi!</span>}
        </div>
      </div>

      {allEntries.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {currentSprint} — {allEntries.length} not
          </h3>
          {[...allEntries].reverse().map((entry) => {
            const member = members.find((m) => m.id === entry.memberId);
            return (
              <div key={entry.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {member?.role ?? 'Unknown'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(entry.createdAt).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{entry.text}</p>
              </div>
            );
          })}
        </div>
      )}

      {allEntries.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🌱</p>
          <p className="text-sm">{currentSprint} için henüz not yok. İlk yazan sen ol!</p>
        </div>
      )}
    </div>
  );
}
