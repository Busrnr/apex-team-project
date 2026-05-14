import { useState } from 'react'
import { useApp } from './context/AppContext'
import DailyNotesTab from './components/DailyNotesTab'
import RetroAgendaTab from './components/RetroAgendaTab'
import ActionItemsTab from './components/ActionItemsTab'
import NextRetroTab from './components/NextRetroTab'

type TabId = 'notes' | 'agenda' | 'actions' | 'reminder';

const tabs: { id: TabId; label: string; emoji: string; desc: string }[] = [
  { id: 'notes', label: 'Günlük Notlar', emoji: '', desc: 'Günlük notlarınızı ekleyin' },
  { id: 'agenda', label: 'Retro Gündemi', emoji: '', desc: 'AI ile gündem oluşturun' },
  { id: 'actions', label: 'Aksiyonlar', emoji: '⚡', desc: 'Aksiyon maddeleri üretin' },
  { id: 'reminder', label: 'Sonraki Retro', emoji: '', desc: 'Önceki sprint hatırlatması' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('notes');
  const { currentSprint, setCurrentSprint } = useApp();
  const [sprintInput, setSprintInput] = useState(currentSprint);

  const handleSprintChange = () => {
    if (sprintInput.trim()) {
      setCurrentSprint(sprintInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Retrocell
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">AI Destekli Retrospektif Aracı</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={sprintInput}
              onChange={(e) => setSprintInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSprintChange()}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 w-32 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Sprint ID"
            />
            <button
              onClick={handleSprintChange}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              Değiştir
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'text-indigo-700 bg-slate-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Sprint badge */}
      <div className="max-w-5xl mx-auto px-4 pt-4">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
          {currentSprint}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'notes' && <DailyNotesTab />}
        {activeTab === 'agenda' && <RetroAgendaTab />}
        {activeTab === 'actions' && <ActionItemsTab />}
        {activeTab === 'reminder' && <NextRetroTab />}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-gray-400">
          Retrocell — AI Destekli Retrospektif Aracı
        </p>
      </footer>
    </div>
  )
}
