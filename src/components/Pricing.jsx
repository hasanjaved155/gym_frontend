import { Link } from "react-router-dom";
import plans from "../assets/data/pricingData";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative md:w-[95rem] py-24 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6 animate-fade-in">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 text-white">
              <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
              FLEXIBLE PLANS
            </div>
          </div>

          <h2
            className="text-5xl md:text-7xl font-black mb-6 animate-fade-in text-white overflow-hidden"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block">Choose Your</span>
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>

          <p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Simple, transparent pricing. Start your transformation today with a
            plan tailored to your goals.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative group animate-fade-in ${plan.popular ? "lg:col-span-1 md:col-span-2 md:row-span-1" : ""}`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                  plan.popular
                    ? "bg-gradient-to-r from-red-600 to-orange-600"
                    : "bg-gradient-to-r from-orange-600/50 to-yellow-600/50"
                }`}
              ></div>

              {/* Card */}
              <div
                className={`relative flex flex-col p-8 md:p-10 rounded-3xl transition-all duration-300 h-full backdrop-blur-xl border ${
                  plan.popular
                    ? "bg-gradient-to-br from-red-600/80 to-orange-600/80 border-red-400/50 shadow-2xl shadow-red-600/30 scale-100 md:scale-105 z-20"
                    : "bg-white/10 border-white/20 shadow-xl hover:shadow-2xl hover:border-white/40 hover:-translate-y-2"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full text-sm font-black shadow-lg uppercase tracking-wider">
                      🔥 Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3
                    className={`text-3xl font-black mb-3 ${
                      plan.popular ? "text-white" : "text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm font-semibold uppercase tracking-widest ${
                      plan.popular ? "text-yellow-200" : "text-gray-400"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex justify-center items-baseline gap-2">
                    <span
                      className={`text-6xl font-black ${plan.popular ? "text-white" : "text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text"}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-xl font-semibold ${
                        plan.popular ? "text-yellow-200" : "text-gray-400"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  {!plan.popular && (
                    <p className="text-gray-400 text-sm mt-2">
                      Get started today
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-3 animate-slide-in-left ${plan.popular ? "" : ""}`}
                      style={{ animationDelay: `${0.4 + idx * 0.05}s` }}
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          plan.popular
                            ? "bg-white/20 text-white"
                            : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          plan.popular ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link to="/contact" className="block mt-auto">
                  <button
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group/btn relative ${
                      plan.popular
                        ? "bg-gradient-to-r from-white to-yellow-100 text-black shadow-xl hover:shadow-2xl hover:-translate-y-1 transform active:scale-95"
                        : "bg-gradient-to-r from-red-600/80 to-orange-600/80 border-2 border-white/30 text-white hover:from-red-600 hover:to-orange-600 hover:border-white/50 hover:shadow-orange-500/50 shadow-lg"
                    }`}
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      Get Started
                      <svg
                        className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
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
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-20 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <p className="text-gray-400 mb-6 text-lg">
            Not sure which plan is right for you?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300"
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact our team for a custom quote
          </Link>
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
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
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
