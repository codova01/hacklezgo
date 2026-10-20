# 📚 NextRead — AI-Powered Intelligent Book Discovery Platform

> **Hackathon Master Blueprint & Team Collaboration Workspace**  
> Built for a 5-person agile hackathon squad: 1 Frontend Designer, 3 Backend Specialists, 1 Pitch & Product Lead.

---

## 🚀 Quick Navigation

| Document | Purpose | Target Audience |
|---|---|---|
| 👥 [Team Roles & Workflow](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/TEAM_ROLES_AND_WORKFLOW.md) | Role boundaries, 24-hr milestone sprint, git strategy | All 5 Members |
| 🏗️ [System Architecture](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/SYSTEM_ARCHITECTURE.md) | Component diagrams, data flow pipeline, tech stack | Frontend & All Backends |
| 📜 [API Contracts](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/API_CONTRACTS.md) | Exact JSON payloads, endpoints, status codes, mocks | Frontend & Backend 1, 2, 3 |
| ⚡ [OpenAPI 3.0 Spec](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/openapi.yaml) | Interactive Swagger/Postman specification | Backend Developers & QA |
| 🗄️ [Database Schema](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/DATABASE_SCHEMA.md) | Relational SQL tables, vector embeddings model | Backend 1 & Backend 2 |
| 🎤 [Pitch & Demo Playbook](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/PITCH_AND_DEMO_PLAYBOOK.md) | 3-minute pitch script, 8-slide deck, Q&A defense | Member 5 (Pitch Lead) |
| 📦 [Seed Books Dataset](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/data/seed_books.json) | Ready-to-use book dataset with vibes & AI pitches | Frontend & Backend 1 & 2 |

---

## 📜 Member Contract Quicklinks

Each team member has a dedicated, self-contained contract specifying their exact deliverables, endpoints, schemas, dependencies, and fallback plans:

| Member & Role | Assigned Domain & Features | Individual Contract Link |
|---|---|---|
| **Member 1: Frontend & UI/UX** | Hero NLP search, book cards, Book Blend dock, Bookshelf drawer, mock toggle | 📄 [MEMBER_1_FRONTEND_CONTRACT.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/MEMBER_1_FRONTEND_CONTRACT.md) |
| **Member 2: Backend 1 (Recs & ML)** | In-memory semantic search (<500ms), "More like this", personalized re-ranking, Book Blend | 📄 [MEMBER_2_BACKEND_1_RECS_VECTOR_CONTRACT.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/MEMBER_2_BACKEND_1_RECS_VECTOR_CONTRACT.md) |
| **Member 3: Backend 2 (Core & DB)** | Bookshelves with status & ratings, JWT guest session, Taste Profile aggregator, Shareable lists | 📄 [MEMBER_3_BACKEND_2_CORE_DB_CONTRACT.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/MEMBER_3_BACKEND_2_CORE_DB_CONTRACT.md) |
| **Member 4: Backend 3 (AI & Ext)** | Gemini 2-sentence rationale with hash caching, query understanding parser, live stage ISBN ingest | 📄 [MEMBER_4_BACKEND_3_GENAI_ENRICHMENT_CONTRACT.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/MEMBER_4_BACKEND_3_GENAI_ENRICHMENT_CONTRACT.md) |
| **Member 5: Pitch & Product Lead** | 3-min script, 8-slide deck, 90-sec 5-step live demo choreography, Q&A defense, backup video | 📄 [MEMBER_5_PITCH_PRODUCT_CONTRACT.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/MEMBER_5_PITCH_PRODUCT_CONTRACT.md) |
| **Shared Inter-Backend Spec** | Universal `Book` schema, `ParsedFilters` schema, `TasteProfile` schema, cut triage | 📄 [SHARED_SCHEMAS_AND_INTEGRATION.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/SHARED_SCHEMAS_AND_INTEGRATION.md) |

---

## 👥 Team Breakdown & Ownership

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NextRead Hackathon Squad                        │
├───────────────────┬────────────────────────────────────────────────────┤
│ Member 1          │ 🎨 Frontend & UI/UX Designer                       │
│                   │ Next.js/React, Glassmorphism, Responsive UI        │
├───────────────────┼────────────────────────────────────────────────────┤
│ Member 2          │ 🧠 Backend 1: Recommendation & Vector Search       │
│                   │ Semantic plot embeddings, Cosine ranking, Blend    │
├───────────────────┼────────────────────────────────────────────────────┤
│ Member 3          │ ⚙️ Backend 2: Core API & Database Layer            │
│                   │ SQLite/Postgres, Bookshelves, Taste Aggregator     │
├───────────────────┼────────────────────────────────────────────────────┤
│ Member 4          │ 🌐 Backend 3: External Data & GenAI Insights       │
│                   │ Google Books API, Gemini "Why Read", Stage Ingest  │
├───────────────────┼────────────────────────────────────────────────────┤
│ Member 5          │ 🎙️ Presentation, Product & Pitch Lead              │
│                   │ Pitch deck, 3-min script, Demo flow, Q&A defense   │
└───────────────────┴────────────────────────────────────────────────────┘
```

---

## ⚡ Hackathon Execution Workflow

1. **Hour 0 – 2 (Contract Lock):**
   - Everyone reviews [API_CONTRACTS.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/API_CONTRACTS.md).
   - Frontend starts immediately using [seed_books.json](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/data/seed_books.json) without waiting for backend deployment.
2. **Hour 2 – 12 (Parallel Development):**
   - **Frontend:** Hero natural language search bar, book cards, AI rationale badges, bookshelf drawer.
   - **Backend 1:** Sets up FastAPI/Express router, database models, and CRUD endpoints.
   - **Backend 2:** Implements semantic cosine similarity over book blurb embeddings.
   - **Backend 3:** Implements Gemini Flash API prompt templates and Google Books cover fallback.
   - **Pitch Lead:** Finalizes slide deck on Google Slides / Figma and rehearses demo queries.
3. **Hour 12 – 18 (Integration):**
   - Backend 1, 2, and 3 combine their routers into the unified API gateway.
   - Frontend points API calls to `http://localhost:8000/api/v1`.
4. **Hour 18 – 24 (Polish & Pitch Rehearsal):**
   - Strict feature freeze. Seed demo data. Practice 3-minute pitch 5 times!

---

## 💡 Key Competitive Advantages (Why NextRead Wins)
* **Natural Language Queries:** Users don't need exact keywords—they can search by mood (*"A mind-bending sci-fi with time dilation and heartbreak"*).
* **Instant GenAI Rationale:** Every book card features a custom, 2-sentence explanation of *why* it fits their prompt.
* **Sub-500ms Performance:** In-memory vector cosine ranking and Gemini Flash ensure blazing fast live demos.
* **Resilient Offline Fallback:** Bundled seed data guarantees the demo never fails on stage.
