# 📜 Member Contract: Backend Developer 3
## Domain: External Data, GenAI Insights & Ingestion

> **Owner:** Backend Developer 3  
> **Key Objective:** Power intelligent natural-language query parsing, generate instant Gemini "Why you'll love it" rationales with zero-fail caching, and build the live stage book ingest pipeline.

---

## 1. Feature Specifications (Assigned Scope)

### 1. Gemini "Why You'll Love It" Rationales
* Takes the user's natural query + the candidate book's title and description.
* Calls Google Gemini Flash API (`gemini-1.5-flash`) to generate a punchy, persuasive 2-sentence explanation of why the user will enjoy this book.
* **Resilience Requirement (Zero-Fail Caching):**
  - Hash the query and book ID: `cache_key = md5(f"{query.lower().strip()}_{book_id}")`.
  - Cache results in memory / Redis.
  - **Template Fallback:** If Gemini API times out (> 1.2s), returns a 429 quota error, or is offline, generate a deterministic fallback immediately:
    ```
    f"Matches your interest in {book.genres[0]} with themes of {book.vibes[0]}."
    ```
    *The live presentation must NEVER crash due to an AI API error.*

### 2. Query Understanding (Natural Language ➔ Structured Filters)
* Uses Gemini with structured JSON output mode (`response_mime_type="application/json"`) to parse messy user inputs into structured filters:
  - Input: *"something dark but hopeful, short, under 300 pages, no romance"*
  - Output:
    ```json
    {
      "cleanSemanticQuery": "dark hopeful speculative fiction",
      "genresIncluded": ["Sci-Fi", "Fiction"],
      "genresExcluded": ["Romance"],
      "targetMoods": ["Dark", "Hopeful"],
      "maxPages": 300
    }
    ```
* **Consumer:** Sends this output directly to Backend 1's vector search filter pipeline.

### 3. Google Books Enrichment & Live Ingest (`POST /books/ingest`)
* **Fallback Chain:** Google Books API ➔ Open Library API ➔ Unsplash fallback cover image.
* **Live Ingestion Endpoint:** `POST /api/v1/books/ingest?isbn=...`:
  - Presenter or judge provides an ISBN live during the demo.
  - Backend 3 fetches cover, synopsis, page count, and ratings on the fly, computes its vector embedding (calling Backend 1's embed utility), and saves it into the active catalog!

---

## 2. API Endpoints You Must Implement

### Endpoint 1: Gemini "Why You'll Love It" Rationale
* **Route:** `POST /api/v1/ai/explain`
* **Request Body:**
```json
{
  "query": "mind-bending sci-fi with time dilation and heartbreak",
  "bookId": "bk_102",
  "bookTitle": "Dark Matter",
  "bookBlurb": "Are you happy with your life? Those are the last words Jason Dessen hears..."
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "cached": false,
  "rationale": "Dark Matter delivers the exact emotional gut-punch you're looking for, weaving quantum mechanics and parallel dimensions around a frantic search for the family he lost.",
  "idealVibe": ["🌀 Mind-Bender", "⚡ Relentless Pace", "💔 Emotional Core"]
}
```

---

### Endpoint 2: Query Understanding (Messy Prompt Parsing)
* **Route:** `POST /api/v1/ai/parse-query`
* **Request Body:**
```json
{
  "rawQuery": "something dark but hopeful, short, no romance"
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "parsedFilters": {
    "cleanSemanticQuery": "dark hopeful fiction",
    "genresIncluded": ["Fiction", "Sci-Fi", "Dystopian"],
    "genresExcluded": ["Romance"],
    "targetMoods": ["Dark", "Hopeful"],
    "maxPages": 300,
    "minRating": null
  }
}
```

---

### Endpoint 3: Live Book Ingest (Stage Demo Tool)
* **Route:** `POST /api/v1/books/ingest`
* **Query Parameter:** `?isbn=9780141439518` *(or passed via JSON body)*
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Book successfully fetched from Google Books and indexed into vector catalog.",
  "book": {
    "id": "bk_ingest_9780141439518",
    "isbn": "9780141439518",
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "publishedYear": 1813,
    "pageCount": 432,
    "coverImageUrl": "https://books.google.com/books/content?id=...",
    "genres": ["Classics", "Romance", "Literature"],
    "vibes": ["🎩 Regency Era", "💬 Sharp Wit", "❤️ Slow Burn Romance"],
    "rating": 4.6
  }
}
```

---

## 3. Integration Points & Dependencies

1. **Outgoing to Backend 1 (Recommendation Engine):**
   - Provide the `ParsedFilters` schema to Backend 1's search route.
2. **Book Vectorization on Ingest:**
   - When a book is ingested, call Backend 1's embedding function to add the new book's vector into the in-memory cosine matrix.
3. **Data Uniformity:**
   - Always return the canonical `Book` object schema defined in [SHARED_SCHEMAS_AND_INTEGRATION.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/SHARED_SCHEMAS_AND_INTEGRATION.md).

---

## 4. Emergency Fallback Plan (If Time Gets Tight)
* If behind schedule:
  1. Cut `POST /books/ingest` first (stage ingest is a bonus; use pre-seeded books).
  2. For query parsing, use simple regex keyword extraction if Gemini latency is high.
  3. **Non-negotiable:** Gemini "Why You'll Love It" rationales with instant `(query_hash, book_id)` caching and deterministic template fallback.
