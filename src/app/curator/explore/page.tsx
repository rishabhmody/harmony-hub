"use client";
import Image from "next/image";
import { useState } from "react";
import Header from "@/app/curator/header/page";
import Footer from "@/app/footer/page";

export default function ExploreArtistsVenuesCurator() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Rock", "Pop", "Jazz", "Electronic", "Hip-Hop"];

  const listings = Array(9).fill({
    title: "Local Jazz Night",
    artist: "Jazzy Rhythms Band",
    genre: "Jazz",
    image: "/Gemini_Generated_Image_4fisvt4fisvt4fis.png", // replace with a suitable placeholder
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      {/* PAGE HEADER */}
      <div className="flex justify-between items-start px-10 mt-10">
        <div>
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-sm text-gray-400">Discover and promote talent for the community.</p>
        </div>

        <Image
          src="/R&B band.png"
          alt="Explore Illustration"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>

      {/* SEARCH BAR */}
      <div className="px-10 mt-6">
        <div className="flex items-center space-x-2 border border-gray-700 px-4 py-2 rounded-full shadow-sm bg-gray-800">
          <span className="text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="Search for artists, venues, genres"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex px-10 space-x-3 mt-5">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-1 rounded-full border text-sm transition ${
              selectedFilter === filter
                ? "bg-blue-500 text-white border-blue-500"
                : "border-gray-700 hover:bg-gray-800"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* LISTING GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 mt-10 pb-20">
        {listings.map((listing, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-blue-500/50 transition bg-gray-800"
          >
            <Image
              src={listing.image}
              alt={listing.title}
              width={200}
              height={260}
              className="w-full rounded-xl"
            />

            <h3 className="mt-4 font-semibold text-lg">{listing.title}</h3>
            <p className="text-sm text-gray-400">{listing.artist}</p>
            <p className="text-xs text-gray-500">{listing.genre}</p>

            <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition">
              View Listing →
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
