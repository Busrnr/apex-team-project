import React, { createContext, useContext, useState, useCallback } from 'react';
import { TeamMember, DailyEntry, RetroSession, AgendaItem, ActionItem } from '../types';
import {
  getMembers, getEntries, saveEntry, getEntriesBySprintId,
  getSessions, saveSession, getSessionBySprintId, getCurrentSprint, setCurrentSprint,
} from '../lib/storage';

interface AppContextValue {
  members: TeamMember[];
  entries: DailyEntry[];
  currentSprint: string;
  session: RetroSession | undefined;
  setCurrentSprint: (s: string) => void;
  addEntry: (entry: DailyEntry) => void;
  refreshEntries: () => void;
  upsertSession: (session: RetroSession) => void;
  updateAgendaItem: (id: string, changes: Partial<AgendaItem>) => void;
  updateActionItem: (id: string, changes: Partial<ActionItem>) => void;
  allSessions: RetroSession[];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [members] = useState<TeamMember[]>(getMembers);
  const [entries, setEntries] = useState<DailyEntry[]>(getEntries);
  const [sprint, setSprint] = useState<string>(getCurrentSprint);
  const [sessions, setSessions] = useState<RetroSession[]>(getSessions);

  const session = sessions.find((s) => s.sprintId === sprint);

  const changeSprint = useCallback((s: string) => {
    setCurrentSprint(s);
    setSprint(s);
  }, []);

  const addEntry = useCallback((entry: DailyEntry) => {
    saveEntry(entry);
    setEntries(getEntries());
  }, []);

  const refreshEntries = useCallback(() => setEntries(getEntries()), []);

  const upsertSession = useCallback((s: RetroSession) => {
    saveSession(s);
    setSessions(getSessions());
  }, []);

  const updateAgendaItem = useCallback((id: string, changes: Partial<AgendaItem>) => {
    const current = getSessionBySprintId(sprint);
    if (!current) return;
    const updated: RetroSession = {
      ...current,
      agendaItems: current.agendaItems.map((a) => (a.id === id ? { ...a, ...changes } : a)),
    };
    saveSession(updated);
    setSessions(getSessions());
  }, [sprint]);

  const updateActionItem = useCallback((id: string, changes: Partial<ActionItem>) => {
    const current = getSessionBySprintId(sprint);
    if (!current) return;
    const updated: RetroSession = {
      ...current,
      actionItems: current.actionItems.map((a) => (a.id === id ? { ...a, ...changes } : a)),
    };
    saveSession(updated);
    setSessions(getSessions());
  }, [sprint]);

  const sprintEntries = entries.filter((e) => e.sprintId === sprint);

  return (
    <AppContext.Provider value={{
      members,
      entries: sprintEntries,
      currentSprint: sprint,
      session,
      setCurrentSprint: changeSprint,
      addEntry,
      refreshEntries,
      upsertSession,
      updateAgendaItem,
      updateActionItem,
      allSessions: sessions,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export { getEntriesBySprintId };
