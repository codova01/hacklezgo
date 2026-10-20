
"use client";

import { useState } from "react";
import { books as seedBooks } from "../lib/books";



export default function Home() {
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState("Mind-bending");
  const [saved, setSaved] = useState<string[]>([]);

  function toggleSaved(title: string) {
    setSaved((old) =>
      old.includes(title)
        ? old.filter((item) => item !== title)
        : [...old, title]
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0d10] text-[#f4f0e8]">
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-16">
        <a href="#" className="text-2xl font-bold tracking-tight">
          <span className="text-[#c7f277]">N.</span> nextread
        </a>
        <a
          href="#bookshelf"
          className="rounded-full border border-white/15 px-5 py-2 text-sm hover:border-[#c7f277]"
        >
          My bookshelf <span className="text-[#c7f277]">{saved.length}</span>
        </a>
      </nav>

      <section className="mx-auto max-w-5xl px-6 pb-20 pt-20 md:px-12 md:pt-28">
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#c7f277]">
          <span>✳</span> YOUR PERSONAL BOOK DISCOVERY ENGINE
        </div>

        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight md:text-7xl">
          You bring the vibe.
          <br />
          <span className="text-[#c7f277]">We&apos;ll find the story.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-white/55 md:text-lg">
          Forget genres. Describe a feeling, a late-night thought, or the
          beautifully specific chaos you want to read.
        </p>

        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-3 shadow-2xl shadow-black/20 sm:flex-row sm:items-center">
          <span className="pl-2 text-2xl text-[#c7f277]">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                document.getElementById("results")?.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            placeholder="A mind-bending sci-fi with time loops and heartbreak..."
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-white/30 md:text-base"
            aria-label="Describe your ideal book"
          />
          <button
            onClick={() =>
              document.getElementById("results")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="rounded-xl bg-[#c7f277] px-6 py-4 font-semibold text-[#17190f] transition hover:bg-[#d8ff91]"
          >
            Find my book ↗
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="mr-1 text-xs tracking-wider text-white/40">
            PICK YOUR VIBE
          </span>
          {["Mind-bending", "Dark academia", "Slow burn", "Existential", "Feel-good"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setMood(item)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  mood === item
                    ? "border-[#c7f277] bg-[#c7f277]/10 text-[#c7f277]"
                    : "border-white/10 text-white/60 hover:border-white/30"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
        <p className="mt-5 text-xs text-white/30">
          Currently exploring: <span className="text-white/60">{mood}</span>
        </p>
      </section>

      <section id="results" className="mx-auto max-w-7xl scroll-mt-8 px-6 pb-24 md:px-12">
        <div className="mb-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#c7f277]">
              YOUR NEXT CHAPTER
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Stories worth getting lost in.
            </h2>
            <p className="mt-3 text-sm text-white/45">
              Sample picks for the curious mind. Real AI search comes next.
            </p>
          </div>
          <span className="text-sm text-white/40">{seedBooks.length} BOOKS / DISCOVER</span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {seedBooks.map((book, index) => (
            <article
              key={book.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <div className="flex h-64 items-center justify-center overflow-hidden bg-transparent p-4">
  <img
    src={book.coverImageUrl}
    alt={`Cover of ${book.title}`}
    className="h-full max-w-full rounded-lg object-contain shadow-2xl"
  />
</div>

              <div className="p-6">
                <p className="min-h-[48px] text-sm leading-6 text-white/60">
                  {book.description}
                </p>

                <div className="mt-6 rounded-xl border border-[#c7f277]/15 bg-[#c7f277]/[0.05] p-4">
                  <p className="mb-2 text-[10px] font-bold tracking-[0.15em] text-[#c7f277]">
                    ✳ WHY IT FITS
                  </p>
                  <p className="text-sm leading-6 text-white/75">
                    {book.aiPitch}
                  </p>
                </div>

                <button
                  onClick={() => toggleSaved(book.title)}
                  className={`mt-5 w-full rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    saved.includes(book.title)
                      ? "border-[#c7f277] bg-[#c7f277]/10 text-[#c7f277]"
                      : "border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {saved.includes(book.title) ? "✓ Saved to bookshelf" : "+ Add to bookshelf"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="bookshelf" className="mx-auto max-w-7xl scroll-mt-8 px-6 pb-24 md:px-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 md:p-10">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#c7f277]">
            YOUR PERSONAL COLLECTION
          </p>
          <h2 className="text-3xl font-semibold">My bookshelf.</h2>
          <p className="mt-3 text-sm text-white/50">
            {saved.length
              ? `${saved.length} book${saved.length === 1 ? "" : "s"} saved for your next reading adventure.`
              : "The books you save will show up here. Your reading journey starts with one."}
          </p>

          {saved.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {saved.map((title) => (
                <button
                  key={title}
                  onClick={() => toggleSaved(title)}
                  className="rounded-full border border-[#c7f277]/30 px-4 py-2 text-sm text-[#c7f277] hover:bg-[#c7f277]/10"
                >
                  {title} ×
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-3 border-t border-white/10 px-6 py-7 text-xs text-white/35 sm:flex-row md:px-12">
        <span><span className="text-[#c7f277]">N.</span> nextread</span>
        <span>Less scrolling. More feeling something.</span>
        <span>BUILT FOR THE CURIOUS ↗</span>
      </footer>
    </main>
  );
}
