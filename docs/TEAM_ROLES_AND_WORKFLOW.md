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
* **Detailed Contract:** [docs/contracts/MEMBER_1_FRONTEND_CONTRACT.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/MEMBER_1_FRONTEND_CONTRACT.md)
* **Key Deliverables:**
  - Hero Natural-Language Discovery Bar with mood chips (#Dark, #Cozy, #MindBender).
  - Dynamic Book Recommendation Cards with covers, ratings, similarity match %, and Gemini rationale badges.
  - "Book Blend" interactive dock (pick 2 books -> show midpoint matches).
  - Bookshelf Drawer ("Want to Read", "Reading", "Finished") + live "Reading DNA" taste charts.
  - Offline Mock Mode toggle so live demo never crashes on stage.
* **Deliverable Branch:** `feat/frontend-ui`

---

### 🧠 Member 2: Backend Developer 1 (Recommendation & Vector Search)
* **Core Mission:** Deliver blazing-fast (<500ms) semantic search, item-to-item similarity, personalized re-ranking, and the "Book Blend" feature.
* **Detailed Contract:** [docs/contracts/MEMBER_2_BACKEND_1_RECS_VECTOR_CONTRACT.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/MEMBER_2_BACKEND_1_RECS_VECTOR_CONTRACT.md)
* **Key Deliverables:**
  - **Natural-Language Semantic Search:** Embed query, rank by cosine similarity over in-memory precomputed book embeddings with filters (genre, max pages, year, rating).
  - **"More Like This" & Re-Ranking (`GET /books/{id}/similar`):** Item-to-item vector similarity, blended with Backend 2's taste profile for personalized rankings.
  - **Book Blend:** Average the vector embeddings of two chosen books to find titles at their midpoint.
* **Deliverable Branch:** `feat/backend-1-recs-vectors`

---

### ⚙️ Member 3: Backend Developer 2 (Core API & Database Layer)
* **Core Mission:** Deliver frictionless guest session persistence, bookshelf CRUD with ratings, user taste profile aggregation, and shareable reading lists.
* **Detailed Contract:** [docs/contracts/MEMBER_3_BACKEND_2_CORE_DB_CONTRACT.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/MEMBER_3_BACKEND_2_CORE_DB_CONTRACT.md)
* **Key Deliverables:**
  - **Bookshelves with Reading Status:** `wantToRead`, `reading`, `finished`, and 1-5 star ratings with JWT-based lightweight guest sessions.
  - **Taste Profile Aggregator (`GET /users/me/taste`):** Turns saved books and ratings into top vibes, favorite genres, and average page length (feeds Backend 1's re-ranking).
  - **Shareable Reading Lists:** `POST /lists` (generates slug) and `GET /lists/{slug}` (public read-only list).
* **Deliverable Branch:** `feat/backend-2-core-db`

---

### 🌐 Member 4: Backend Developer 3 (External Data & GenAI)
* **Core Mission:** Power intelligent natural-language query parsing, generate instant Gemini "Why you'll love it" rationales with zero-fail caching, and build the live stage book ingest pipeline.
* **Detailed Contract:** [docs/contracts/MEMBER_4_BACKEND_3_GENAI_ENRICHMENT_CONTRACT.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/MEMBER_4_BACKEND_3_GENAI_ENRICHMENT_CONTRACT.md)
* **Key Deliverables:**
  - **Gemini "Why You'll Love It" Rationales:** 2-sentence explanation per result cached by `(query_hash, book_id)` with deterministic template fallback.
  - **Query Understanding:** Gemini JSON prompt parsing messy input (*"something dark but hopeful, short, no romance"*) into structured `ParsedFilters` that feed Backend 1.
  - **Google Books Enrichment & Stage Ingest:** Cover/metadata fallback chain + `POST /books/ingest?isbn=...` for live demo ingestion.
* **Deliverable Branch:** `feat/backend-3-genai-external`

---

### 🎙️ Member 5: Presentation, Product & Pitch Lead
* **Core Mission:** Craft the pitch deck, script the judge walkthrough, choreograph the live demo moments, and drive product storytelling.
* **Detailed Contract:** [docs/contracts/MEMBER_5_PITCH_PRODUCT_CONTRACT.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/MEMBER_5_PITCH_PRODUCT_CONTRACT.md)
* **Key Deliverables:**
  - **8-Slide Pitch Deck** (Problem, Solution, Tech Architecture, Business Model, Team).
  - **3-Minute Pitch Script & 90-Second Live Demo Path** (Messy query -> AI Rationale -> Reading DNA -> Book Blend -> Live Ingest).
  - **Backup Screen Recording** (60-sec video) and Judge Q&A Defense.
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

---

## 5. Integration Points to Lock Early (Hour 0 – 2)

* **Backend 3 to Backend 1 (Recommendation & Vector Search):** The `ParsedFilters` JSON schema. Agree on field names in the first 2 hours.
* **Backend 2 (Core API & DB) to Backend 1 (Recommendation & Vector Search):** The `TasteProfile` vector format. A plain dict of vibe weights is enough to start.
* **All Three Backends:** Return the exact same canonical `Book` object shape ([SHARED_SCHEMAS_AND_INTEGRATION.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/SHARED_SCHEMAS_AND_INTEGRATION.md)) so the frontend never special-cases a source.
* **Coordination Rule:** Tell the frontend and pitch lead who owns what now, so nobody pings the wrong person during integration.

---

## 6. If Time Gets Tight (Feature Cut Order)

Cut features strictly in this order if running behind:
1. **Cut 1st:** Shareable reading lists (`POST /lists` and `GET /lists/{slug}`)
2. **Cut 2nd:** Book Blend midpoint vector math
3. **Cut 3rd:** Live stage ingest (`POST /books/ingest?isbn=...`)
4. **DO NOT TOUCH (Core Demo):** Semantic search, Gemini rationales, and Bookshelves.

