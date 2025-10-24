"use client";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/main/home");
  return null;
}

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
