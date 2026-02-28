import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ActiveMembers = () => {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    joinDate: "",
    status: "Active",
  });

  const fetchMembers = async () => {
    try {
      const response = await axios.get("/api/v1/users/all-users");
      setMembers(response?.data?.data?.users);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEditClick = (member) => {
    setEditingId(member._id);
    setEditFormData({
      joinDate: member.joinDate
        ? new Date(member.joinDate).toISOString().split("T")[0]
        : "",
      status: member.status || "Active",
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async (id) => {
    try {
      await axios.patch(`/api/v1/users/update-user/${id}`, editFormData);
      setEditingId(null);
      fetchMembers();
    } catch (error) {
      console.error("Error updating member:", error);
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

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Mobile View (Cards) */}
        <div className="md:hidden">
          {members.length > 0 ? (
            members.map((member) => (
              <div
                key={member._id || member.id}
                className="p-4 border-b border-gray-200 border-l-4 border-green-500"
              >
                {editingId === member._id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        name="status"
                        value={editFormData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Join Date
                      </label>
                      <input
                        type="date"
                        name="joinDate"
                        value={editFormData.joinDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleSaveClick(member._id)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">
                        {member.username}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${member.status === "Inactive" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                      >
                        {member.status || "Active"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Email:</span> {member.email}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Joined:</span>{" "}
                      {new Date(
                        member.joinDate || member.joinedDate,
                      ).toLocaleDateString()}
                    </p>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => handleEditClick(member)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No active members found.
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
                {/* <th className="px-6 py-4">Expiration Date</th> */}
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
                            className="rounded border-gray-300 text-sm p-1 border"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            name="status"
                            value={editFormData.status}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-sm p-1 border"
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
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === "Inactive" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                          >
                            {member.status || "Active"}
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
