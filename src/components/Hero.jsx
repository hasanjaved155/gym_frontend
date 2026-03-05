import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pandeyLogo from "./logo/pandey_gym.png";
import GymHomLogo from "../lottie/GymHomLogo";

const ImageCarousel = ({ slides, isMobileOnly = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
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
      className={`relative w-full h-[400px] overflow-hidden rounded-2xl shadow-2xl border border-white/10 group bg-black dark:bg-slate-950 ${carouselClass} animate-fade-in`}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full ${
              index === 0 ? "object-contain p-4 bg-gray-900" : "object-cover"
            }`}
          />
          {index !== 0 && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10 shadow-lg border border-white/20"
      >
        <svg
          className="w-6 h-6"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10 shadow-lg border border-white/20"
      >
        <svg
          className="w-6 h-6"
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
      </button> */}

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-500 rounded-full ${
              idx === currentSlide
                ? "bg-white w-8 h-2"
                : "bg-white/30 hover:bg-white/50 w-2 h-2"
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
    <section className="bg-black md:w-[95rem] text-white py-12 md:py-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile Logo */}
        <div className="md:hidden mb-8 animate-fade-in">
          <GymHomLogo isMobileOnly={true} />
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="w-full">
            {/* Animated Badge */}
            <div
              className="inline-block mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                TRANSFORM YOUR BODY TODAY
              </div>
            </div>

            {/* Main Heading */}
            <h1
              className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-fade-in overflow-hidden"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="block text-white">Build the</span>
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-text-slide">
                Body of Your Dreams
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="text-gray-400 text-lg md:text-xl mb-10 animate-fade-in max-w-xl leading-relaxed"
              style={{ animationDelay: "0.3s" }}
            >
              Join elite trainer{" "}
              <span className="text-white font-semibold">Arvind Pandey</span> in
              a series of transformative fitness challenges designed to unlock
              your potential.
            </p>

            {/* Owner & Location Card */}
            <div
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/10 animate-fade-in hover:bg-white/10 transition-all duration-500 hover:border-orange-500/50 group"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="space-y-4">
                <div
                  className="flex items-center gap-3 animate-slide-in-left"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Owner</p>
                    <p className="text-white text-lg font-semibold">
                      Arvind Pandey
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-3 animate-slide-in-left"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-yellow-600 flex items-center justify-center">
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white text-lg font-semibold">
                      Lakhimpur Kheri, Nighasan Road
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timing Card */}
            <div
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-10 border border-white/10 animate-fade-in hover:bg-white/10 transition-all duration-500 hover:border-yellow-500/50"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl animate-bounce">⏰</div>
                <h3 className="text-2xl font-bold text-white">
                  Hours of Operation
                </h3>
              </div>
              <div className="space-y-3">
                <div
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all animate-slide-in-left"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold">Morning</span>
                  </div>
                  <span className="text-gray-400">5:00 AM - 10:00 AM</span>
                </div>
                <div
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all animate-slide-in-left"
                  style={{ animationDelay: "0.7s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold">Evening</span>
                  </div>
                  <span className="text-gray-400">4:00 PM - 10:00 PM</span>
                </div>
                <p className="text-gray-500 text-sm pt-3 border-t border-white/10 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-white/50 rounded-full animate-spin"></span>
                  Open Monday to Sunday
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 animate-slide-in-left"
              style={{ animationDelay: "0.8s" }}
            >
              <Link
                to="/register"
                className="group relative px-8 py-4 rounded-xl font-bold text-lg overflow-hidden transition-all transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 group-hover:from-red-700 group-hover:to-orange-700 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <span className="relative text-white flex items-center justify-center gap-2">
                  Start Your Transformation
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                to="/Contact"
                className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get in Touch
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side - Carousel */}
          <Link to="/">
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full">
                <GymHomLogo isMobileOnly={false} />
              </div>
            </div>
          </Link>
        </div>

        {/* Facilities Section */}
        <div className="mt-20 border-t border-white/10 pt-20">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 animate-fade-in">
            Check Out Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Facilities
            </span>
          </h2>
          <div className="hidden md:block">
            <ImageCarousel slides={slides} isMobileOnly={false} />
          </div>
          <div className="md:hidden">
            <ImageCarousel slides={slides} isMobileOnly={true} />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-10 rounded-2xl border border-white/10 animate-fade-in hover:from-white/15 hover:to-white/10 transition-all duration-500 group"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Active Members</p>
                <h3 className="text-6xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  50+
                </h3>
              </div>
              <div className="text-5xl group-hover:animate-bounce">💪</div>
            </div>
            <p className="text-gray-500 text-sm">
              Growing community of fitness enthusiasts
            </p>
          </div>

          <div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-10 rounded-2xl border border-white/10 animate-fade-in hover:from-white/15 hover:to-white/10 transition-all duration-500 group"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Support Available</p>
                <h3 className="text-6xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  24/7
                </h3>
              </div>
              <div className="text-5xl group-hover:animate-bounce">🚀</div>
            </div>
            <p className="text-gray-500 text-sm">
              Always here to help you reach your goals
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes textSlide {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-text-slide {
          animation: textSlide 1s ease-out;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
