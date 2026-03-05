import React, { useState } from "react";
import ShowFeedbacks from "./ShowFeedbacks";
import axios from "axios";
import toast from "react-hot-toast";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/v1/feedback/give-feedback", { rating, feedback });
      toast.success("Feedback submitted successfully");
      setRating(0);
      setFeedback("");
      setRefresh(!refresh);
      setHover(0);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error submitting feedback";
      toast.error(errorMessage);
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen md:w-[95rem] overflow-hidden pt-24 pb-10">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 text-white">
              <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
              YOUR OPINION MATTERS
            </div>
          </div>

          <h1
            className="text-5xl md:text-7xl font-black mb-6 text-white overflow-hidden"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block">Share Your</span>
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>

          <p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Help us improve by sharing your valuable feedback and rating your
            experience at Pandey Gym
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Feedback Form */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-2xl -z-10"></div>

            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden hover:border-white/40 transition-all duration-500 p-8 md:p-10">
              {/* Gradient Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Rate Us</h2>
                  <p className="text-gray-400 text-sm">
                    Tell us what you think
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Rating Section */}
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-4">
                    Rate Your Experience
                  </label>
                  <div className="flex justify-center gap-3">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <button
                          type="button"
                          key={ratingValue}
                          className={`text-5xl focus:outline-none transition-all duration-200 transform ${
                            ratingValue <= (hover || rating)
                              ? "text-yellow-400 scale-110"
                              : "text-gray-400 hover:text-yellow-300 scale-100"
                          }`}
                          onClick={() => setRating(ratingValue)}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          ★
                        </button>
                      );
                    })}
                  </div>
                  {rating > 0 && (
                    <p className="text-center text-orange-400 font-semibold mt-3 animate-fade-in">
                      {rating === 5 && "Excellent! 🎉"}
                      {rating === 4 && "Great! 👍"}
                      {rating === 3 && "Good 😊"}
                      {rating === 2 && "Fair 🤔"}
                      {rating === 1 && "Poor 😞"}
                    </p>
                  )}
                </div>

                {/* Feedback Textarea */}
                <div
                  className="group animate-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-3">
                    Your Feedback
                  </label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows="4"
                    className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white/10 placeholder-gray-400 transition-all duration-300 resize-none"
                    placeholder="Share your experience with us. What did you like? What can we improve?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || rating === 0}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform flex items-center justify-center gap-2 animate-fade-in ${
                    loading || rating === 0
                      ? "bg-gray-600/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:-translate-y-1 shadow-lg shadow-orange-600/50 hover:shadow-orange-500/60 text-white"
                  }`}
                  style={{ animationDelay: "0.6s" }}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
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
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Submit Feedback
                    </>
                  )}
                </button>
              </form>

              {/* Helper Text */}
              <p
                className="text-xs text-gray-500 text-center mt-6 animate-fade-in"
                style={{ animationDelay: "0.7s" }}
              >
                ✓ Your feedback helps us improve | ✓ Takes less than 2 minutes
              </p>
            </div>
          </div>

          {/* Right - Reviews Display */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden p-8 md:p-10">
              {/* Gradient Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500"></div>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Reviews</h2>
                  <p className="text-gray-400 text-sm">From our members</p>
                </div>
              </div>

              <ShowFeedbacks refresh={refresh} />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-white font-bold mb-2">Direct Impact</h3>
            <p className="text-gray-400 text-sm">
              Your feedback directly influences our improvements
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-white font-bold mb-2">Recognition</h3>
            <p className="text-gray-400 text-sm">
              Top reviewers get featured in our community
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-3">🎁</div>
            <h3 className="text-white font-bold mb-2">Rewards</h3>
            <p className="text-gray-400 text-sm">
              Earn points for every review submitted
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

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
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
};

export default Feedback;
