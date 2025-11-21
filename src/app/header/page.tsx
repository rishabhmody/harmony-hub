import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white font-sans sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT — LOGO */}
        <Link href="/reader/dashboard" className="flex items-center gap-2">
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
          <Link href="/reader/dashboard" className="hover:text-black transition">Home</Link>
          <Link href="/reader/explore" className="hover:text-black transition">Explore</Link>
          <Link href="/reader/leaderboard" className="hover:text-black transition">Leaderboard</Link>
        </nav>

        {/* RIGHT — PROFILE */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100">
           <span className="text-lg">🎸</span>
        </div>

      </div>
    </header>
  );
}