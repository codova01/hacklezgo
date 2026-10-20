# 📜 Member Contract: Backend Developer 2
## Domain: Core API & Database Layer

> **Owner:** Backend Developer 2  
> **Key Objective:** Deliver frictionless guest session persistence, bookshelf CRUD with ratings, user taste profile aggregation, and shareable reading lists.

---

## 1. Feature Specifications (Assigned Scope)

### 1. Bookshelves with Reading Status & Lightweight Guest Auth
* **Frictionless Onboarding:** Use lightweight guest sessions with signed JWT tokens to completely skip an onboarding/login flow so judges can test instantly without typing an email or password.
* **Bookshelf States:** Support the three standard states:
  - `wantToRead`
  - `reading`
  - `finished`
* **Ratings:** Allow users to attach a 1 to 5 star rating (with optional short review snippet) to any book in their shelf.

### 2. Taste Profile Aggregator (`GET /users/me/taste`)
* Analyzes all books in a user's `reading` and `finished` shelves and their 4-5 star ratings.
* Aggregates:
  - Favorite genres with normalized weights (0.0 to 1.0)
  - Top vibes (e.g. `{"Dark": 0.85, "MindBender": 0.90, "Cozy": 0.15}`)
  - Average page length preferred by the reader
* **Consumer:** Feeds Backend 1's personalized re-ranking engine.

### 3. Shareable Reading Lists
* `POST /api/v1/lists`: Takes a list of book IDs and a title (e.g. *"My 2026 Hackathon Must-Reads"*), saves it, and generates a unique shareable slug (e.g. `nextread.app/list/cyberpunk-weekend-49a`).
* `GET /api/v1/lists/{slug}`: Returns a clean, public read-only view of the book list with titles, covers, and annotations.

---

## 2. API Endpoints You Must Implement

### Endpoint 1: Guest Session Generation
* **Route:** `POST /api/v1/auth/guest-session`
* **Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "userId": "usr_guest_8812",
  "isGuest": true
}
```

---

### Endpoint 2: Bookshelf Management
* **Route:** `GET /api/v1/bookshelves/me`  *(Requires Bearer JWT)*
* **Response (200 OK):**
```json
{
  "success": true,
  "userId": "usr_guest_8812",
  "shelves": {
    "wantToRead": [
      {
        "id": "bk_101",
        "title": "Project Hail Mary",
        "author": "Andy Weir",
        "coverImageUrl": "https://images.unsplash.com/photo-1532012164546-f432f2e379b2?auto=format&fit=crop&w=400&q=80",
        "addedAt": "2026-10-20T11:00:00Z"
      }
    ],
    "reading": [],
    "finished": []
  }
}
```

* **Route:** `POST /api/v1/bookshelves/items`
* **Request Body:**
```json
{
  "bookId": "bk_101",
  "shelfStatus": "wantToRead",
  "userRating": 5,
  "notes": "Recommended for the sci-fi hackathon demo"
}
```

---

### Endpoint 3: Taste Profile Aggregator
* **Route:** `GET /api/v1/users/me/taste`
* **Response (200 OK):**
```json
{
  "success": true,
  "userId": "usr_guest_8812",
  "tasteProfile": {
    "favoriteGenres": {
      "Sci-Fi": 0.85,
      "Psychological Thriller": 0.70,
      "Non-Fiction": 0.30
    },
    "topVibes": {
      "MindBender": 0.90,
      "Adrenaline": 0.80,
      "Cozy": 0.15
    },
    "averagePageLength": 410,
    "likedBookIds": ["bk_101", "bk_102"],
    "totalBooksRated": 6
  }
}
```

---

### Endpoint 4: Shareable Reading Lists
* **Route:** `POST /api/v1/lists`
* **Request Body:**
```json
{
  "title": "Autumn Mystery Picks",
  "description": "The best cozy and psychological crime books for cold nights.",
  "bookIds": ["bk_104", "bk_102"]
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "slug": "autumn-mystery-picks-7b2",
  "shareUrl": "http://localhost:3000/lists/autumn-mystery-picks-7b2"
}
```

* **Route:** `GET /api/v1/lists/{slug}`
* **Response (200 OK):** Returns list metadata and the array of standard `Book` objects.

---

## 3. Integration Points & Dependencies

1. **Outgoing to Backend 1 (Recommendation Engine):**
   - Provide the taste profile JSON via `GET /users/me/taste` or an internal Python service call.
2. **Database Storage:**
   - Host the SQLite or PostgreSQL instance using the tables defined in [DATABASE_SCHEMA.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/DATABASE_SCHEMA.md).
3. **Data Uniformity:**
   - Always return the canonical `Book` object schema defined in [SHARED_SCHEMAS_AND_INTEGRATION.md](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/docs/contracts/SHARED_SCHEMAS_AND_INTEGRATION.md).

---

## 4. Emergency Fallback Plan (If Time Gets Tight)
* If behind schedule:
  1. Cut `POST /api/v1/lists` (shareable lists) first.
  2. Simplify taste aggregation to returning the list of liked book IDs and top 2 genres.
  3. **Non-negotiable:** Guest session JWT issuance and bookshelf add/view (`wantToRead`, `finished`) must be rock solid for the live demo.
