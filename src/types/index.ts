export type MemberRole = 'Backend Dev' | 'Frontend Dev' | 'QA Engineer' | 'Scrum Master' | 'DevOps';

export interface TeamMember {
  id: string;
  name: string;
  role: MemberRole;
}

export interface DailyEntry {
  id: string;
  memberId: string;
  memberRole: MemberRole;
  text: string;
  createdAt: string;
  sprintId: string;
}

export interface AgendaItem {
  id: string;
  theme: string;
  summary: string;
  priority: 'High' | 'Medium' | 'Low';
  type: 'Blocker' | 'Improvement' | 'Win' | 'Risk' | 'Question';
  selected: boolean;
}

export interface ActionItem {
  id: string;
  agendaItemTheme: string;
  action: string;
  suggestedOwner: string;
  assignedOwner: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'open' | 'done' | 'forgotten';
  sprintId: string;
}

export interface RetroSession {
  id: string;
  sprintId: string;
  generatedAt: string;
  agendaItems: AgendaItem[];
  actionItems: ActionItem[];
}

export interface ReminderData {
  reminderText: string;
  completedCount: number;
  openCount: number;
  forgottenCount: number;
  highlight: string;
}
