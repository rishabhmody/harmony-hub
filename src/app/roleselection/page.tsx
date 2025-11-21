"use client";
import Image from "next/image";
import Link from "next/link";

export default function LoginRolePage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-5xl w-full flex items-center justify-between px-10">

        {/* LEFT IMAGE — same as your login/signup */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/snoopy_left.png"   // ❗ use the SAME image used in your login page
            width={380}
            height={380}
            alt="musician playing instrument"
            className="object-contain"
            priority
          />
        </div>

        {/* RIGHT SIDE TEXT */}
        <div className="flex-1 flex flex-col items-start">

          <h1 className="text-4xl font-light mb-10 tracking-wide w-full text-center">
  log in
</h1>


          {/* Reader Login */}
          <Link
            href="/reader/login"
            className="border border-black rounded-xl py-4 px-6 w-80 mb-5 hover:shadow-[4px_4px_0_#000] w-full text-center"
          >
            <p className="text-xl tracking-wide w-full text-center">log in as an artist</p>
            <p className="text-gray-600 text-sm mt-1 w-full text-center">
              continue your artistic journey
            </p>
          </Link>

          {/* Curator Login */}
          <Link
            href="/curator/login"
            className="border border-black rounded-xl py-4 px-6 w-80 hover:shadow-[4px_4px_0_#000] w-full text-center"
          >
            <p className="text-xl tracking-wide w-full text-center">log in as a venue</p>
            <p className="text-gray-600 text-sm mt-1 w-full text-center">
              manage events, artists & rewards
            </p>
          </Link>

          {/* Sign-up Redirect
          <p className="mt-8 text-gray-600 text-sm">
            don’t have an account?{" "}
            <Link href="/signup" className="underline">
              sign up
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
}
