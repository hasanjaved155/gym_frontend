import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pandeyLogo from "./logo/pandey_gym.png";
import GymHomLogo from "../lottie/GymHomLogo";

const ImageCarousel = ({ slides, isMobileOnly = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const carouselClass = isMobileOnly ? "md:hidden" : "hidden md:block";

  return (
    <div
      className={`relative w-full h-[350px] overflow-hidden rounded-xl shadow-lg border border-gray-300 dark:border-slate-600 group bg-white dark:bg-slate-800 ${carouselClass}`}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full ${
              index === 0
                ? "object-contain p-4 bg-gray-100 dark:bg-slate-700"
                : "object-cover"
            }`}
          />
        </div>
      ))}

      {/* Manual Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 text-gray-800 dark:text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10 shadow-md"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 text-gray-800 dark:text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10 shadow-md"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentSlide
                ? "bg-orange-500 dark:bg-orange-400"
                : "bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 dark:hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Hero() {
  const slides = [
    pandeyLogo,
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  ];

  return (
    <section
      id="home"
      className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-900 dark:text-white py-12 md:py-24 transition-colors duration-300"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Carousel - Only visible on mobile */}
        <div className="md:hidden mb-8 ">
          <GymHomLogo isMobileOnly={true} />
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="w-full">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="text-orange-500 dark:text-orange-400">
                Pandey Gym
              </span>
            </h2>
            <p className="text-gray-700 dark:text-slate-300 text-lg mb-8">
              Start your fitness transformation with our state-of-the-art
              equipment and expert guidance. Get fit, stay healthy, feel
              amazing!
            </p>

            {/* Owner & Location */}
            <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-slate-700">
              <p className="text-lg mb-2 text-gray-800 dark:text-white">
                <span className="font-semibold text-orange-500 dark:text-orange-400">
                  Owner:
                </span>{" "}
                Arvind Pandey
              </p>
              <p className="text-lg text-gray-800 dark:text-white">
                <span className="font-semibold text-orange-500 dark:text-orange-400">
                  Location:
                </span>{" "}
                Lakhimpur Kheri, Nighasan Road
              </p>
            </div>

            {/* Timing */}
            <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold mb-4 text-orange-500 dark:text-orange-400">
                ⏰ Timing
              </h3>
              <div className="space-y-2 text-gray-800 dark:text-white">
                <p>
                  <span className="font-semibold">Morning:</span> 5:00 AM -
                  10:00 AM
                </p>
                <p>
                  <span className="font-semibold">Evening:</span> 4:00 PM -
                  10:00 PM
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Monday to Sunday
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-md"
              >
                Join Now
              </Link>
              <Link
                to="/Contact"
                className="bg-white dark:bg-slate-700 text-orange-500 dark:text-orange-400 border-2 border-orange-500 dark:border-orange-400 hover:bg-orange-50 dark:hover:bg-slate-600 px-8 py-3 rounded-lg font-semibold transition shadow-md"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Side Carousel - Visible on desktop */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* <ImageCarousel slides={slides} isMobileOnly={false} /> */}
              <GymHomLogo isMobileOnly={false} />
            </div>
          </div>
        </div>

        {/* Second Carousel - Visible on desktop below */}
        <div className="hidden md:block mt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Facilities
          </h3>
          <ImageCarousel slides={slides} isMobileOnly={false} />
        </div>
        <div className="md:hidden mb-8 mt-12">
          <ImageCarousel slides={slides} isMobileOnly={true} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 text-center">
          <div>
            <h3 className="text-3xl md:text-4xl text-orange-500 dark:text-orange-400 font-bold">
              50+
            </h3>
            <p className="text-gray-700 dark:text-slate-300 mt-2">
              Active Members
            </p>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl text-orange-500 dark:text-orange-400 font-bold">
              24/7
            </h3>
            <p className="text-gray-700 dark:text-slate-300 mt-2">
              Support Available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
