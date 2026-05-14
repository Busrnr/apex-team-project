# Retrocell — Proje Planı

# Retrocell-plan-promptu

You are an expert product strategist, senior full-stack engineer, AI hackathon mentor, and UX designer.
We are a 3-person team participating in a 3-hour AI hackathon. We need to build a minimum but impressive working MVP for the following project:
Project Topic: Retro & Action Tracker
Problem:
Teams often run retrospective meetings on external platforms. Decisions and action items are written somewhere during the retro, but they are not tracked properly afterwards. As a result, action items are forgotten, stay unresolved, and do not create real improvement in the next sprint.
Our product idea:
We want to build a desktop-style web application where team members can freely write daily thoughts, blockers, problems, frustrations, positive events, and observations during the sprint.
The core idea is:
- Users should not need to follow a strict format.
- There should be only one simple text area for daily input.
- No daily or weekly limit.
- People can write naturally, like a work diary.
- On the team’s retro day and time, all team members’ entries will be analyzed by AI.
- In another tab, the AI will generate anonymized retro agenda items.
- These agenda items should be grouped, prioritized, and standardized by AI.
- The AI should detect recurring problems, emotional patterns, blockers, wins, and team-level risks.
- After reviewing the agenda, the team can click a button like “Generate Actions”.
- AI will then convert the retro discussion points into concrete action items.
- AI should suggest owners based on context when possible.
- The Scrum Master can manually change the owner if needed.
- Before the next retrospective, the AI should remind the team of previous action items and whether they were completed or forgotten.
Main Wow / X-Factor:
The product is not just a retro board or action list.
The wow effect should be:
“AI turns messy daily team emotions and unstructured notes into an anonymous, prioritized retro agenda, then transforms that agenda into accountable action items, and brings unfinished actions back before the next retro so nothing is forgotten.”
This should feel like an AI-powered Scrum Master assistant.
Hackathon constraints:
- We only have 3 hours.
- We need maximum impact with minimum implementation.
- We are 3 developers.
- We need a realistic MVP that can be coded quickly.
- Do not over-engineer.
- Avoid complex authentication unless absolutely necessary.
- Prefer local mock data, localStorage, or a simple lightweight backend.
- The product must be demo-friendly.
- The jury will evaluate the GitHub repository, README, docs, AI usage, architecture, and live demo.
Please create a practical 3-hour implementation plan.
I need you to deliver the following:
1. MVP Scope
Define the smallest possible feature set that still solves the problem and creates a strong demo.
2. Feature Prioritization
Separate features into:
- Must-have for 3-hour MVP
- Nice-to-have if time remains
- Do not build during hackathon
3. User Flow
Describe the demo flow clearly:
- Daily entry input
- Retro agenda generation
- Anonymous AI grouping
- Action item generation
- Owner suggestion / manual edit
- Next retro reminder of previous actions
4. Screen Structure
Design the minimum UI with tabs or sections.
Suggested tabs:
- Daily Notes
- AI Retro Agenda
- Action Items
- Next Retro Reminder / Memory
5. AI Features
Define exactly where AI is used:
- Summarizing free text
- Anonymizing entries
- Clustering similar issues
- Prioritizing agenda items
- Detecting repeated themes
- Generating action items
- Suggesting owners
- Preparing next retro reminder
6. Data Model
Create a simple data model for:
- Team members
- Daily entries
- Retro agenda items
- Action items
- Retro sessions
Keep it simple enough for localStorage or mock JSON.
7. Suggested Tech Stack
Recommend a fast hackathon-friendly stack.
Prefer:
- React + Vite
- TypeScript if manageable
- Tailwind or simple CSS
- localStorage or mock JSON
- Optional Node/Express API only if needed
- AI API integration can be mocked if real API key setup takes too long
8. AI Prompt Templates
Write the actual AI prompts we should use inside the product for:
- Generate retro agenda from raw daily entries
- Generate action items from selected agenda items
- Generate next retro reminder from previous action items
The prompts should return structured JSON so we can easily render results in the UI.
9. Division of Work for 3 People
Split the work clearly:
- Developer 1: UI and screens
- Developer 2: data model, localStorage, action flow
- Developer 3: AI prompt integration, mock AI output, README/docs
10. 3-Hour Timeline
Create a minute-by-minute or phase-based timeline:
- 0:00–0:20 planning and setup
- 0:20–1:20 core UI
- 1:20–2:10 AI flow and mock data
- 2:10–2:40 polish and demo scenario
- 2:40–3:00 README, docs, final GitHub check
11. Demo Scenario
Create a strong demo story we can present in 7 minutes.
Use a fictional team with 4 people.
Include messy daily entries such as blockers, stress, unclear requirements, deployment issues, good collaboration, and repeated QA problems.
Then show how AI transforms them into retro agenda and action items.
12. README Structure
Generate the GitHub README outline required by the hackathon email:
- What the project is
- Problem
- Solution
- Features
- AI strategy and workflow
- Tech stack
- Installation
- .env.example
- AI tools used
- APIs used
- Screenshots section
- Deployment URL
- Team members
- Future improvements
13. docs/ Folder Structure
Generate docs files we should add:
- docs/project-plan.md
- docs/development-phases.md
- docs/architecture.md
- docs/ai-strategy.md
14. AI Configuration Files
Suggest what we should include in the repository to show AI usage:
- CLAUDE.md
- .cursorrules
- .github/copilot-instructions.md
- prompts/retro-agenda.prompt.md
- prompts/action-generator.prompt.md
- prompts/next-retro-reminder.prompt.md
15. Pitch Angle
Give us a 7-minute presentation structure focused on:
- AI strategy and workflow
- Live demo and forgotten action problem
- X-Factor / wow AI effect
Important:
Please be very practical. We have only 3 hours.
Do not suggest a complex enterprise product.
Give us a clear MVP that we can actually build and demo.
The output should be action-oriented, not theoretical.
## Projenin Amaci

Retrocell, Scrum Master'ların retrospektif süreclerini kolaylaştırmak ve yapay zeka desteği ile daha verimli hale getirmek için gelistirilmış bir web uygulamasıdır.

## Hedef Kit

- Scrum Master'lar
- Agile takım liderleri
- Yazılım gelistirme ekipleri

## Temel Sorun ve Cozum

### Sorun
Retrospektif toplantılarında:
- Ekip uyelerinin notları genellikle cesitli kanallarda (Slack, email, kâğıt) dagınık halde olur.
- Notların analizi ve gündem olusturulması manuel ve zaman alıcıdır.
- Aksiyon maddeleri somut degilse takip edilemez.
- Bir sonraki retro öncesinde önceki aksiyonların durumu hatırlanmaz.

### Cozum
- Tum sprint notlarını tek bir yerde toplar.
- AI ile notları analiz eder, temelere gruplar, önceliklendirir.
- Gündem maddelerinden somut, sahibi atanmış aksiyonlar uretir.
- Bir sonraki retro öncesinde takımı bilgilendirir.

## Kullanici Akısı

```
1. Ekip uyeleri sprint boyunca guenluek notlarını ekler.
2. Sprint sonunda Scrum Master "Retro Gündemi Olustur" dediginde AI analiz eder.
3. Olusan gündem maddelerinden istenenler secilir.
4. "Aksiyonları Olustur" ile somut aksiyonlar uretilir.
5. Bir sonraki sprint basında "Hatırlatma Olustur" ile önceki aksiyonların durumu ozetlenir.
6. Yeni sprint baslar, döngü tekrarlar.
```

## Kapsam

### MVP (Minimum Viable Product)
- Guenluek not ekleme
- AI ile retro gündemi olusturma
- Aksiyon maddeleri uretme
- Sonraki retro hatırlatması
- Sprint yönetimi

### Gelecek Fikirler (V2)
- Takım uyesi yönetimi (ekleme/çıkarma)
- Not kategorileri (blokaj, kazanım, risk, fikir)
- Retro gündem maddelerini manuel duzenleme
- Aksiyon durumu raporu ve grafik
- Farklı AI model secenekleri

## Basari Kriterleri

- Guenluek notların hızlı ve kolay kaydedilmesi
- AI cıktısının anlamlı ve kullanılabilir olması
- Aksiyon maddelerinin somut ve takip edilebilir olması
- Kullanıcı deneyiminin sade ve anlaşılır olması
