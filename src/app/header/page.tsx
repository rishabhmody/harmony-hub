'use client'

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>('artist');
  const [homePath, setHomePath] = useState<string>('/reader/dashboard');
  const [explorePath, setExplorePath] = useState<string>('/reader/explore');
  const [leaderboardPath, setLeaderboardPath] = useState<string>('/reader/leaderboard');

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const role = (session.user as any).role || 'artist';
      setUserRole(role);
      
      if (role === 'venue') {
        setHomePath('/curator/dashboard');
        setExplorePath('/curator/explore');
        setLeaderboardPath('/curator/leaderboard');
      } else {
        setHomePath('/reader/dashboard');
        setExplorePath('/reader/explore');
        setLeaderboardPath('/reader/leaderboard');
      }
    }
  }, [session, status]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/home');
  };

  return (
    <header className="w-full border-b bg-white font-sans sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT — LOGO */}
        <Link href={homePath} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold hidden sm:block">Harmony Hub</span>
        </Link>

        {/* CENTER — NAV */}
        <nav className="hidden md:flex gap-10 text-gray-700 text-lg font-medium">
          <Link href={homePath} className="hover:text-black transition">Home</Link>
          <Link href={explorePath} className="hover:text-black transition">Learning Centre</Link>
          <Link href={leaderboardPath} className="hover:text-black transition">Leaderboard</Link>
        </nav>

        {/* RIGHT — PROFILE & SIGN OUT */}
        <div className="flex items-center gap-4">
          {status === 'authenticated' && (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              Sign Out
            </button>
          )}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100">
            <span className="text-lg">🎸</span>
          </div>
        </div>

      </div>
    </header>
  );
}