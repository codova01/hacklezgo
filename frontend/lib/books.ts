
import seedBooks from "../data/seed_books.json";

export type Book = {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publishedYear: number;
  rating: number;
  ratingCount: number;
  pageCount: number;
  genres: string[];
  vibes: string[];
  coverImageUrl: string;
  description: string;
  aiPitch: string;
};

export const books: Book[] = seedBooks;
