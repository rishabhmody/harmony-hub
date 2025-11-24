import Image from "next/image";
import Header from "@/app/reader/header/page";
import Footer from "@/app/footer/page";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white font-sans">

      <section className="px-6 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-Montserrat leading-tight text-left ">
            <span className="text-blue-300">Harmony Hub</span>
          </h1>
          <h2 className="text-5xl md:text-6xl font-mono leading-tight mt-15">
            Where Indie Bands, Artists, and Venues <br />
            <span className="text-blue-500">Connect</span> and{" "}
            <span className="text-blue-500">Collaborate</span>
          </h2>

          {/* Buttons */}
          <div className="flex items-center gap-6 mt-10">
            <a
              href="/signup"
              className="px-10 py-3 bg-blue-500 text-white rounded-full text-lg hover:opacity-80"
            >
              join now
            </a>

            {/* <a
              href="/explore"
              className="px-10 py-3 border border-white rounded-full text-lg hover:bg-white hover:text-black transition"
            >
              explore gigs
            </a> */}
          </div>

          {/* Stats Section */}
          <div className="flex gap-16 mt-16 text-center">
            <div>
              <h3 className="text-2xl font-medium">1.5K+</h3>
              <p className="text-sm opacity-70 mt-1">Bands Signed</p>
            </div>

            <div>
              <h3 className="text-2xl font-medium">1000+</h3>
              <p className="text-sm opacity-70 mt-1">Artists Connected</p>
            </div>

            <div>
              <h3 className="text-2xl font-medium">500+</h3>
              <p className="text-sm opacity-70 mt-1">Venues Registered</p>
            </div>
          </div>
        </div>

        {/* IMAGE RIGHT SIDE */}
        <div className="flex-shrink-0">
          <Image
            src="/band photo.jpg"
            alt="A band performing on stage"
            width={600}
            height={600}
            className="object-contain"
            priority
          />
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Your Stage for Success
        </h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Practice & Perfect</h3>
            <p className="opacity-70">
              Utilize our tools to refine your sound and get feedback from fellow musicians.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Forge Connections</h3>
            <p className="opacity-70">
              Collaborate with artists, producers, and managers to bring your music to life.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get Discovered</h3>
            <p className="opacity-70">
              Showcase your talent to venues and get booked for gigs.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
