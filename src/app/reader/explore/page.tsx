"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "@/app/header/page";

const categories = ["Guitar", "Piano", "Drums", "Theory"];

// Static learning content
const lessons = [
  { title: "C Major Chord", author: "Guitar Basics", xp: 50, type: "Guitar" },
  { title: "G Major Chord", author: "Guitar Basics", xp: 50, type: "Guitar" },
  { title: "4/4 Drum Beat", author: "Rhythm 101", xp: 100, type: "Drums" },
  { title: "Circle of Fifths", author: "Music Theory", xp: 150, type: "Theory" },
  { title: "F Minor Scale", author: "Piano Mastery", xp: 75, type: "Piano" },
  { title: "Power Chords", author: "Rock Guitar", xp: 60, type: "Guitar" },
];

export default function ArtistExploreSection() {
  const [activeCategory, setActiveCategory] = useState("Guitar");

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />

      {/* HERO */}
      <section className="px-10 py-10 flex flex-col-reverse md:flex-row justify-between items-center bg-yellow-50">
        <div>
            <h1 className="text-4xl font-mono font-bold mb-2">Artist & Venue Explore</h1>
            <p className="text-gray-700 max-w-md">
                Discover new artists, venues, and opportunities to collaborate and perform.
            </p>
        </div>
        {/* Snoopy Reading = Studying Music Theory */}
        <Image
          src="/books_snoop.jpg"
          alt="Music collaboration illustration"
          width={160}
          height={160}
          className="object-contain rounded-xl shadow-md mb-6 md:mb-0"
        />
      </section>

      {/* FILTER */}
      <div className="sticky top-[73px] bg-white z-40 py-4 border-b px-10">
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(c)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition whitespace-nowrap
                ${
                  activeCategory === c
                    ? "bg-black text-white"
                    : "bg-white text-black border hover:bg-gray-50"
                }
              `}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* LESSON GRID */}
      <section className="px-10 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lessons.filter(l => l.type === activeCategory).map((lesson, index) => (
          <div
            key={index}
            className="border-2 border-black rounded-xl p-6 flex flex-col items-start shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer bg-white"
          >
            <span className="bg-yellow-300 px-2 py-1 text-xs font-bold rounded mb-3 uppercase tracking-wide">
                {lesson.type}
            </span>

            <h3 className="font-bold text-xl mb-1">{lesson.title}</h3>
            <p className="text-gray-500 text-sm mb-6">{lesson.author}</p>

            <div className="mt-auto w-full flex justify-between items-center">
                <span className="text-sm font-mono">Reward</span>
                <span className="font-bold text-lg">+{lesson.xp} XP</span>
            </div>
            
            <button className="mt-4 w-full py-2 bg-black text-white rounded-lg text-sm font-bold">
              Start Lesson
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}