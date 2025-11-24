"use client";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  xp: number;
  gigsPlayed: number;
  role: string;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="w-full flex flex-col items-center py-12">

      {/* Header */}
      <h1 className="text-5xl font-semibold tracking-wide mb-2">
        Leaderboard
      </h1>

      <p className="text-gray-400 text-lg mb-10 text-center">
        See our top artists and venues! Every lesson or gig brings you closer to the top.
      </p>

      {/* Layout: Leaderboard Left — Image Right */}
      <div className="flex gap-10 items-start">

        {/* 📌 LEFT: Leaderboard */}
        <div className="bg-gray-800 w-[480px] rounded-3xl shadow-xl px-8 py-6 border border-gray-700">
          <h2 className="text-3xl font-semibold text-center mb-6">Top Artists & Venues</h2>

          <div className="flex flex-col gap-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading leaderboard...</p>
            ) : users.length === 0 ? (
              <p className="text-center text-gray-500">No users found</p>
            ) : (
              users.map((user, index) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between bg-gray-700 rounded-2xl px-5 py-4 shadow-sm border border-gray-600"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-medium w-6">{index + 1}.</span>

                    <div className="w-12 h-12 rounded-full border bg-gray-600 flex items-center justify-center">
                      <span className="text-xl">{user.role === 'venue' ? '🎭' : '🎸'}</span>
                    </div>

                    <div>
                      <p className="text-lg font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">
                        {user.role === 'venue' ? 'Venue' : 'Artist'} • {user.gigsPlayed || 0} gigs
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-green-400">
                      {user.xp.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">XP</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 📌 RIGHT: Image */}
        <img
          src="/leaderboard_icon.png"
          alt="Leaderboard Graphic"
          className="w-[320px] h-[420px] object-cover rounded-3xl shadow-md"
        />
      </div>
    </div>
    
    </div>
  );
}


