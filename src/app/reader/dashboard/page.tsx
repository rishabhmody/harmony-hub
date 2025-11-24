import { redirect } from "next/navigation";
import Image from "next/image";
import Header from "@/app/header/page";
import Footer from "@/app/footer/page"
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
    <main className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      {/* WELCOME HERO */}
      <section className="px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between bg-gray-800 border-b border-gray-700">
        <div>
          <h1 className="text-4xl font-mono mb-2">Artist Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Hey <span className="font-semibold">{userData.name}</span>! Ready to hit the stage?
          </p>
        </div>
        <Image
          src="/guitar_icon.png" 
          alt="Guitar"
          width={100}
          height={100}
          className="object-contain mt-6 md:mt-0"
        />
      </section>

      {/* DYNAMIC STATS */}
      <section className="px-6 md:px-16 mt-10">
        <h2 className="text-2xl font-mono mb-6 border-l-4 border-blue-500 pl-3">Career Stats</h2>
        <div className="flex gap-10 md:gap-20 text-center bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-sm max-w-2xl">
          <div>
            <h3 className="text-4xl font-semibold">{userData.gigsPlayed || 0}</h3>
            <p className="text-gray-400 mt-1 text-sm uppercase tracking-wide">Gigs Played</p>
          </div>
          <div>
            <h3 className="text-4xl font-semibold">{userData.xp || 0}</h3>
            <p className="text-gray-400 mt-1 text-sm uppercase tracking-wide">Artist XP</p>
          </div>
        </div>
      </section>

      {/* XP LEVEL BAR */}
      <section className="px-6 md:px-16 mt-10">
        <div className="flex justify-between items-end mb-2 max-w-3xl">
            <h2 className="text-xl font-mono">Current Reputation Level</h2>
            <span className="font-bold font-mono">Lvl {Math.floor(userData.xp / 100) + 1}</span>
        </div>
        <div className="w-full h-4 bg-gray-700 rounded-full max-w-3xl overflow-hidden">
          <div
            className="h-4 bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((userData.xp % 100), 100)}%` }} 
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">Earn XP by learning chords or playing venues.</p>
      </section>

      {/* PREVIOUS VENUES (Repurposed Book List) */}
      <section className="px-6 md:px-16 mt-14 mb-16">
        <h2 className="text-3xl font-mono mb-8">Available Gigs</h2>
        {allGigs.length === 0 ? (
           <div className="text-center py-20 border-2 border-dashed border-gray-700 rounded-2xl">
              <p className="text-gray-500 italic">No gigs available at the moment. Check back soon!</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGigs.map((gig: any) => (
              <div key={gig._id.toString()} className="border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/50 transition bg-gray-800 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {gig.title?.charAt(0) || 'G'}
                    </div>
                    <span className="text-xs bg-gray-700 px-3 py-1 rounded-full">{gig.genre || "Live Music"}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-1">{gig.title}</h3> {/* Venue Name */}
                <p className="text-gray-400 text-sm mb-4">Hosted by: {gig.author}</p> {/* Curator Name */}
                
                <div className="mt-auto pt-4 border-t border-gray-700 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Complete to earn:</span>
                    <span className="font-bold text-green-500">+{gig.xpValue || 0} XP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}