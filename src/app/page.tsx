import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans flex flex-col items-center justify-center">
      
      <div className="mb-12 flex items-center gap-3">
        <Image src="/logo.png" alt="Logo" width={60} height={60} />
        <h1 className="text-4xl font-bold tracking-tight">Harmony Hub</h1>
      </div>

      <h2 className="text-2xl font-light mb-10 text-center max-w-md">
        Discover, collaborate, and perform. <br/> A dynamic platform for artists and musicians.
      </h2>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl px-6">
        
        {/* BAND OPTION */}
        <Link 
          href="/reader/login" 
          className="flex-1 group border-2 border-black rounded-3xl p-8 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer flex flex-col items-center"
        >
          <div className="h-40 flex items-center justify-center mb-6">
             {/* Reusing existing asset - Snoopy on scooter represents Touring/Bands */}
             <Image 
               src="/snoopy_left.png" 
               width={150} 
               height={150} 
               alt="Band" 
               className="object-contain group-hover:invert group-hover:brightness-0"
             />
          </div>
          <h3 className="text-3xl font-mono mb-2">I'm a Band</h3>
          <p className="text-center opacity-70">
            Find venues, learn new chords, and climb the artist leaderboard.
          </p>
        </Link>

        {/* VENUE OPTION */}
        <Link 
          href="/curator/login" 
          className="flex-1 group border-2 border-black rounded-3xl p-8 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer flex flex-col items-center"
        >
          <div className="h-40 flex items-center justify-center mb-6">
             {/* Reusing existing asset - Snoopy with books represents History/Records */}
             <Image 
               src="/books_snoop.jpg" 
               width={150} 
               height={150} 
               alt="Venue" 
               className="object-contain rounded-xl" 
             />
          </div>
          <h3 className="text-3xl font-mono mb-2">I'm a Venue</h3>
          <p className="text-center opacity-70">
            Scout talent, log hosted gigs, and manage your lineup.
          </p>
        </Link>

      </div>
    </main>
  );
}