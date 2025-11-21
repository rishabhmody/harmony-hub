"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/footer/page"
import Header from "@/app/header/page";

export default function VenueDashboard() {
  return (
    <main className="min-h-screen bg-white font-sans">

      <Header />

      {/* HEADER */}
      <section className="px-16 py-10 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-mono mb-2">Venue Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Welcome back, Venue! Your stage shapes the community.
          </p>
        </div>

        <Image
          src="/snoopy.png"
          alt="Snoopy"
          width={180}
          height={180}
          className="object-contain"
        />
      </section>

      {/* QUICK STATS */}
      <section className="px-16 mt-4">
        <h2 className="text-3xl font-mono mb-6">Quick Stats!</h2>

        <div className="flex gap-20 text-center">
          <div>
            <h3 className="text-4xl font-semibold">45</h3>
            <p className="text-gray-600 mt-1">Gigs Hosted</p>
          </div>

          <div>
            <h3 className="text-4xl font-semibold">25</h3>
            <p className="text-gray-600 mt-1">Events Created</p>
          </div>

          <div>
            <h3 className="text-4xl font-semibold">5K+</h3>
            <p className="text-gray-600 mt-1">Followers</p>
          </div>
        </div>
      </section>

      {/* RECENT BOOKS */}
      <section className="px-16 mt-14 mb-16">
        <h2 className="text-3xl font-mono mb-10">Recently added events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="border p-4 rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <Image
                src="/placeholder_gig.jpg" // Assuming a generic placeholder for now
                alt="Event Poster"
                width={300}
                height={300}
                className="rounded-xl mb-4"
              />

              <h3 className="text-xl font-medium">Local Band Showcase</h3>
              <p className="text-gray-700">The Live Venue</p>
              <p className="text-gray-500 text-sm">Rock / Pop</p>

              <button className="mt-4 w-full py-2 bg-black text-white rounded-full hover:opacity-90">
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
