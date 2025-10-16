"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function IntroPage() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      title: "Welcome to XolveTech 🚀",
      text: "India’s youth-driven innovation hub where learning meets creativity.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581091870622-7e0cdfbb6794?auto=format&fit=crop&w=800&q=80",
      title: "Learn by Building",
      text: "Explore hands-on STEM kits and guided courses for every curious mind.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581093588401-22f63612e6c5?auto=format&fit=crop&w=800&q=80",
      title: "Join the Xchange",
      text: "Connect, discuss, and share your projects with other innovators.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1596496058755-1c2f2df543d5?auto=format&fit=crop&w=800&q=80",
      title: "Earn & Grow",
      text: "Complete missions, gain XP, earn badges, and climb the leaderboard!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      title: "Ready to Begin?",
      text: "Start your journey with your personal companion and build your first project!",
    },
  ];

  const router = useRouter();

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else router.push("/onboarding/companion");
  };

  return (
    <div
      className="relative h-screen w-screen text-white flex flex-col justify-between overflow-hidden"
      style={{
        backgroundImage: `url(${slides[current].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Top Caption */}
      <div className="relative z-10 mt-16 px-6 text-center">
        <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl inline-block max-w-xs mx-auto">
          <h1 className="text-3xl font-bold mb-2">{slides[current].title}</h1>
          <p className="text-lg">{slides[current].text}</p>
        </div>
      </div>

      {/* Bottom Section: Dots + CTA */}
      <div className="relative z-10 px-6 mb-10 flex flex-col items-center gap-4">
        {/* Slide Indicators (dots) */}
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === current ? "bg-orange-500 w-6" : "bg-gray-400 w-2"
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={nextSlide}
          className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-xl font-semibold text-lg transition active:scale-95"
        >
          {current === slides.length - 1 ? "Continue" : "Next"}
        </button>
      </div>
    </div>
  );
}
