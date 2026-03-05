import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchMembers } from "./membersHandlers.js/fetchMembers";
import { toast } from "react-hot-toast";

const ExpiredMembers = () => {
  const [members, setMembers] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchExpiredMembers = () => {
    fetchMembers((data) => {
      const now = new Date();
      const expired = data.filter((member) => {
        const expirationDate = new Date(member.expirationDate);
        const isExpired =
          new Date(now.toDateString()) >=
          new Date(expirationDate.toDateString());
        return member.active === false || isExpired;
      });
      setMembers(expired);
    });
  };

  useEffect(() => {
    fetchExpiredMembers();
  }, []);

  const handleReactivate = async (memberId) => {
    setUpdatingId(memberId);
    try {
      const today = new Date().toISOString().split("T")[0];
      await axios.patch(`/api/v1/users/update-account/${memberId}`, {
        active: true,
        joinDate: today, // This will also update the expiration date on the backend
      });
      toast.success("Member reactivated successfully!");
      // Refresh the list by filtering out the reactivated member
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== memberId),
      );
    } catch (error) {
      toast.error("Failed to reactivate member.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Expired Members</h1>
        <Link
          to="/dashboard"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          <span className="mr-2">&larr;</span> Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Mobile View (Cards) */}
        <div className="md:hidden">
          {members.length > 0 ? (
            members.map((member) => (
              <div
                key={member._id || member.id}
                className="p-4 border-b border-gray-200 border-l-4 border-red-500"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{member.username}</h3>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    Expired
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {member.email}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Joined:</span>{" "}
                  {new Date(member.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Expires:</span>{" "}
                  {new Date(member.expirationDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleReactivate(member._id)}
                    disabled={updatingId === member._id}
                    className="px-4 py-2 bg-green-600 text-black text-sm font-medium rounded-lg hover:bg-green-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updatingId === member._id ? "Activating..." : "Set Active"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No expired members found.
            </div>
          )}
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-red-50 text-red-800 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Expiration Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.length > 0 ? (
                members.map((member) => (
                  <tr
                    key={member._id || member.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {member.username}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{member.email}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(member.joinDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(member.expirationDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Expired
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleReactivate(member._id)}
                        disabled={updatingId === member._id}
                        className="px-3 py-1.5 bg-green-600 text-black text-xs font-semibold rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updatingId === member._id
                          ? "Activating..."
                          : "Set Active"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No expired members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpiredMembers;
