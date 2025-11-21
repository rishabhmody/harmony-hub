"use client";

import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-20 py-16 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* LEFT SECTION */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/logo.png"
              alt="Harmony Hub"
              className="w-10 h-10"
            />
            <h2 className="text-3xl font-semibold">Harmony Hub</h2>
          </div>

          <p className="text-lg leading-relaxed w-64 mb-6">
            Discover talent, host events, and connect with fellow artists!
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 text-3xl text-black">
            <FaInstagram className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
            <FaFacebook className="cursor-pointer" />
          </div>
        </div>

        {/* EXPLORE SECTION */}
        <div>
          <h3 className="text-3xl font-semibold mb-6">Explore</h3>
          <ul className="text-xl space-y-3">
            <li>explore listings</li>
            <li>creative challenges</li>
            <li>achievements & rewards</li>
            <li>communities</li>
          </ul>
        </div>

        {/* NEED HELP */}
        <div>
          <h3 className="text-3xl font-semibold mb-6">Need Help?</h3>
          <ul className="text-xl space-y-3">
            <li>help center</li>
            <li>contact us</li>
            <li>artist tips</li>
            <li>parent guide</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-3xl font-semibold mb-6">Call us</h3>

          <div className="text-xl space-y-4">
            <p className="flex items-center gap-3">
              <FaLocationDot size={22} /> Mumbai
            </p>

            <p className="flex items-center gap-3">
              <IoCall size={22} /> +91 999 999 99
            </p>

            <p className="flex items-center gap-3">
              <MdEmail size={22} /> harmonyhub@gmail.com
            </p>
          </div>
        </div>
      </div>

      
    </footer>
  );
}
