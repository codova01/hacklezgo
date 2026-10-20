# 📜 Member Contract: Frontend Developer & UI/UX Designer
## Domain: User Interface, Design System & Client State

> **Owner:** Frontend Lead & Designer (Member 1)  
> **Key Objective:** Build a visually stunning, responsive, and animated web application that wows judges in the first 5 seconds and seamlessly integrates all three backend modules.

---

## 1. Feature Specifications & Views to Build

### 1. Hero & Natural Language Discovery Bar
* Prominent, centered input bar with placeholder cycling through creative prompts:
  - *"A snowy psychological thriller where everyone is lying..."*
  - *"Cozy tea-shop fantasy with found family..."*
  - *"Mind-bending sci-fi with time loops and heartbreak..."*
* **Filter Pills (Optional Quick Tags):** Mood chips (`#Dark`, `#Cozy`, `#MindBender`, `#FastPaced`, `#Space`) and page count sliders.
* **Search State Management:** Display animated skeleton loaders while queries are in-flight (< 400ms).

### 2. Intelligent Book Recommendation Card
Each card must render the canonical `Book` object:
* High-res book cover with subtle 3D hover tilt.
* Title, Author, Year, Page Count, and Star Rating badge.
* **Similarity Score Pill:** e.g. `96% Match`.
* **Gemini AI Insight Chip:** Highlighted badge displaying the 2-sentence *"Why You'll Love This"* rationale.
* **Action Buttons:**
  - `+ Add to Shelf` (opens status selector: *Want to Read*, *Reading*, *Finished*).
  - `Similar Books` (triggers `GET /books/{id}/similar`).
  - `Select for Blend` (adds to Book Blend staging dock).

### 3. "Book Blend" UI Dock (Flashy Demo Component ⭐)
* Floating or dedicated drawer where user drops/selects two books.
* Displays: `[Book A Cover] + [Book B Cover] = [Blend Button]`.
* On click, calls `POST /recommendations/blend` and reveals the blended books with the blend rationale!

### 4. My Bookshelf & "Reading DNA" Drawer
* Sliding side-drawer or tab showing:
  - Three filterable tabs: *Want to Read*, *Reading*, *Finished*.
  - Star rating input (1 to 5 stars) on any saved book.
  - **Reading DNA Widget:** Real-time mini charts showing user's top vibes and favorite genres (from `GET /users/me/taste`).

### 5. Instant Guest Onboarding & Offline Demo Toggle
* On initial app load, call `POST /auth/guest-session` and store the JWT in `localStorage`. Zero login friction for judges.
* **Judge Safety Switch:** A subtle switch in the footer/header to toggle between `Live API (localhost:8000)` and `Mock Data Mode (local seed_books.json)` in case venue Wi-Fi fails!

---

## 2. API Endpoints You Will Consume

| Action | Target Endpoint | Backend Owner |
|---|---|---|
| Initialize Guest Session | `POST /api/v1/auth/guest-session` | Backend 2 (Core DB) |
| Execute Semantic Search | `POST /api/v1/recommendations/semantic` | Backend 1 (Recs) |
| Fetch Similar Books | `GET /api/v1/books/{id}/similar` | Backend 1 (Recs) |
| Run Book Blend | `POST /api/v1/recommendations/blend` | Backend 1 (Recs) |
| Get User Shelves | `GET /api/v1/bookshelves/me` | Backend 2 (Core DB) |
| Add/Update Book on Shelf | `POST /api/v1/bookshelves/items` | Backend 2 (Core DB) |
| Fetch User Taste Profile | `GET /api/v1/users/me/taste` | Backend 2 (Core DB) |
| Generate AI "Why You'll Love It" | `POST /api/v1/ai/explain` | Backend 3 (GenAI) |
| Live Stage ISBN Ingest | `POST /api/v1/books/ingest?isbn=...` | Backend 3 (GenAI) |

---

## 3. UI/UX Standards & Aesthetics
* **Palette:** Sleek dark-mode aesthetic (Deep obsidian `#0f172a`, glowing violet accent `#8b5cf6`, warm amber `#f59e0b` for ratings, emerald `#10b981` for match percentages).
* **Typography:** Modern sans-serif (e.g. *Outfit*, *Inter*, or *Plus Jakarta Sans* via Google Fonts).
* **Micro-Animations:** Smooth card fade-ins, pulse animations during vector search, and satisfying shelf-check badges.

---

## 4. Work Immediately Without Waiting for Backends!
Import [data/seed_books.json](file:///c:/Users/acer/OneDrive/Desktop/Navya/hacklezgo/data/seed_books.json) directly into your React state on Hour 1. You can build 100% of the UI, test layouts, and wire animations before any backend server is even turned on!
