import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchMembers } from "./membersHandlers.js/fetchMembers";
import { toast } from "react-hot-toast";

const ActiveMembers = () => {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    joinDate: "",
    active: true,
  });

  const loadActiveMembers = () => {
    fetchMembers((data) => {
      const now = new Date();
      const activeMembers = data.filter((member) => {
        const expirationDate = new Date(member.expirationDate);
        const isExpired =
          new Date(now.toDateString()) >=
          new Date(expirationDate.toDateString());
        return member.active !== false && !isExpired;
      });
      setMembers(activeMembers);
    });
  };

  useEffect(() => {
    loadActiveMembers();
  }, []);

  const handleEditClick = (member) => {
    setEditingId(member._id);
    setEditFormData({
      joinDate: member.joinDate
        ? new Date(member.joinDate).toISOString().split("T")[0]
        : "",
      active: member.active === true,
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "active") {
      setEditFormData({
        ...editFormData,
        [name]: value === "Active" ? true : false,
      });
    } else {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  const handleSaveClick = async (id) => {
    try {
      const payload = {
        joinDate: editFormData.joinDate,
        active: editFormData.active,
      };

      await axios.patch(`/api/v1/users/update-account/${id}`, payload);
      setEditingId(null);
      loadActiveMembers();
      toast.success("Member updated successfully");
    } catch (error) {
      console.error("Error updating member:", error.message);
      alert("Failed to update member");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Active Members</h1>
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
                <div
                  className={`h-1.5 w-full ${
                    member.active !== false ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <div className="p-5">
                  {editingId === member._id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Status
                        </label>
                        <select
                          name="active"
                          value={editFormData.active ? "Active" : "Inactive"}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Join Date
                        </label>
                        <input
                          type="date"
                          name="joinDate"
                          value={editFormData.joinDate}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                        />
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
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
                        <span className="font-medium mr-2">Expires At:</span>
                        {new Date(member.expirationDate).toLocaleDateString(
                          undefined,
                          {
                            dateStyle: "medium",
                          },
                        )}
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => handleSaveClick(member._id)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">
                            {member.username}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {member.email}
                          </p>
                        </div>
                        <span
                          className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${
                            member.active === false
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {member.active === false ? "Inactive" : "Active"}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
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
                        <span className="font-medium mr-2">Joined:</span>
                        {new Date(member.joinDate).toLocaleDateString(
                          undefined,
                          {
                            dateStyle: "medium",
                          },
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
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
                        <span className="font-medium mr-2">Expires At:</span>
                        {new Date(member.expirationDate).toLocaleDateString(
                          undefined,
                          {
                            dateStyle: "medium",
                          },
                        )}
                      </div>

                      <div className="flex justify-end border-t border-gray-100 pt-3">
                        <button
                          onClick={() => handleEditClick(member)}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit Member
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No active members
              </h3>
              <p className="mt-1 text-gray-500">
                Get started by adding some members.
              </p>
            </div>
          )}
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-green-50 text-green-800 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Expires At</th>
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
                    {editingId === member._id ? (
                      <>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {member.username}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {member.email}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="date"
                            name="joinDate"
                            value={editFormData.joinDate}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-cyan-900 text-sm p-1 border"
                          />
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
                          <select
                            name="active"
                            value={editFormData.active ? "Active" : "Inactive"}
                            onChange={handleChange}
                            className="rounded text-cyan-900 border-gray-300 text-sm p-1 border"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => handleSaveClick(member._id)}
                            className="text-green-600 hover:text-green-900 font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelClick}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {member.username}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {member.email}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(member.joinDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
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
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              member.active === false
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {member.active === false ? "Inactive" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleEditClick(member)}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No active members found.
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

export default ActiveMembers;
