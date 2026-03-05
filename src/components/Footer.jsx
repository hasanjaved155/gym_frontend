export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-gray-400 py-16 md:py-20 border-t border-white/10 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div
            className="group animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="inline-block mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏋️</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Pandey Gym
            </h3>

            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                <span className="font-bold text-orange-400">Owner:</span>
                <span className="ml-2 text-gray-300">Arvind Pandey</span>
              </p>
              <p>
                <span className="font-bold text-orange-400">Location:</span>
                <span className="ml-2 text-gray-300">
                  Lakhimpur Kheri, Nighasan Road
                </span>
              </p>
              <p className="text-gray-400 leading-relaxed pt-2">
                Your ultimate destination for fitness and wellness. Transform
                your life with our expert trainers and world-class facilities.
              </p>
            </div>

            {/* Status Badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/50 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-semibold">
                Open Now
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="group animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-300 group/link"
                >
                  <svg
                    className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
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
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-300 group/link"
                >
                  <svg
                    className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
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
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/schedule"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-300 group/link"
                >
                  <svg
                    className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
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
                  Schedule
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-300 group/link"
                >
                  <svg
                    className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
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
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/feedback"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-300 group/link"
                >
                  <svg
                    className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
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
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className="group animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></span>
              Contact Info
            </h4>
            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:+917007734812"
                className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 group/item"
              >
                <div className="p-2 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-lg group-hover/item:from-orange-600/50 group-hover/item:to-red-600/50 transition-all flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Phone</p>
                  <p className="text-sm text-gray-300 font-semibold">
                    +91 7007734812
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:pandeya0760@gmail.com"
                className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 group/item"
              >
                <div className="p-2 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-lg group-hover/item:from-orange-600/50 group-hover/item:to-red-600/50 transition-all flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-orange-400"
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
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Email</p>
                  <p className="text-sm text-gray-300 font-semibold truncate">
                    pandeya0760@gmail.com
                  </p>
                </div>
              </a>

              {/* Hours */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-lg flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Hours</p>
                  <p className="text-sm text-gray-300 font-semibold">
                    5:00 AM - 10:00 PM
                  </p>
                  <p className="text-xs text-gray-500">Monday to Sunday</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-12"></div>

        {/* Bottom Section */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-6 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center sm:text-left">
            &copy; {currentYear}{" "}
            <span className="text-white font-semibold">Pandey Gym</span>. All
            rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6 sm:gap-8 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <div className="w-px h-4 bg-white/10"></div>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <div className="w-px h-4 bg-white/10"></div>
            <a
              href="/contact"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Footer Bottom Badge */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-600 flex items-center justify-center gap-2">
            <span>💪</span>
            <span>Made with passion for fitness • Powered by dedication</span>
            <span>🔥</span>
          </p>
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

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </footer>
  );
}
