"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/app/curator/header/page";
import Footer from "@/app/footer/page";

export default function VenueDashboard() {
  return (
    <main className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      {/* HEADER */}
      <section className="px-16 py-10 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-mono mb-2">Venue Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Welcome back! Your stage shapes the community.
          </p>
        </div>

        <Image
          src="/Gemini_Generated_Image_4fisvt4fisvt4fis.png"
          alt="Venue Icon"
          width={300}
          height={500}
          className="object-contain"
        />
      </section>

      {/* QUICK STATS */}
      <section className="px-16 mt-4">
        <h2 className="text-3xl font-mono mb-6">Quick Stats!</h2>

        <div className="flex gap-20 text-center">
          <div>
            <h3 className="text-4xl font-semibold">45</h3>
            <p className="text-gray-400 mt-1">Gigs Hosted</p>
          </div>

          <div>
            <h3 className="text-4xl font-semibold">25</h3>
            <p className="text-gray-400 mt-1">Events Created</p>
          </div>

          <div>
            <h3 className="text-4xl font-semibold">5K+</h3>
            <p className="text-gray-400 mt-1">Followers</p>
          </div>
        </div>
      </section>

      {/* RECENT BOOKS */}
      <section className="px-16 mt-14 mb-16">
        <h2 className="text-3xl font-mono mb-10">Recently added events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

  {[
    {
      img: "/pop band.png",
      title: "Rock Night Extravaganza",
      venue: "The Thunder Arena",
      genre: "Pop / Rock",
    },
    {
      img: "/R&B band.png",
      title: "Stand-Up Comedy Special",
      venue: "Laugh Lounge",
      genre: "R&B / Soul",
    },
    {
      img: "/rap band.png",
      title: "EDM Festival Blast",
      venue: "Neon Dome",
      genre: "Rap / Hip-Hop",
    },
  ].map((event, index) => (
    <div
      key={index}
      className="border border-gray-700 p-4 rounded-2xl shadow-lg hover:shadow-blue-500/50 transition bg-gray-800"
    >
      <Image
        src={event.img}
        alt={event.title}
        width={400}
        height={500}
        className="rounded-xl mb-4"
      />

      <h3 className="text-xl font-medium">{event.title}</h3>
      <p className="text-gray-400">{event.venue}</p>
      <p className="text-gray-500 text-sm">{event.genre}</p>

      <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
        View event →
      </button>
    </div>
  ))}

</div>

      </section>
      <Footer />
    </main>
  );
}
