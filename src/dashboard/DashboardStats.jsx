import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchMembers } from "./dashbaordComponents/membersHandlers.js/fetchMembers";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    expired: 0,
    expiringSoon: 0,
  });

  const [active, setActive] = useState([]);

  useEffect(() => {
    fetchMembers(setActive);
  }, []);

  // console.log(active.length);

  const calculateStats = (data) => {
    const now = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(now.getDate() + 3);

    let active = 0;
    let expired = 0;
    let expiringSoon = 0;

    data.forEach((member) => {
      const expirationDate = new Date(member.expirationDate);

      if (expirationDate < now) {
        expired++;
      } else {
        active++;
        if (expirationDate <= threeDaysFromNow) {
          expiringSoon++;
        }
      }
    });

    setStats({
      total: data.length,
      active,
      expired,
      expiringSoon,
    });
  };

  const StatCard = ({ title, count, color, link, icon }) => (
    <Link
      to={link}
      className="block transform transition-transform hover:scale-105"
    >
      <div
        className={`bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 ${color} flex items-center justify-between`}
      >
        <div>
          <h2 className="text-gray-500 font-semibold uppercase tracking-wide text-xs md:text-sm">
            {title}
          </h2>
          <p className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">
            {count}
          </p>
        </div>
        <div
          className={`p-2 md:p-3 rounded-full ${color
            .replace("border-", "bg-")
            .replace("500", "100")} text-xl md:text-2xl`}
        >
          {icon}
        </div>
      </div>
    </Link>
  );

  const pieData = [
    { name: "Active", value: active.length, color: "#10B981" }, // Green
    { name: "Expiring Soon", value: active.length, color: "#F59E0B" }, // Yellow
    { name: "Expired", value: active.length, color: "#EF4444" }, // Red
  ];

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 md:mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <StatCard
          title="Active Members"
          count={active.length}
          color="border-green-500"
          link="/dashboard/active-members"
          icon={
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-green-500"
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
          }
        />
        <StatCard
          title="Expiring Soon"
          count={active.length}
          color="border-yellow-500"
          link="/dashboard/expiring-soon"
          icon={
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-yellow-500"
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
          }
        />
        <StatCard
          title="Expired Members"
          count={active.length}
          color="border-red-500"
          link="/dashboard/expired-members"
          icon={
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </div>

      {/* Charts Section */}
      <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            Membership Status Distribution
          </h2>
          <div className="h-64 md:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
