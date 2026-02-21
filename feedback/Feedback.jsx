import React, { useState } from "react";
import { useAuth } from "../src/contextApi/AuthContext";
import ShowFeedbacks from "./ShowFeedbacks";
import axios from "axios";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/feedback/give-feedback", { rating, feedback });
      alert("Feedback submitted successfully");
      setRating(0);
      setFeedback("");
      setRefresh(!refresh);
      setHover(0);
    } catch (e) {
      console.log(e);
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Feedback & Reviews
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We would love to hear your thoughts!
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate your experience
              </label>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <button
                      type="button"
                      key={ratingValue}
                      className={`text-3xl focus:outline-none transition-colors duration-200 ${
                        ratingValue <= (hover || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
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
            </div>

            <div>
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows="4"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Share your experience with us..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>

        <ShowFeedbacks refresh={refresh} />
      </div>
    </div>
  );
};

export default Feedback;
