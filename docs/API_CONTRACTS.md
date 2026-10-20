# 📜 API Contracts & Interface Specification

> **Base URL:** `http://localhost:8000/api/v1`  
> **Format:** Standard JSON (`Content-Type: application/json`)  
> **Status:** **FROZEN FOR HACKATHON SPRINT**  

---

## 1. Global Standards & Error Envelope

All responses adhere to standard HTTP status codes. In case of error, the payload conforms to:

```json
{
  "success": false,
  "error": {
    "code": "BOOK_NOT_FOUND",
    "message": "Book with ID 402 was not found in the catalog."
  }
}
```

---

## 2. Module 1: Core Catalog & User Services
* **Owner:** Backend Developer 1  
* **Router Prefix:** `/api/v1/core` & `/api/v1/books`

---

### 2.1 Create Guest Session
* **Method:** `POST`
* **Endpoint:** `/auth/guest-session`
* **Description:** Initializes an anonymous session so users can save books without signing up.

#### Request:
```json
{
  "clientDeviceId": "uuid-optional-or-random-string"
}
```

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "userId": "usr_guest_9921",
    "isGuest": true,
    "createdAt": "2026-10-20T10:00:00Z"
  }
}
```

---

### 2.2 Search Books by Keyword
* **Method:** `GET`
* **Endpoint:** `/books/search?q={query}&genre={genre}&page=1&limit=10`
* **Description:** Standard keyword search matching title, author, or tags.

#### Response (200 OK):
```json
{
  "success": true,
  "total": 42,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": "bk_101",
      "isbn": "9780062316097",
      "title": "Sapiens: A Brief History of Humankind",
      "author": "Yuval Noah Harari",
      "publishedYear": 2014,
      "coverImageUrl": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
      "rating": 4.5,
      "ratingCount": 12450,
      "pageCount": 443,
      "genres": ["History", "Anthropology", "Non-fiction"],
      "description": "Explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be human."
    }
  ]
}
```

---

### 2.3 Get Book Detail by ID
* **Method:** `GET`
* **Endpoint:** `/books/{bookId}`

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "bk_101",
    "isbn": "9780062316097",
    "title": "Sapiens: A Brief History of Humankind",
    "author": "Yuval Noah Harari",
    "publishedYear": 2014,
    "coverImageUrl": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
    "rating": 4.5,
    "pageCount": 443,
    "genres": ["History", "Anthropology", "Non-fiction"],
    "description": "Explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be human.",
    "googleBooksUrl": "https://books.google.com/books?id=FmyBAwAAQBAJ"
  }
}
```

---

### 2.4 Manage Bookshelf (Reading Lists)
* **Method:** `GET` | `POST` | `DELETE`
* **Endpoint:** `/bookshelves/{userId}`

#### `GET` Response:
```json
{
  "success": true,
  "userId": "usr_guest_9921",
  "shelves": {
    "wantToRead": [
      { "id": "bk_101", "title": "Sapiens", "author": "Yuval Noah Harari", "addedAt": "2026-10-20T10:05:00Z" }
    ],
    "currentlyReading": [],
    "finished": []
  }
}
```

#### `POST` Request (Add book to shelf):
```json
{
  "bookId": "bk_101",
  "shelfStatus": "wantToRead"
}
```

---

## 3. Module 2: Recommendation & Semantic Search
* **Owner:** Backend Developer 2  
* **Router Prefix:** `/api/v1/recommendations`

---

### 3.1 Semantic Natural Language Discovery (Core Innovation)
* **Method:** `POST`
* **Endpoint:** `/recommendations/semantic`
* **Description:** Takes freeform user queries (e.g. *"dark gothic mystery with witty banter and an unexpected plot twist"*) and computes cosine distance over book blurb embeddings.

#### Request:
```json
{
  "prompt": "Cyberpunk detective thriller with rogue AI in a neon rain-soaked city",
  "moods": ["Dark", "Thought-Provoking", "Fast-Paced"],
  "minRating": 4.0,
  "limit": 6
}
```

#### Response (200 OK):
```json
{
  "success": true,
  "query": "Cyberpunk detective thriller with rogue AI in a neon rain-soaked city",
  "matchedCount": 6,
  "data": [
    {
      "id": "bk_205",
      "title": "Neuromancer",
      "author": "William Gibson",
      "coverImageUrl": "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&w=400&q=80",
      "rating": 4.2,
      "genres": ["Sci-Fi", "Cyberpunk"],
      "similarityScore": 0.94,
      "vibeMatchScore": 0.91,
      "description": "The matrix is a world within the world, a global consensus- hallucination, the representation of every byte of data in cyberspace..."
    },
    {
      "id": "bk_310",
      "title": "Altered Carbon",
      "author": "Richard K. Morgan",
      "coverImageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
      "rating": 4.1,
      "genres": ["Sci-Fi", "Noir", "Cyberpunk"],
      "similarityScore": 0.89,
      "vibeMatchScore": 0.88,
      "description": "In the twenty-fifth century, human consciousness can be stored in digital form and downloaded into new bodies..."
    }
  ]
}
```

---

### 3.2 Similar Books ("Readers Also Loved")
* **Method:** `GET`
* **Endpoint:** `/recommendations/similar/{bookId}?limit=4`
* **Description:** Recommends closest vector matches or shared metadata for a selected book.

#### Response (200 OK):
```json
{
  "success": true,
  "baseBookId": "bk_205",
  "data": [
    {
      "id": "bk_310",
      "title": "Altered Carbon",
      "author": "Richard K. Morgan",
      "similarityScore": 0.89,
      "commonThemes": ["Dystopian Cyberpunk", "Consciousness", "Noir Detective"]
    }
  ]
}
```

---

### 3.3 Personalized "NextRead" For You
* **Method:** `POST`
* **Endpoint:** `/recommendations/personalized`
* **Description:** Reads user's saved bookshelf and builds a composite taste profile vector to find new recommendations.

#### Request:
```json
{
  "userId": "usr_guest_9921",
  "likedBookIds": ["bk_101", "bk_205"],
  "targetVibe": "Mind-Expanding"
}
```

#### Response (200 OK):
```json
{
  "success": true,
  "userTasteProfile": {
    "dominantGenres": ["Sci-Fi", "Anthropology", "Speculative"],
    "favoriteThemes": ["Human Nature", "Technological Impact"]
  },
  "recommendations": [
    {
      "id": "bk_412",
      "title": "Klara and the Sun",
      "author": "Kazuo Ishiguro",
      "rating": 4.3,
      "matchScore": 0.93,
      "reason": "Bridges your interest in human consciousness with philosophical fiction."
    }
  ]
}
```

---

## 4. Module 3: AI Insights & External Enrichment
* **Owner:** Backend Developer 3  
* **Router Prefix:** `/api/v1/ai` & `/api/v1/external`

---

### 4.1 AI-Generated "Why You'll Love This" (The Pitch Generator)
* **Method:** `POST`
* **Endpoint:** `/ai/explain`
* **Description:** Uses Gemini API to craft a custom, punchy 2-sentence rationale connecting the book directly to what the reader asked for.

#### Request:
```json
{
  "bookId": "bk_205",
  "bookTitle": "Neuromancer",
  "bookDescription": "The sky above the port was the color of television, tuned to a dead channel...",
  "userPrompt": "Cyberpunk detective thriller with rogue AI"
}
```

#### Response (200 OK):
```json
{
  "success": true,
  "bookId": "bk_205",
  "aiExplanation": {
    "pitch": "Neuromancer is the grandfather of neon noir and rogue AI. Its gritty prose and cybernetic heist plot precisely hit the rain-soaked dystopian vibe you're craving.",
    "idealReadingSpot": "Late at night with a cup of black coffee while rain hits your window.",
    "readingPace": "Fast & Intense",
    "keyVibes": ["⚡ Adrenaline", "🌧️ Atmospheric Noir", "🤖 Rogue AI"]
  }
}
```

---

### 4.2 AI Smart Summary & Review TL;DR
* **Method:** `POST`
* **Endpoint:** `/ai/tldr`

#### Response (200 OK):
```json
{
  "success": true,
  "bookId": "bk_205",
  "summary": {
    "oneLiner": "A washed-up computer hacker is hired for one last impossible cyber-heist.",
    "pros": [
      "Pioneered the entire cyberpunk genre",
      "Incredible visual atmosphere and world-building"
    ],
    "headsUp": "Dense terminology that requires your full focus for the first 30 pages."
  }
}
```

---

### 4.3 External Cover & Metadata Enrichment Fallback
* **Method:** `GET`
* **Endpoint:** `/external/enrich?isbn={isbn}&title={title}&author={author}`
* **Description:** Queries Google Books API to ensure every book has a 100% valid high-res cover image and Google Books preview link.

#### Response (200 OK):
```json
{
  "success": true,
  "highResCover": "https://books.google.com/books/content?id=...&printsec=frontcover&img=1&zoom=1",
  "previewUrl": "https://books.google.com/books?id=...",
  "ratingsCount": 32014,
  "source": "google_books_api"
}
```

---

## 5. Mock Data Quick Reference for Frontend

Member 1 (Frontend) can immediately import this mock array into their state or local test suite:

```javascript
export const MOCK_RECOMMENDATIONS = [
  {
    id: "bk_1",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImageUrl: "https://images.unsplash.com/photo-1532012164546-f432f2e379b2?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    similarityScore: 0.96,
    genres: ["Sci-Fi", "Space", "Humor"],
    pitch: "A lone astronaut must solve an extinction-level crisis armed with science, optimism, and an unforgettable alien friendship.",
    keyVibes: ["🚀 Hard Sci-Fi", "🤝 Buddy Dynamic", "🧠 High Stakes Puzzle"]
  },
  {
    id: "bk_2",
    title: "Dark Matter",
    author: "Blake Crouch",
    coverImageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    similarityScore: 0.92,
    genres: ["Thriller", "Quantum Physics", "Mystery"],
    pitch: "Are you happy with your life? A mind-bending multiverse race to get back to the family he left behind.",
    keyVibes: ["🌀 Multiverse", "⚡ Relentless Pace", "❤️ Emotional Core"]
  }
];
```
