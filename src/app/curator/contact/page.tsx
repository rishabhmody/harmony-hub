import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="w-full flex flex-col items-center pt-16 bg-gray-900 text-white">

      {/* Heading */}
      <h1 className="text-3xl font-light tracking-wide mb-14">
        stay connected!
      </h1>

      {/* Form */}
      <div className="flex w-full max-w-5xl justify-center items-start mb-16">

        {/* Email box */}
        <div className="w-full text-center">
            <div className="border border-gray-700 rounded-xl px-6 py-8 w-[360px] shadow-sm w-full text-center bg-gray-800">
          <p className="text-sm text-gray-400 mb-6 leading-relaxed w-full text-center">
            Stay updated on local gigs, collaborations, and artist spotlights.
          </p>

          <div className="flex items-center justify-between border-b border-gray-700 pb-2 text-sm">
            <input
              type="email"
              placeholder="your email address"
              className="outline-none flex-1 bg-transparent"
            />
            <span className="text-blue-500">→</span>
        </div>
        
          </div>
        </div>
      </div>

      {/* Baseline + Text */}
      <div className="w-full max-w-5xl relative">

        {/* Baseline */}
        <div className="w-full h-[2px] bg-gray-700"></div>

        {/* Text ABOVE the line */}
        <div className="absolute right-0 -top-14 flex items-center gap-3">
             {/* Happy creating */}
            <p className="text-3xl font-light italic tracking-wide font-[Caveat] text-gray-400 w-full text-center">
                 Happy creating :)
              </p>
        </div>
      </div>
    </div>
  );
}
