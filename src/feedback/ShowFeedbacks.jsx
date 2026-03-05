import axios from "axios";
import React, { useState } from "react";
import TimeAgo from "./timeago/TimeAgo";
import { useAuth } from "../contextApi/useAuth";
import toast from "react-hot-toast";

const ShowFeedbacks = ({ refresh }) => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editFeedback, setEditFeedback] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [editHover, setEditHover] = useState(0);

  React.useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("/api/v1/feedback/get-feedbacks");
        console.log(response.data.data);
        const data = response?.data?.data;
        if (data) {
          setFeedbacks(data);
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `/api/v1/feedback/delete-feedback/${id}`,
      );
      setFeedbacks(feedbacks.filter((item) => item._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error(error.response?.data?.message || "Error deleting feedback");
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditFeedback(item.feedback);
    setEditRating(item.rating);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFeedback("");
    setEditRating(0);
    setEditHover(0);
  };

  const handleUpdateFeedback = async (id) => {
    try {
      const response = await axios.patch(
        `/api/v1/feedback/update-feedback/${id}`,
        { feedback: editFeedback, rating: editRating },
      );

      setFeedbacks((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, feedback: editFeedback, rating: editRating }
            : item,
        ),
      );
      toast.success(response.data?.message || "Feedback updated successfully");
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating feedback:", error);
      toast.error(error.response?.data?.message || "Error updating feedback");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Recent Reviews</h3>
        <span className="px-3 py-1 text-xs font-medium text-orange-400 bg-orange-600/20 border border-orange-500/50 rounded-full">
          {feedbacks.length} Reviews
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar"
        style={{ maxHeight: "500px" }}
      >
        {feedbacks.length > 0 ? (
          feedbacks.map((item, index) =>
            editingId === item._id ? (
              <div
                key={index}
                className="bg-white/10 p-5 rounded-2xl border-2 border-orange-500/50 shadow-md transition-all duration-300 backdrop-blur-xl animate-fade-in overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-semibold text-orange-400 text-sm flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Editing Review
                  </span>
                </div>

                {/* Star Rating - Responsive */}
                <div className="flex justify-center gap-1 mb-4 flex-wrap">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <button
                        type="button"
                        key={ratingValue}
                        className={`text-2xl sm:text-3xl focus:outline-none transition-all duration-200 flex-shrink-0 ${
                          ratingValue <= (editHover || editRating)
                            ? "text-yellow-400 scale-110"
                            : "text-gray-400 scale-100"
                        }`}
                        onClick={() => setEditRating(ratingValue)}
                        onMouseEnter={() => setEditHover(ratingValue)}
                        onMouseLeave={() => setEditHover(editRating)}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>

                <textarea
                  className="w-full p-3 border border-white/20 rounded-xl bg-white/5 text-white focus:outline-none focus:border-orange-500 focus:bg-white/10 placeholder-gray-400 text-sm mb-4 resize-none"
                  rows="3"
                  value={editFeedback}
                  onChange={(e) => setEditFeedback(e.target.value)}
                  placeholder="Update your feedback..."
                ></textarea>

                <div className="flex justify-end gap-2 flex-wrap">
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateFeedback(item._id)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg transition-all duration-300 shadow-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="group relative bg-white/10 p-4 sm:p-5 rounded-2xl border border-white/20 shadow-md hover:shadow-lg hover:border-white/40 hover:bg-white/15 transition-all duration-300 backdrop-blur-xl animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex justify-between items-start mb-4 gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0 text-sm sm:text-base">
                      {item?.user?.avatar ? (
                        <img
                          src={item.user.avatar}
                          alt="User Avatar"
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                        />
                      ) : (
                        <span>
                          {item?.user?.username?.charAt(0).toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-xs sm:text-sm truncate">
                        {item?.user?.username || "Anonymous"}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {TimeAgo(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Edit & Delete Buttons */}
                  {user?._id === item?.user?._id && (
                    <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-orange-400 hover:bg-orange-600/20 rounded-lg transition-all duration-300"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-red-400 hover:bg-red-600/20 rounded-lg transition-all duration-300"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Rating Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 ${
                        i < item.rating ? "text-yellow-400" : "text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Feedback Text */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {item?.feedback}
                </p>
              </div>
            ),
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-3 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <p className="font-semibold text-sm">No reviews yet</p>
            <p className="text-xs mt-1">
              Be the first to share your experience!
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ShowFeedbacks;
