# 🏗️ System Architecture & Engineering Blueprint

> **Project:** NextRead (AI-Powered Intelligent Book Discovery Platform)  
> **Architecture Style:** Modular Service Architecture / Clean API Gateway  
> **Latency Target:** < 500ms End-to-End Search & Recommendation  

---

## 1. High-Level Architecture Diagram

```mermaid
flowchart TB
    subgraph Client ["Client Layer (Member 1: Frontend)"]
        UI["Web App (Next.js / React + Vanilla CSS)"]
        State["Client State & Mock Fallback Layer"]
    end

    subgraph Gateway ["API Gateway & Core Router"]
        Router["FastAPI / Express Router (/api/v1)"]
    end

    subgraph BE1 ["Backend Dev 1: Core Catalog & Storage"]
        AuthSvc["Auth & Session Manager"]
        CatalogSvc["Catalog & Bookshelf Service"]
        DB[(Primary DB: SQLite / PostgreSQL)]
    end

    subgraph BE2 ["Backend Dev 2: Recommendation & ML"]
        VectorEngine["Vector Semantic Search Engine"]
        EmbeddingModel["Sentence Transformer / Vector Embeddings"]
        VectorDB[(Vector Store: ChromaDB / FAISS / pgvector)]
        HybridRanker["Hybrid Cosine + Vibe Re-Ranker"]
    end

    subgraph BE3 ["Backend Dev 3: AI Insights & External Data"]
        GoogleBooks["Google Books & OpenLibrary API"]
        GenAIEngine["Gemini API (Reasoning & Explanations)"]
        CacheLayer[("In-Memory / Redis Cache")]
    end

    %% Connections
    UI <--> Router
    Router <--> AuthSvc
    Router <--> CatalogSvc
    CatalogSvc <--> DB

    Router <--> VectorEngine
    VectorEngine <--> EmbeddingModel
    EmbeddingModel <--> VectorDB
    VectorEngine <--> HybridRanker

    Router <--> GoogleBooks
    Router <--> GenAIEngine
    GoogleBooks <--> CacheLayer
    GenAIEngine <--> CacheLayer
```

---

## 2. Component Breakdown & Boundaries

| Module | Owner | Technology | Responsibility |
|---|---|---|---|
| **Frontend UI** | Frontend Lead (M1) | Next.js 14 / Vite + React, Modern CSS (Glassmorphism, Dark Mode) | Responsive interface, state management, search autocomplete, bookshelf interaction, micro-animations. |
| **Core Service & DB** | Backend 1 (M2) | Python FastAPI or Node/Express + SQLAlchemy / Prisma + PostgreSQL / SQLite | User authentication, bookshelf CRUD, book catalog relational storage, health checks, route aggregation. |
| **Recs & Vector Engine** | Backend 2 (M3) | Python (FastAPI/NumPy), Sentence-Transformers (`all-MiniLM-L6-v2`) or Gemini Embeddings, ChromaDB / FAISS | Semantic natural language search, book plot vector indexing, hybrid content filtering, vibe scoring. |
| **Enrichment & GenAI** | Backend 3 (M4) | Google Books API, OpenLibrary API, Google Gemini Flash API (`gemini-1.5-flash`), Cache | Live book cover fallback, publication metadata, AI-generated "Why Read This" pitch, review summarizer. |

---

## 3. Data Flow: The "Smart Discovery" Pipeline

Here is what happens when a user types:  
`"A psychological thriller set in a snowstorm where no one can be trusted"`

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Frontend as Frontend (M1)
    participant Gateway as API Gateway (B1)
    participant RecEngine as Recs Engine (B2)
    participant ExtAI as GenAI & Enrichment (B3)
    participant DB as Database (B1)

    User->>Frontend: Types natural language search prompt
    Frontend->>Gateway: POST /api/v1/recommendations/semantic
    
    par Vector Search & Ranking
        Gateway->>RecEngine: Query text -> Generate vector embedding
        RecEngine->>RecEngine: Cosine similarity query against book blurb vectors
        RecEngine-->>Gateway: Top 10 candidate Book IDs + similarity scores
    and Fetch Metadata
        Gateway->>DB: Fetch book metadata (title, author, genres, base rating)
    end

    Gateway->>ExtAI: POST /api/v1/ai/explain (top 3 matches + user prompt)
    ExtAI->>ExtAI: Gemini Flash generates concise "Why You'll Love This"
    ExtAI-->>Gateway: AI rationale tokens & mood badges

    Gateway-->>Frontend: Unified JSON Response (< 450ms)
    Frontend->>User: Renders interactive book cards with AI tags & rationale!
```

---

## 4. Hackathon Tech Stack Recommendation

### Recommended Choice: **Next.js (Frontend) + Python FastAPI Monorepo (Backend)**

#### Why this wins hackathons:
1. **Python Monorepo for All 3 Backends:**
   - Backend 1 creates `services/core/` (SQLAlchemy / SQLite).
   - Backend 2 creates `services/recommendations/` (loads ML models directly in Python without inter-language RPC overhead).
   - Backend 3 creates `services/enrichment/` (uses `google-generativeai` and `httpx`).
   - The main `app/main.py` simply mounts all three routers:
     ```python
     app.include_router(core_router, prefix="/api/v1")
     app.include_router(recs_router, prefix="/api/v1")
     app.include_router(enrichment_router, prefix="/api/v1")
     ```
2. **Instant Swagger UI (`/docs`):**
   - FastAPI automatically generates live interactive documentation and test sandbox at `http://localhost:8000/docs`. Member 1 (Frontend) and Member 5 (Pitch Lead) can test every endpoint directly in the browser!
3. **Speed & Reliability:**
   - Lightweight SQLite file (`books.db`) eliminates complex Docker setup on local laptops during the hackathon crunch.
   - `gemini-1.5-flash` provides near-instant (~200ms) LLM reasoning at minimal or zero cost tier.

---

## 5. Resilience & "Judge Proofing" Strategy

During live hackathon judging, external APIs, venue Wi-Fi, or rate limits can fail. The architecture incorporates **three levels of safety**:

1. **Local Pre-computed Embeddings:**
   - 500 top-rated books have pre-computed vector embeddings bundled in the repo (`data/embeddings.npy` or ChromaDB collection). Even if offline, semantic search works 100%!
2. **Fallback AI Explanations:**
   - If the Gemini API call exceeds 800ms or fails with 429/network error, Backend 3 returns a smart heuristic fallback template:  
     `"Matches your interest in suspense and isolated atmospheres based on plot tags."`
3. **Client-Side Offline Mode:**
   - Member 1 keeps a fallback `mockBooks.json` in the frontend codebase. If the backend fails to connect, a toggle button allows the pitch presenter to seamlessly switch to demonstration mode.
