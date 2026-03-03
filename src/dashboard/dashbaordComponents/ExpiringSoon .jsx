import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchMembers } from "./membersHandlers.js/fetchMembers";
import toast from "react-hot-toast";

const ExpiringSoon = () => {
  const [members, setMembers] = useState([]);
  const [sending, setSending] = useState(null);

  useEffect(() => {
    fetchMembers((data) => {
      const now = new Date();
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(now.getDate() + 3);

      const expiring = data.filter((member) => {
        const expirationDate = new Date(member.expirationDate);
        const isExpired =
          new Date(now.toDateString()) >=
          new Date(expirationDate.toDateString());
        return (
          member.active !== false &&
          !isExpired &&
          expirationDate <= threeDaysFromNow
        );
      });
      setMembers(expiring);
    });
  }, []);

  // ✅ Send Email Function
  const handleSendEmail = async (user) => {
    try {
      setSending(user._id);

      const response = await axios.post("/api/v1/users/send-expiration-email", {
        userId: user._id,
      });

      // console.log("Email sent:", response.data);
      toast(`✅ Email sent to ${response?.data?.data?.email} successfully!`);
    } catch (error) {
      console.error("Error sending email:", error);
      toast(
        `❌ Failed to send email: ${error.response?.data?.message || error.message}`,
      );
    } finally {
      setSending(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Expiring Soon (With in 3 Days)
        </h1>
        <Link
          to="/dashboard"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          <span className="mr-2">&larr;</span> Back to Dashboard
        </Link>
      </div>

      <div className="md:bg-white md:rounded-xl md:shadow-lg md:overflow-hidden md:border md:border-gray-100">
        {/* Mobile View (Cards) */}
        <div className="md:hidden space-y-4">
          {members.length > 0 ? (
            members.map((member) => (
              <div
                key={member._id || member.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                <div className="h-1.5 w-full bg-yellow-500" />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {member.username}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {member.email}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide bg-yellow-100 text-yellow-800">
                      Expiring
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2.5 rounded-lg">
                      <svg
                        className="w-4 h-4 mr-2.5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium mr-auto">Joined:</span>
                      <span>
                        {new Date(member.joinDate).toLocaleDateString(
                          undefined,
                          { dateStyle: "medium" },
                        )}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 bg-red-50 p-2.5 rounded-lg border border-red-100">
                      <svg
                        className="w-4 h-4 mr-2.5 text-red-500"
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
                      <span className="font-medium mr-auto text-red-800">
                        Expires:
                      </span>
                      <span className="font-bold text-red-700">
                        {new Date(member.expirationDate).toLocaleDateString(
                          undefined,
                          { dateStyle: "medium" },
                        )}
                      </span>
                    </div>
                    <div className="flex justify-end border-t border-gray-100 pt-3">
                      <span
                        onClick={() => handleSendEmail(member)}
                        disabled={sending === member._id}
                        className="px-3 py-2 cursor-pointer  bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium disabled:opacity-50"
                      >
                        {sending === member._id
                          ? "Sending..."
                          : "📧 Send Email"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">All good!</h3>
              <p className="mt-1 text-gray-500">
                No members are expiring in the next 3 days.
              </p>
            </div>
          )}
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-yellow-50 text-yellow-800 uppercase tracking-wider font-semibold">
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
                      {new Date(member.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(member.expirationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Expiring Soon
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2 flex">
                      {/* WhatsApp Button */}
                      <span
                        onClick={() => handleSendEmail(member)}
                        disabled={sending === member._id}
                        className="px-3 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium disabled:opacity-50"
                      >
                        {sending === member._id
                          ? "Sending..."
                          : "📧 Send Email"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No members expiring soon.
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

export default ExpiringSoon;
