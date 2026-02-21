import axios from "axios";
import React, { useState } from "react";

const ShowFeedbacks = ({ refresh }) => {
  const [feedbacks, setFeedbacks] = useState([{ name: "", rating: 0 }]);

  React.useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("/api/v1/feedback/get-feedbacks");
        console.log(response.data.data);
        const data = response?.data?.data;
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [refresh]);

  return (
    <div>
      {" "}
      <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Ratings</h3>
        <div
          className={`shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg ${"max-h-96 overflow-y-auto"}`}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item?.user?.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">
                    {"★".repeat(item.rating)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowFeedbacks;
