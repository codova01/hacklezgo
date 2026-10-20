# 📜 Unified Data Schemas & Inter-Backend Integration Contracts

> **CRITICAL RULE:** All backends must return the **exact same `Book` object shape** so the frontend and pitch lead never have to special-case data from different sources.

---

## 1. The Universal `Book` Object Schema

Both Backend 1, Backend 2, and Backend 3 must adhere to this exact JSON structure:

```typescript
export interface Book {
  id: string;                      // e.g. "bk_101" or ISBN
  isbn: string;                    // e.g. "9780593135204"
  title: string;                   // e.g. "Project Hail Mary"
  author: string;                  // e.g. "Andy Weir"
  publishedYear: number;           // e.g. 2021
  description: string;             // Plot synopsis
  coverImageUrl: string;           // HTTPS URL (Google Books / OpenLibrary / Unsplash fallback)
  rating: number;                  // 1.0 to 5.0
  ratingCount: number;             // e.g. 420000
  pageCount: number;               // e.g. 496
  genres: string[];                // e.g. ["Sci-Fi", "Space", "Hard Sci-Fi"]
  vibes: string[];                 // e.g. ["🚀 Space Adventure", "🧠 Science Puzzle"]
  
  // Optional Enrichment Fields (Added by Backend 1 or Backend 3)
  similarityScore?: number;        // 0.00 to 1.00 (from Backend 1)
  aiPitch?: string;                // 2-sentence rationale (from Backend 3)
  readingPace?: "Fast & Intense" | "Moderate & Balanced" | "Slow & Immersive";
}
```

---

## 2. Integration Point 1: Backend 3 ➔ Backend 1 (Query Understanding)

* **Producer:** Backend 3 (External Data & GenAI)  
* **Consumer:** Backend 1 (Recommendation & Vector Search)  
* **Purpose:** Backend 3 takes messy user prompts (*"something dark but hopeful, short, under 300 pages, no romance"*) and extracts structured filters to pass into Backend 1's vector search filter pipeline.

```typescript
export interface ParsedFilters {
  cleanSemanticQuery: string;      // e.g. "dark hopeful speculative fiction"
  genresIncluded: string[];        // e.g. ["Sci-Fi", "Dystopian"]
  genresExcluded: string[];        // e.g. ["Romance"]
  targetMoods: string[];           // e.g. ["Dark", "Hopeful"]
  maxPages?: number;               // e.g. 300
  minYear?: number;                // e.g. 2010
  minRating?: number;              // e.g. 4.0
}
```

---

## 3. Integration Point 2: Backend 2 ➔ Backend 1 (Taste Profile Vector)

* **Producer:** Backend 2 (Core API & Database)  
* **Consumer:** Backend 1 (Recommendation & Vector Search)  
* **Endpoint:** `GET /users/me/taste`  
* **Purpose:** Backend 1 blends this user taste profile into search results so two users typing the same query get personalized results.

```typescript
export interface UserTasteProfile {
  userId: string;
  favoriteGenres: { [genre: string]: number };   // Normalized weight: {"Sci-Fi": 0.85, "Mystery": 0.40}
  topVibes: { [vibe: string]: number };          // Normalized weight: {"MindBender": 0.90, "Cozy": 0.10}
  averagePageLength: number;                     // e.g. 380
  likedBookIds: string[];                        // ["bk_101", "bk_102"]
  dislikedBookIds?: string[];                    // ["bk_199"]
}
```

---

## 4. Priority Triage: If Time Gets Tight

If team is running behind on hackathon timeline, cut features strictly in this order:
1. **Cut 1st:** Shareable Reading Lists (`POST /lists` and `GET /lists/{slug}`)
2. **Cut 2nd:** Book Blend midpoint vector math
3. **Cut 3rd:** Live stage ingest (`POST /books/ingest?isbn=...`)
4. **DO NOT CUT (Core Demo):** Semantic natural language search + Gemini rationales + Bookshelves.
