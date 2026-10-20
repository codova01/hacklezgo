# 👥 Team Roles, Ownership & Hackathon Workflow

> **Project:** NextRead (AI-Powered Intelligent Book Recommendation Platform)  
> **Team Size:** 5 Members  
> **Target:** 24h - 36h Hackathon Sprint  

---

## 1. Executive Summary & Golden Rules

In a fast-paced hackathon, the #1 reason teams fail is **dependency blocking** (e.g., Frontend waiting for Backend, or Backend devs overwriting each other's database models).

### The Golden Rules for This Hackathon:
1. **Contract-First Development:** The [API Contracts](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/API_CONTRACTS.md) are frozen at Hour 2. Frontend builds against mock JSON schemas immediately.
2. **Clear Domain Isolation:** Backend 1, Backend 2, and Backend 3 own dedicated modules/folders. No two developers touch the same routing or model files without alignment.
3. **Demo Over Perfection:** The Pitch Lead designs the **exact 3-minute demo script** early. Every team member optimizes for the specific path the judges will see.

---

## 2. Team Member Breakdown & Ownership

```
                       ┌────────────────────────────┐
                       │  Presentation / Pitch Lead │
                       │ (Product, Slides, Demo UI) │
                       └──────────────┬─────────────┘
                                      │ Coordinates
                                      ▼
                       ┌────────────────────────────┐
                       │   Frontend / UI-UX Lead    │
                       │   (React / Next.js / CSS)  │
                       └──────────────┬─────────────┘
                                      │ Consumes REST APIs
              ┌───────────────────────┼───────────────────────┐
              ▼                       ▼                       ▼
    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
    │ Backend Dev 1    │    │ Backend Dev 2    │    │ Backend Dev 3    │
    │ Core API & DB    │    │ Recommendation   │    │ External Data &  │
    │ Auth & Catalog   │    │ Engine & Search  │    │ AI Explanations  │
    └──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

### 🎨 Member 1: Frontend Developer & UI/UX Designer
* **Core Mission:** Build an aesthetically stunning, responsive web interface that creates an instant "WOW" factor for hackathon judges.
* **Key Responsibilities:**
  - Initialize project template (Next.js / Vite + React with modern typography, glassmorphism, dark/light theme).
  - Mock API integration: Use mock data from [API_CONTRACTS.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/API_CONTRACTS.md) to build UI before backends are deployed.
  - Implement Core Views:
    1. **Hero / Discovery Landing:** Natural language prompt search bar (*"A fast-paced sci-fi like Interstellar with mind-bending time loops"*).
    2. **Interactive Recommendation Grid:** Dynamic book cards with cover art, rating badges, genre tags, and "Why Recommended" AI insight chips.
    3. **Book Detail Modal / Page:** In-depth view with summaries, key themes, author info, and reading level.
    4. **My Bookshelf / Reading DNA:** Save books ("Want to Read", "Finished"), interactive mood/genre preference sliders.
  - Polish animations: Smooth transitions, hover effects, skeleton loaders during AI generation.
* **Deliverable Branch:** `feat/frontend-ui`

---

### ⚙️ Member 2: Backend Developer 1 (Core Services & Data Layer)
* **Core Mission:** Own database models, user session/profile management, book catalog CRUD, and core API scaffolding.
* **Key Responsibilities:**
  - Setup core server framework (FastAPI or Express.js) and database connection (PostgreSQL / SQLite / Supabase).
  - Implement Database Schemas from [DATABASE_SCHEMA.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/DATABASE_SCHEMA.md):
    - `users`, `books`, `user_bookshelves`, `ratings_reviews`.
  - Build endpoints:
    - `POST /api/v1/auth/guest-session` & `POST /api/v1/auth/login`
    - `GET /api/v1/books/search` (text search by title/author/ISBN)
    - `GET /api/v1/books/:id` (detailed book info)
    - `GET/POST /api/v1/bookshelves` (user reading list management)
  - Seed initial book catalog (top 500-1000 popular books with covers, genres, and metadata).
  - Configure CORS, environment variables, and Docker / local dev orchestrator.
* **Deliverable Branch:** `feat/backend-core-catalog`

---

### 🧠 Member 3: Backend Developer 2 (Recommendation Engine & Semantic Search)
* **Core Mission:** Build the intelligent recommendation algorithm that differentiates this project from a standard book database.
* **Key Responsibilities:**
  - Build the **Dual-Engine Recommendation Pipeline**:
    1. **Semantic Vector Search:** Natural language search powered by text embeddings (e.g. `all-MiniLM-L6-v2` or Gemini embeddings via ChromaDB / FAISS / pgvector). Matches user queries like *"cozy autumnal mystery in a small village"* to semantic plot vectors.
    2. **Content-Based & Collaborative Filtering:** Recommends similar titles based on genre cosine similarity, author overlap, and bookshelf history.
    3. **Mood & Vibe Filter:** Vector math on vibes (e.g., #Dark, #Uplifting, #Brainy, #PageTurner, #Melancholic).
  - Build endpoints:
    - `POST /api/v1/recommendations/semantic` (query string -> top N ranked books with similarity scores)
    - `GET /api/v1/recommendations/similar/:bookId` (similar items)
    - `POST /api/v1/recommendations/personalized` (based on user's shelf + preferences)
  - Optimize inference time to under 400ms for demo speed.
* **Deliverable Branch:** `feat/backend-recs-engine`

---

### 🌐 Member 4: Backend Developer 3 (External Data, AI Insights & Enriched Pipelines)
* **Core Mission:** Integrate live third-party book APIs, LLM summary & "Why You'll Love This" reasoning engine, and caching.
* **Key Responsibilities:**
  - **Live Metadata Enrichment:**
    - Google Books API / Open Library API client with fallback caching (in-memory or Redis).
    - Fetches high-res book covers, preview links, publication dates, and page counts on the fly.
  - **GenAI Reasoning & Reader Insights (Gemini / OpenAI API):**
    - `POST /api/v1/ai/explain`: Generates a 2-sentence custom explanation for *why* this book was recommended to the user based on their taste.
    - `POST /api/v1/ai/reader-vibe`: Extract key emotional tags and reading difficulty from book blurbs.
    - `POST /api/v1/ai/tldr-reviews`: Synthesize common sentiment from book reviews into 3 quick pros and 1 con.
  - Response caching & rate-limit handling so live judging never hits a 429 quota error.
  - Setup deployment / hosting (Render, Railway, Fly.io, or Vercel) if cloud demo is required.
* **Deliverable Branch:** `feat/backend-enrichment-ai`

---

### 🎙️ Member 5: Presentation, Product & Pitch Lead
* **Core Mission:** Craft the pitch deck, script the judge walkthrough, ensure judging rubric alignment, and drive the product storytelling.
* **Key Responsibilities:**
  - **Pitch Deck (10-12 slides):** Follow the structure in [PITCH_AND_DEMO_PLAYBOOK.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/PITCH_AND_DEMO_PLAYBOOK.md).
    - The Problem (Choice paralysis in reading, Goodreads recommendation algorithm is 15 years old and stale).
    - The Solution (Contextual, semantic mood-based discovery + instant GenAI "Why Read" explanation).
    - Live Architecture diagram & Tech Highlights.
    - Market potential & Future Roadmap (Monetization via affiliate links, subscription for book clubs).
  - **Demo Flow Choreography:**
    - Test the exact search queries to use during live judging (e.g. *"Show me a sci-fi that feels like Christopher Nolan's Tenet"*).
    - Prepare pre-recorded backup video / GIF in case WiFi drops on stage.
  - **README & Devpost / Submission:**
    - Write winning submission copy, problem statement, architecture highlights, challenges overcome, and team credits.
* **Deliverable Branch:** `docs/presentation-pitch`

---

## 3. Hour-by-Hour Hackathon Milestone Plan (24-Hour Schedule)

| Phase | Hours | Milestones & Checkpoints |
|---|---|---|
| **Phase 1: Setup & Contracts** | H0 – H3 | • Freeze API contracts and database schema.<br>• Backend 1 setups core repo & DB.<br>• Frontend starts UI shell with static dummy data.<br>• Pitch Lead drafts problem statement & slide outline. |
| **Phase 2: Independent Sprints** | H3 – H12 | • **Frontend:** Finishes Hero, Recommendation Grid, Book Modal.<br>• **Backend 1:** Auth, CRUD, Search endpoints live.<br>• **Backend 2:** Vector embedding pipeline & similarity scoring tested.<br>• **Backend 3:** Google Books scraper + Gemini prompt templates working. |
| **Phase 3: Integration & Wiring** | H12 – H18 | • Backend 1, 2, and 3 merge into `dev` branch.<br>• Frontend switches API base URL from mock to real endpoints.<br>• End-to-end test: Search prompt -> Vector match -> AI explanation -> UI render. |
| **Phase 4: Polish & Feature Freeze** | H18 – H21 | • **Strict Feature Freeze!** No new endpoints.<br>• Bug fixing, loading spinners, empty states, error fallbacks.<br>• Seed high-quality demo data (guaranteed dazzling results). |
| **Phase 5: Pitch Rehearsal & Submission** | H21 – H24 | • Rehearse 3-minute pitch 5 times with live demo.<br>• Pitch Lead records 60-second backup demo video.<br>• Submit code, Devpost/portal details, and deploy link. |

---

## 4. Git Branching & Collaboration Guidelines

1. **Branch Naming:**
   - `main`: Production-ready code only.
   - `dev`: Active integration branch.
   - `feat/frontend-ui`: Frontend work.
   - `feat/backend-core`: Backend 1.
   - `feat/backend-recs`: Backend 2.
   - `feat/backend-ai`: Backend 3.
   - `docs/presentation`: Pitch Lead assets.
2. **Commit Conventions:**
   - `feat(api): add semantic search endpoint`
   - `fix(ui): handle empty recommendation list`
   - `docs: update pitch deck speaker notes`
3. **No Breaking Contract Changes:** If any backend dev needs to change an API field, they must announce it in the group channel and update [API_CONTRACTS.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/API_CONTRACTS.md) first.
