import { redirect } from "next/navigation";
import Image from "next/image";
import Header from "@/app/header/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { User, Gig } from "@/lib/db/models";

export default async function ArtistDashboard() {
  // Get session using NextAuth
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/reader/login");
  }

  // Connect to database
  await dbConnect();

  // Fetch fresh user data for XP and Stats
  const userData = await User.findOne({ email: session.user.email }).lean() as any;
  
  if (!userData) {
    redirect("/reader/login");
  }

  // In our new context, 'allGigs' are 'Past Gigs/Venues' added by curators
  const allGigs = await Gig.find({}).lean(); 

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />
      
      {/* WELCOME HERO */}
      <section className="px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between bg-gray-50 border-b">
        <div>
          <h1 className="text-4xl font-mono mb-2">Artist Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Hey <span className="font-semibold">{userData.name}</span>! Ready to hit the stage?
          </p>
        </div>
        {/* Snoopy on scooter = Touring Band */}
        <Image
          src="/snoopy_left.png" 
          alt="Touring"
          width={150}
          height={150}
          className="object-contain mt-6 md:mt-0"
        />
      </section>

      {/* DYNAMIC STATS */}
      <section className="px-6 md:px-16 mt-10">
        <h2 className="text-2xl font-mono mb-6 border-l-4 border-black pl-3">Career Stats</h2>
        <div className="flex gap-10 md:gap-20 text-center bg-white border p-6 rounded-2xl shadow-sm max-w-2xl">
          <div>
            <h3 className="text-4xl font-semibold">{userData.gigsPlayed || 0}</h3>
            <p className="text-gray-600 mt-1 text-sm uppercase tracking-wide">Gigs Played</p>
          </div>
          <div>
            <h3 className="text-4xl font-semibold">{userData.xp || 0}</h3>
            <p className="text-gray-600 mt-1 text-sm uppercase tracking-wide">Artist XP</p>
          </div>
        </div>
      </section>

      {/* XP LEVEL BAR */}
      <section className="px-6 md:px-16 mt-10">
        <div className="flex justify-between items-end mb-2 max-w-3xl">
            <h2 className="text-xl font-mono">Current Reputation Level</h2>
            <span className="font-bold font-mono">Lvl {Math.floor(userData.xp / 100) + 1}</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full max-w-3xl overflow-hidden">
          <div
            className="h-4 bg-black rounded-full transition-all duration-500"
            style={{ width: `${Math.min((userData.xp % 100), 100)}%` }} 
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">Earn XP by learning chords or playing venues.</p>
      </section>

      {/* PREVIOUS VENUES (Repurposed Book List) */}
      <section className="px-6 md:px-16 mt-14 mb-16">
        <h2 className="text-3xl font-mono mb-8">Previous Venues</h2>
        {allGigs.length === 0 ? (
           <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-500 italic">No gigs logged in the system yet.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGigs.map((gig: any) => (
              <div key={gig._id.toString()} className="border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-[4px_4px_0_#000] transition bg-white flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {gig.title?.charAt(0) || 'G'}
                    </div>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">{gig.genre || "Live Music"}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-1">{gig.title}</h3> {/* Venue Name */}
                <p className="text-gray-600 text-sm mb-4">Hosted by: {gig.author}</p> {/* Curator Name */}
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Complete to earn:</span>
                    <span className="font-bold text-green-600">+{gig.xpValue || 0} XP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
    </main>
  );
}