# 📜 Member Contract: Backend Developer 1
## Domain: Recommendation Engine & Vector Search

> **Owner:** Backend Developer 1  
> **Key Objective:** Deliver blazing fast (<500ms) semantic search, item-to-item similarity, personalized re-ranking, and the "Book Blend" feature.

---

## 1. Feature Specifications (Assigned Scope)

### 1. Natural-Language Semantic Search (Core Demo Engine)
* Embed user search queries using Sentence-Transformers (e.g., `all-MiniLM-L6-v2`) or Gemini embeddings.
* Rank books by cosine similarity over precomputed in-memory book embeddings.
* **Precomputation Requirement:** Load all book embeddings into memory (NumPy matrix or ChromaDB) during server startup. Queries must return in under 300ms.
* Support optional structured filter parameters:
  - `genre` (filter by category)
  - `max_pages` (e.g. `<= 350`)
  - `min_year` / `max_year`
  - `min_rating` (e.g. `>= 4.0`)

### 2. "More Like This" & Personalized Re-Ranking
* `GET /api/v1/books/{id}/similar`: Computes cosine distance between the target book's vector and the rest of the catalog, returning top N closest titles.
* **Personalized Re-ranking:** Read the user's taste profile from Backend 2 (`GET /users/me/taste`) containing genre/vibe weights. Add a weighted score boost:
  $$\text{FinalScore} = (0.7 \times \text{SemanticSimilarity}) + (0.3 \times \text{UserTasteAlignment})$$
  *(Allows two users typing the same prompt to see personalized results based on their shelves!)*

### 3. "Book Blend" (Flashy Demo Moment ⭐)
* User selects two books (e.g., *Dune* + *The Great Gatsby*).
* Average the vector embeddings of Book A and Book B:
  $$\vec{V}_{\text{blend}} = \frac{\vec{V}_A + \vec{V}_B}{2}$$
* Query the catalog for books nearest to $\vec{V}_{\text{blend}}$ (excluding Book A and Book B).
* Returns the books that live exactly at the intersection of both tastes!

---

## 2. API Endpoints You Must Implement

### Endpoint 1: Semantic Natural Language Search
* **Route:** `POST /api/v1/recommendations/semantic`
* **Request Body:**
```json
{
  "prompt": "something dark but hopeful, fast-paced in space",
  "filters": {
    "genresIncluded": ["Sci-Fi"],
    "genresExcluded": ["Horror"],
    "maxPages": 450,
    "minRating": 4.0
  },
  "userId": "usr_guest_123",
  "limit": 6
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "executionTimeMs": 142,
  "data": [
    {
      "id": "bk_101",
      "isbn": "9780593135204",
      "title": "Project Hail Mary",
      "author": "Andy Weir",
      "publishedYear": 2021,
      "description": "Ryland Grace is the sole survivor on a desperate, last-chance mission...",
      "coverImageUrl": "https://images.unsplash.com/photo-1532012164546-f432f2e379b2?auto=format&fit=crop&w=400&q=80",
      "rating": 4.8,
      "ratingCount": 420000,
      "pageCount": 496,
      "genres": ["Sci-Fi", "Space Exploration"],
      "vibes": ["🚀 Space Adventure", "🧠 Science Puzzle"],
      "similarityScore": 0.94
    }
  ]
}
```

---

### Endpoint 2: "More Like This"
* **Route:** `GET /api/v1/books/{id}/similar?limit=4`
* **Response (200 OK):**
```json
{
  "success": true,
  "targetBookId": "bk_101",
  "data": [
    {
      "id": "bk_102",
      "title": "Dark Matter",
      "author": "Blake Crouch",
      "similarityScore": 0.88,
      "genres": ["Sci-Fi", "Thriller"],
      "coverImageUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
    }
  ]
}
```

---

### Endpoint 3: Book Blend (Midpoint Vector Discovery)
* **Route:** `POST /api/v1/recommendations/blend`
* **Request Body:**
```json
{
  "bookId1": "bk_101",
  "bookId2": "bk_104",
  "limit": 4
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "blendSources": [
    {"id": "bk_101", "title": "Project Hail Mary"},
    {"id": "bk_104", "title": "The Thursday Murder Club"}
  ],
  "blendedRecommendations": [
    {
      "id": "bk_208",
      "title": "The Long Way to a Small, Angry Planet",
      "author": "Becky Chambers",
      "genres": ["Sci-Fi", "Cozy", "Found Family"],
      "blendRationale": "Combines the interstellar journey of Project Hail Mary with the quirky camaraderie of Thursday Murder Club.",
      "midpointDistance": 0.91
    }
  ]
}
```

---

## 3. Integration Points & Dependencies

1. **Incoming from Backend 3 (External Data & GenAI):**
   - Backend 3 parses raw search queries into structured `ParsedFilters` (clean prompt, included/excluded genres, max pages). You consume these filters directly in your search query.
2. **Incoming from Backend 2 (Core API & DB):**
   - Backend 2 exposes `GET /users/{userId}/taste` returning user vibe weights and liked book IDs. Use this for personalized re-ranking.
3. **Data Uniformity:**
   - Always return the canonical `Book` object schema defined in [SHARED_SCHEMAS_AND_INTEGRATION.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/SHARED_SCHEMAS_AND_INTEGRATION.md).

---

## 4. Emergency Fallback Plan (If Time Gets Tight)
* If behind schedule:
  1. Drop the `POST /recommendations/blend` endpoint first.
  2. For personalized re-ranking, do simple genre-weight boosts before implementing vector linear combination.
  3. **Non-negotiable:** Sub-500ms semantic search on `POST /recommendations/semantic` must work flawlessly for the demo.
