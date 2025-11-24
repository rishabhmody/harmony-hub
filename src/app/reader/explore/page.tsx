"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/app/reader/header/page";
import Footer from "@/app/footer/page";

const categories = ["Guitar", "Piano", "Drums", "Theory", "Vocals", "Production"];

// Static learning content
const lessons = [
  { id: "1", title: "C Major Chord", author: "Guitar Basics", xp: 50, type: "Guitar", difficulty: "Beginner" },
  { id: "2", title: "G Major Chord", author: "Guitar Basics", xp: 50, type: "Guitar", difficulty: "Beginner" },
  { id: "3", title: "4/4 Drum Beat", author: "Rhythm 101", xp: 100, type: "Drums", difficulty: "Beginner" },
  { id: "4", title: "Circle of Fifths", author: "Music Theory", xp: 150, type: "Theory", difficulty: "Intermediate" },
  { id: "5", title: "Piano Fundamentals: Scales", author: "Piano Mastery", xp: 50, type: "Piano", difficulty: "Beginner", objective: "Master major and minor scales on piano" },
  { id: "6", title: "Power Chords", author: "Rock Guitar", xp: 60, type: "Guitar", difficulty: "Beginner" },
  { id: "7", title: "Vocal Warm-ups", author: "Singing Success", xp: 40, type: "Vocals", difficulty: "Beginner" },
  { id: "8", title: "Intro to Compression", author: "Audio Production", xp: 120, type: "Production", difficulty: "Intermediate" },
];

export default function ArtistExploreSection() {
  const { data: session, status } = useSession();
  const [activeCategory, setActiveCategory] = useState("Guitar");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [isCompleting, setIsCompleting] = useState(false);

  // Get user-specific localStorage key
  const getStorageKey = () => {
    if (session?.user?.email) {
      return `completedLessons_${session.user.email}`;
    }
    return null;
  };

  // Load completed lessons from localStorage when session is available
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only proceed if we have an authenticated session with email
    if (status === 'authenticated' && session?.user?.email) {
      const userEmail = session.user.email;
      const storageKey = `completedLessons_${userEmail}`;
      const saved = localStorage.getItem(storageKey);
      
      if (saved) {
        try {
          const lessonIds = JSON.parse(saved);
          if (Array.isArray(lessonIds)) {
            setCompletedLessons(new Set(lessonIds));
          } else {
            setCompletedLessons(new Set());
          }
        } catch (error) {
          console.error('Error loading completed lessons:', error);
          setCompletedLessons(new Set());
        }
      } else {
        // No saved data for this user - start with empty set
        setCompletedLessons(new Set());
      }
    } else if (status === 'unauthenticated') {
      // User is not authenticated - clear completed lessons
      setCompletedLessons(new Set());
    }
  }, [session?.user?.email, status]);

  // Save completed lessons to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && session?.user?.email && completedLessons.size > 0) {
      const storageKey = getStorageKey();
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(completedLessons)));
      }
    }
  }, [completedLessons, session?.user?.email]);

  const handleStartLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleCompleteLesson = async () => {
    if (!selectedLesson || completedLessons.has(selectedLesson.id)) return;
    
    setIsCompleting(true);
    try {
      const response = await fetch('/api/complete-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: selectedLesson.id,
          xp: selectedLesson.xp,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        const updatedCompleted = new Set([...completedLessons, selectedLesson.id]);
        setCompletedLessons(updatedCompleted);
        // Save to localStorage immediately with user-specific key
        if (typeof window !== 'undefined' && session?.user?.email) {
          const storageKey = `completedLessons_${session.user.email}`;
          localStorage.setItem(storageKey, JSON.stringify(Array.from(updatedCompleted)));
        }
        // Close modal and show success
        setIsModalOpen(false);
        // Optionally refresh to update XP in dashboard
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        const errorMessage = data.message || 'Failed to complete lesson. Please try again.';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      {/* HERO */}
      <section className="px-10 py-10 flex flex-col-reverse md:flex-row justify-between items-center bg-gray-800">
        <div>
            <h1 className="text-4xl font-mono font-bold mb-2">Learning Centre</h1>
            <p className="text-gray-400 max-w-md">
                Discover new lessons, master skills, and earn XP to climb the leaderboard.
            </p>
        </div>
        <Image
          src="/learning_icon.png"
          alt="Music collaboration illustration"
          width={150}
          height={150}
          className="object-contain rounded-xl shadow-md mb-6 md:mb-0"
        />
      </section>

      {/* FILTER */}
      <div className="sticky top-0 bg-gray-900 z-40 py-4 border-b border-gray-700 px-10">
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(c)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition whitespace-nowrap
                ${
                  activeCategory === c
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
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
        {lessons.filter(l => l.type === activeCategory).map((lesson, index) => {
          const isCompleted = completedLessons.has(lesson.id);
          return (
            <div
              key={index}
              className={`border-2 border-gray-700 rounded-xl p-6 flex flex-col items-start shadow-lg hover:shadow-blue-500/50 transition-all cursor-pointer bg-gray-800 ${
                isCompleted ? 'opacity-75' : ''
              }`}
            >
              <span className="bg-blue-500 px-2 py-1 text-xs font-bold rounded mb-3 uppercase tracking-wide">
                  {lesson.type}
              </span>

              <h3 className="font-bold text-xl mb-1">{lesson.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{lesson.author}</p>

              <div className="mt-auto w-full flex justify-between items-center">
                  <span className="text-sm font-mono">Reward</span>
                  <span className="font-bold text-lg text-green-400">+{lesson.xp} XP</span>
              </div>
              
              <button 
                onClick={() => handleStartLesson(lesson)}
                className={`mt-4 w-full py-2 rounded-lg text-sm font-bold transition ${
                  isCompleted 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isCompleted ? 'Completed' : 'Start Lesson'}
              </button>
            </div>
          );
        })}
      </section>

      {/* LESSON MODAL */}
      {isModalOpen && selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={handleCloseModal}>
          <div 
            className="bg-gray-800 text-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start p-5 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{selectedLesson.title}</h2>
                <p className="text-gray-400 text-sm">Learn and complete this lesson to earn XP.</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-200 text-3xl font-light leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-800 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedLesson.difficulty || 'Beginner'}
                </span>
                <span className="bg-purple-800 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedLesson.type}
                </span>
                <span className="flex items-center gap-1 bg-yellow-800 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                  ⭐ {selectedLesson.xp} XP
                </span>
              </div>

              {/* Objective */}
              {selectedLesson.objective && (
                <p className="text-gray-300 mb-5 font-medium">{selectedLesson.objective}</p>
              )}

              {/* Video Player Placeholder */}
              <div className="bg-gray-700 rounded-xl aspect-video flex items-center justify-center mb-5 relative border border-gray-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition shadow-lg">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-400 text-xs absolute bottom-3">Video player would be embedded here</p>
              </div>

              {/* Complete Button */}
              <button
                onClick={handleCompleteLesson}
                disabled={isCompleting || completedLessons.has(selectedLesson.id)}
                className={`w-full py-3 rounded-xl font-bold text-base transition ${
                  completedLessons.has(selectedLesson.id)
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : isCompleting
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                }`}
              >
                {completedLessons.has(selectedLesson.id)
                  ? '✓ Lesson Completed'
                  : isCompleting
                  ? 'Completing...'
                  : 'Complete Lesson & Claim XP'}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}