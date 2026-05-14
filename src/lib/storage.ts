import { TeamMember, DailyEntry, RetroSession } from '../types';

const MEMBERS_KEY = 'retro_members';
const ENTRIES_KEY = 'retro_entries';
const SESSIONS_KEY = 'retro_sessions';
const CURRENT_SPRINT_KEY = 'retro_current_sprint';

export function getMembers(): TeamMember[] {
  const raw = localStorage.getItem(MEMBERS_KEY);
  if (raw) return JSON.parse(raw);
  const defaults: TeamMember[] = [
    { id: '1', name: 'Ahmet', role: 'Backend Dev' },
    { id: '2', name: 'Zeynep', role: 'Frontend Dev' },
    { id: '3', name: 'Can', role: 'QA Engineer' },
    { id: '4', name: 'Selin', role: 'Scrum Master' },
  ];
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(defaults));
  return defaults;
}

export function getEntries(): DailyEntry[] {
  const raw = localStorage.getItem(ENTRIES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveEntry(entry: DailyEntry): void {
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export function getEntriesBySprintId(sprintId: string): DailyEntry[] {
  return getEntries().filter((e) => e.sprintId === sprintId);
}

export function getSessions(): RetroSession[] {
  const raw = localStorage.getItem(SESSIONS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveSession(session: RetroSession): void {
  const sessions = getSessions().filter((s) => s.sprintId !== session.sprintId);
  sessions.push(session);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function getSessionBySprintId(sprintId: string): RetroSession | undefined {
  return getSessions().find((s) => s.sprintId === sprintId);
}

export function getLastSession(): RetroSession | undefined {
  const sessions = getSessions();
  return sessions[sessions.length - 1];
}

export function getCurrentSprint(): string {
  return localStorage.getItem(CURRENT_SPRINT_KEY) || 'Sprint-1';
}

export function setCurrentSprint(sprintId: string): void {
  localStorage.setItem(CURRENT_SPRINT_KEY, sprintId);
}
