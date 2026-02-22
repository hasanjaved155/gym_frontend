import axios from "axios";
import React, { useState } from "react";
import TimeAgo from "./timeago/TimeAgo";
import { useAuth } from "../contextApi/AuthContext";
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
    <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Recent Ratings</h3>
        <span className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
          {feedbacks.length} Reviews
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar"
        style={{ maxHeight: "400px" }}
      >
        {feedbacks.length > 0 ? (
          feedbacks.map((item, index) =>
            editingId === item._id ? (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border-2 border-indigo-500 shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-indigo-600 text-sm">
                      Editing Review
                    </span>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <button
                        type="button"
                        key={ratingValue}
                        className={`text-xl focus:outline-none transition-colors duration-200 ${
                          ratingValue <= (editHover || editRating)
                            ? "text-yellow-400"
                            : "text-gray-300"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm text-gray-700 mb-3 resize-none"
                  rows="3"
                  value={editFeedback}
                  onChange={(e) => setEditFeedback(e.target.value)}
                  placeholder="Update your feedback..."
                ></textarea>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateFeedback(item._id)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="group relative bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm">
                      {item?.user?.avatar ? (
                        <img
                          src={item.user.avatar}
                          alt="User Avatar"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg">U</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {item?.user?.username || "User"}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {TimeAgo(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Edit & Delete Buttons */}
                  {user?._id === item?.user?._id && (
                    <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
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
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
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

                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < item.rating ? "text-yellow-400" : "text-gray-200"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item?.feedback}
                </p>
              </div>
            ),
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2 opacity-50"
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
            <p>No reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowFeedbacks;
