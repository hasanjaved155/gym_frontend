import { Link } from "react-router-dom";
import pandeyLogo from "./logo/pandey_gym.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-primary">Pandey Gym</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Start your fitness transformation with our state-of-the-art
              equipment and expert guidance. Get fit, stay healthy, feel
              amazing!
            </p>

            {/* Owner & Location */}
            <div className="bg-slate-800 rounded-lg p-6 mb-8">
              <p className="text-lg mb-2">
                <span className="font-semibold text-primary">Owner:</span>{" "}
                Arvind Pandey
              </p>
              <p className="text-lg">
                <span className="font-semibold text-primary">Location:</span>{" "}
                Lakhimpur Kheri, Nighasan Road
              </p>
            </div>

            {/* Timing */}
            <div className="bg-slate-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                ⏰ Timing
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Morning:</span> 5:00 AM -
                  10:00 AM
                </p>
                <p>
                  <span className="font-semibold">Evening:</span> 4:00 PM -
                  10:00 PM
                </p>
                <p className="text-sm text-slate-400">Monday to Sunday</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 sm:bg-primary sm:text-white md:bg-primary md:text-white lg:bg-primary lg:text-white xl:bg-primary xl:text-white">
                <Link to="/register">Join Now</Link>
              </button>
              <button className="bg-black text-white hover:bg-slate-800 px-8 py-3 rounded-lg font-semibold transition sm:border-2 sm:border-primary sm:text-primary sm:bg-transparent md:border-2 md:border-primary md:text-primary md:bg-transparent lg:border-2 lg:border-primary lg:text-primary lg:bg-transparent xl:border-2 xl:border-primary xl:text-primary xl:bg-transparent">
                <Link to="/Contact">Contact Us</Link>
              </button>
            </div>
          </div>

          {/* Logo Section */}
          <div className="flex items-center justify-center">
            <img
              src={pandeyLogo}
              alt="Pandey Gym Logo"
              className="w-full max-w-md h-auto object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-1 gap-8 mt-20 text-center max-w-xs mx-auto">
          <div>
            <h3 className="text-3xl text-primary font-bold">50+</h3>
            <p className="text-slate-300">Active Members</p>
          </div>
        </div>
      </div>
    </section>
  );
}
