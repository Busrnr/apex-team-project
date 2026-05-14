import { AgendaItem, ActionItem, ReminderData } from '../types';

const USE_MOCK = !import.meta.env.VITE_OPENAI_API_KEY;

const mockAgenda: AgendaItem[] = [
  { id: 'a1', theme: 'Deployment Pipeline Kararsızlığı', summary: 'CI/CD pipeline sürekli patlıyor, birden fazla ekip üyesinin saati gidiyor ve teslimat yavaşlıyor.', priority: 'High', type: 'Blocker', selected: true },
  { id: 'a2', theme: 'Net Olmayan Sürekli Değişen İsterler', summary: 'Sprint ortasında sık sık ister değişikliği olunca rework artıyor ve ne yapılacağına dair belirsizlik oluşuyor.', priority: 'High', type: 'Risk', selected: true },
  { id: 'a3', theme: 'QA Ortamının Güvenilmezliği', summary: 'QA ortamı kararsız, sorun sahibi belli değil ve testleri yapmak zorlaşıyor.', priority: 'Medium', type: 'Blocker', selected: true },
  { id: 'a4', theme: 'Olumlu: Ekip Arası İşbirliği', summary: 'Pair programming seansları çok verimli geçti, daha sık yapılmalı.', priority: 'Low', type: 'Win', selected: true },
];

const mockActions: ActionItem[] = [
  { id: 'ac1', agendaItemTheme: 'Deployment Pipeline Kararsızlığı', action: 'Pipeline review toplantısı planlanacak ve CI/CD stabilitesi için bir sorumlu atanacak.', suggestedOwner: 'Ahmet', assignedOwner: 'Ahmet', priority: 'High', status: 'open', sprintId: '' },
  { id: 'ac2', agendaItemTheme: 'Net Olmayan Sürekli Değişen İsterler', action: 'Sprint başlamadan 3 gün önce ister dondurma uygulanacak; Product Owner değişiklikleri onaylamak zorunda olacak.', suggestedOwner: 'Selin', assignedOwner: 'Selin', priority: 'High', status: 'open', sprintId: '' },
  { id: 'ac3', agendaItemTheme: 'QA Ortamının Güvenilmezliği', action: 'Can QA ortamı sahibi olarak atanacak; ortam sorunları için nöbet listesi oluşturulacak.', suggestedOwner: 'Can', assignedOwner: 'Can', priority: 'Medium', status: 'open', sprintId: '' },
  { id: 'ac4', agendaItemTheme: 'Olumlu: Ekip Arası İşbirliği', action: 'Her sprintte en az bir pair-programming seansı planlanacak ve öğrenilenler not alınacak.', suggestedOwner: 'Zeynep', assignedOwner: 'Zeynep', priority: 'Low', status: 'open', sprintId: '' },
];

const mockReminder: ReminderData = {
  reminderText: 'Sprint 2 retro suna hosgeldiniz! Gecen sprint 4 aksiyon uzerine soz verdik. Mujde — pair programming hedefimiz tamamlandi. Ancak deployment pipeline duzeltme ve ister dondurma sureci halen acik. QA ortam sahipligi ne yazik ki unutuldu. Bu sprint bunlarin tekrar aradan kaymamasini saglayalim!',
  completedCount: 1,
  openCount: 2,
  forgottenCount: 1,
  highlight: 'Deployment Pipeline Kararsizligi — Backend Dev sahibi, 2 sprintir cozulmedi.',
};

async function callOpenAI(prompt: string): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI hatasi: ${res.statusText}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

function parseJSON<T>(raw: string): T {
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/) || raw.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
  return JSON.parse(match ? match[1] : raw);
}

export async function generateRetroAgenda(entries: { role: string; text: string }[]): Promise<AgendaItem[]> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1800));
    return mockAgenda.map((a) => ({ ...a }));
  }
  const formatted = entries.map((e, i) => `[${e.role}] Not ${i + 1}: "${e.text}"`).join('\n');
  const prompt = `Deneyimli bir Scrum Master AI'sisin.
Asagida sprint boyunca ekip uyelerinden gelen gunluk notlar var.
Her not sadece rol bilgisi ile anonimlestirilmistir.

Notlar:
${formatted}

Gorevlerin:
1. Tum kisisel referanslari anonimlestir.
2. Benzer temalari grupla.
3. Tekrar eden sorunlari, blokajlari, duygusal paterni, kazanmlari ve riskleri tespit et.
4. Maddeleri onceliklendir (Yuksek / Orta / Dusuk).
5. JSON array olarak don (markdown ve aciklama yok):
[{"id":"string","theme":"string","summary":"string","priority":"Yuksek|Orta|Dusuk","type":"Blocker|Improvement|Win|Risk|Question","selected":true}]`;
  const raw = await callOpenAI(prompt);
  return parseJSON<AgendaItem[]>(raw);
}

export async function generateActionItems(
  agendaItems: AgendaItem[],
  members: { name: string; role: string }[],
  sprintId: string
): Promise<ActionItem[]> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1800));
    return mockActions.map((a) => ({ ...a, sprintId }));
  }
  const agendaText = agendaItems.map((a) => `- [${a.priority}] ${a.theme}: ${a.summary}`).join('\n');
  const membersText = members.map((m) => `${m.name} (${m.role})`).join(', ');
  const prompt = `Bir Scrum Master AI olarak retro gundem maddelerini eyleme donusturuyorsun.

Gundem maddeleri:
${agendaText}

Ekip uyeleri: ${membersText}

Her gundem maddesi icin 1 somut, olculebilir aksiyon madde uret. Baglama gore en uygun sahip adayi oner.
JSON array don (markdown ve aciklama yok):
[{"id":"string","agendaItemTheme":"string","action":"string","suggestedOwner":"string","assignedOwner":"string","priority":"Yuksek|Orta|Dusuk","status":"open","sprintId":"${sprintId}"}]`;
  const raw = await callOpenAI(prompt);
  return parseJSON<ActionItem[]>(raw);
}

export async function generateReminder(previousActions: ActionItem[]): Promise<ReminderData> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1400));
    return mockReminder;
  }
  const actionsText = previousActions
    .map((a) => `- "${a.action}" (Sahip: ${a.assignedOwner}, Durum: ${a.status})`)
    .join('\n');
  const prompt = `Bir Scrum Master AI olarak retrospektifin acilisini hazirliyorsun.

Onceki sprint aksiyonlari:
${actionsText}

Tamamlanan, acik ve unutulanlarin ozetini iceren kisa, samimi ve hafif motive edici bir hatirlatma yaz (3-5 cümle).
Sadece JSON don (markdown yok):
{"reminderText":"string","completedCount":0,"openCount":0,"forgottenCount":0,"highlight":"string"}`;
  const raw = await callOpenAI(prompt);
  return parseJSON<ReminderData>(raw);
}
