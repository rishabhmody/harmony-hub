"use client";

import Image from "next/image";
import Link from "next/link";

interface ExploreItem {
  title: string;
  subtitle: string;
  img: string;
  className: string;
  href: string;
}

const exploreItems: ExploreItem[] = [
  {
    title: "explore",
    subtitle: "books",
    img: "/books_snoop.jpg",
    className: "col-span-1 row-span-1",
    href: "/explore-books",
  },
  {
    title: "join",
    subtitle: "challenges",
    img: "/challenges_snoop.jpg",
    className: "col-span-2 row-span-1",
    href: "/join-challenges",
  },
  {
    title: "discover",
    subtitle: "community",
    img: "/discover-community.png",
    className: "col-span-2 row-span-1",
    href: "/discover-community",
  },
  {
    title: "earn",
    subtitle: "xp",
    img: "/rewards_snoop.jpg",
    className: "col-span-1 row-span-1",
    href: "/earn-xp",
  },
];

export default function ExplorePage() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center py-12 px-4">
      <h1 className="text-white text-3xl font-light mb-10">
        how <span className="text-yellow-300 font-semibold">levelupReads</span> works
      </h1>

      {/* GRID WITH SPANS */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-4xl auto-rows-[220px]">
        {exploreItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`relative rounded-3xl overflow-hidden group cursor-pointer transform transition-all duration-300
              hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98] ${item.className}`}
          >
            <Image
              src={item.img}
              alt={item.subtitle}
              fill
              className="object-cover opacity-90 transition duration-300 group-hover:opacity-100 group-hover:brightness-110"
            />

            {/* Overlay text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
              <p className="text-white text-3xl font-semibold drop-shadow-md">
                {item.title}
              </p>
              <p className="text-white text-2xl drop-shadow-md">
                {item.subtitle}
              </p>
            </div>

            {/* Tint */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
