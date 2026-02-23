"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Users,
  Calendar,
  Star,
  MessageSquare,
  Clock,
  RefreshCw,
  TrendingUp,
  Award,
  Activity,
} from "lucide-react";

// ─── Main Page ───────────────────────────────────────────────────────────────
const DashboardPage = () => (
  <ProtectedRoute>
    <DashboardContent />
  </ProtectedRoute>
);

// ─── Dashboard Content ────────────────────────────────────────────────────────
const DashboardContent = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoadingStats(true);
      setError("");
      const res = await axios.get("/dashboard-stats", { withCredentials: true });
      if (res.data.success) {
        setStats(res.data.stats);
      } else {
        setError("Failed to fetch dashboard stats");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingStats(false);
    }
  };

  if (loadingStats) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} onRetry={fetchDashboardStats} />;

  // ── Derived analytics ──
  const totalRatings = stats.ratings.reduce((a, r) => a + r.count, 0);
  const avgRating =
    totalRatings > 0
      ? (
          stats.ratings.reduce((a, r) => a + r._id * r.count, 0) / totalRatings
        ).toFixed(1)
      : null;

  // Bar chart data — all 5 stars, show 0 if missing
  const barData = [1, 2, 3, 4, 5].map((star) => {
    const found = stats.ratings.find((r) => r._id === star);
    return { name: `${star}★`, votes: found ? found.count : 0, star };
  });

  // Pie chart data
  const PIE_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#6366f1"];
  const pieData = barData
    .filter((d) => d.votes > 0)
    .map((d, i) => ({
      name: d.name,
      value: d.votes,
      color: PIE_COLORS[d.star - 1],
    }));

  // Satisfaction split
  const positive = stats.ratings
    .filter((r) => r._id >= 4)
    .reduce((a, r) => a + r.count, 0);
  const neutral = stats.ratings
    .filter((r) => r._id === 3)
    .reduce((a, r) => a + r.count, 0);
  const negative = stats.ratings
    .filter((r) => r._id <= 2)
    .reduce((a, r) => a + r.count, 0);

  const satisfactionData = [
    { name: "Positive (4-5★)", value: positive, color: "#22c55e" },
    { name: "Neutral (3★)", value: neutral, color: "#eab308" },
    { name: "Negative (1-2★)", value: negative, color: "#ef4444" },
  ].filter((d) => d.value > 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back,{" "}
              <span className="text-indigo-600">
                {user?.username?.split(" ")[0] || "User"}
              </span>{" "}
              👋
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here's your feedback & analytics overview
            </p>
          </div>
          <button
            onClick={fetchDashboardStats}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Submissions"
            value={stats.totalSubmissions}
            icon={<Users className="w-5 h-5" />}
            color="indigo"
            trend={null}
          />
          <StatCard
            title="Today's Submissions"
            value={stats.todaySubmissions}
            icon={<Calendar className="w-5 h-5" />}
            color="emerald"
            trend={null}
          />
          <StatCard
            title="Average Rating"
            value={avgRating ? `${avgRating} / 5` : "—"}
            icon={<Star className="w-5 h-5" />}
            color="amber"
            trend={null}
          />
          <StatCard
            title="Positive Reviews"
            value={totalRatings > 0 ? `${Math.round((positive / totalRatings) * 100)}%` : "—"}
            icon={<TrendingUp className="w-5 h-5" />}
            color="violet"
            trend={null}
          />
        </div>

        {/* ── Charts Row 1 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart — Rating Distribution */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800">Rating Distribution</h2>
                <p className="text-xs text-slate-400">{totalRatings} total votes</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barSize={36} margin={{ top: 0, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    fontSize: "13px",
                  }}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Bar
                  dataKey="votes"
                  name="Votes"
                  radius={[6, 6, 0, 0]}
                >
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[entry.star - 1]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart — Satisfaction */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800">Satisfaction</h2>
                <p className="text-xs text-slate-400">Sentiment breakdown</p>
              </div>
            </div>
            {satisfactionData.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
                No data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontSize: "13px",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ fontSize: "11px", color: "#64748b" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ── Star Rating Detail Bars ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Star Breakdown</h2>
              <p className="text-xs text-slate-400">Votes per rating</p>
            </div>
          </div>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const found = stats.ratings.find((r) => r._id === star);
              const count = found ? found.count : 0;
              const pct = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
              const colors = {
                5: "bg-indigo-500",
                4: "bg-emerald-500",
                3: "bg-amber-400",
                2: "bg-orange-400",
                1: "bg-red-500",
              };
              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-14 shrink-0">
                    <span className="text-sm font-semibold text-slate-700">{star}</span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${colors[star]}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 w-20 shrink-0 text-right justify-end">
                    <span className="text-xs text-slate-500">{count} votes</span>
                    <span className="text-xs font-semibold text-slate-700 w-10 text-right">
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Recent Submissions Table ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Recent Submissions</h2>
              <p className="text-xs text-slate-400">Latest 10 feedback entries</p>
            </div>
          </div>
          {stats.totalSubmissions === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 text-sm font-medium">No submissions yet</p>
              <p className="text-slate-400 text-xs mt-1">Start collecting feedback to see data here</p>
            </div>
          ) : (
            <RecentSubmissionsTable />
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const colorMap = {
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    icon: "bg-indigo-500 text-white",
    value: "text-indigo-700",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    icon: "bg-emerald-500 text-white",
    value: "text-emerald-700",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    icon: "bg-amber-400 text-white",
    value: "text-amber-700",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-100",
    icon: "bg-violet-500 text-white",
    value: "text-violet-700",
  },
};

const StatCard = ({ title, value, icon, color }) => {
  const c = colorMap[color];
  return (
    <div
      className={`${c.bg} ${c.border} border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${c.icon} w-10 h-10 rounded-xl flex items-center justify-center shadow-sm`}>
          {icon}
        </div>
      </div>
      <div className={`text-2xl sm:text-3xl font-extrabold ${c.value} mb-1`}>{value}</div>
      <p className="text-xs font-medium text-slate-500">{title}</p>
    </div>
  );
};

// ─── Recent Submissions Table ─────────────────────────────────────────────────
const RecentSubmissionsTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("/my-feedbacks", { withCredentials: true });
        if (res.data.success) {
          setFeedbacks(res.data.feedbacks.slice(0, 10));
        } else {
          setError("Failed to fetch submissions");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <TableSkeleton />;
  if (error)
    return (
      <p className="p-6 text-red-500 text-center text-sm font-medium">{error}</p>
    );
  if (feedbacks.length === 0)
    return (
      <p className="p-8 text-center text-slate-500 text-sm">No submissions found.</p>
    );

  const StarDisplay = ({ rating }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="w-full text-sm hidden sm:table">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {["Name", "Phone", "Message", "Rating", "Submitted"].map((h) => (
              <th
                key={h}
                className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {feedbacks.map((fb, idx) => (
            <tr
              key={fb._id}
              className="hover:bg-slate-50/70 transition-colors"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {(fb.name || "?").charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">
                    {fb.name || "Anonymous"}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-500 text-sm">{fb.phone || "—"}</td>
              <td className="px-6 py-4 text-slate-600 text-sm max-w-xs">
                <span className="line-clamp-1">{fb.message || "—"}</span>
              </td>
              <td className="px-6 py-4">
                {fb.rating ? (
                  <StarDisplay rating={fb.rating} />
                ) : (
                  <span className="text-slate-400 text-sm">—</span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(fb.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="sm:hidden divide-y divide-slate-100">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                  {(fb.name || "?").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">
                    {fb.name || "Anonymous"}
                  </p>
                  {fb.phone && (
                    <p className="text-xs text-slate-400">{fb.phone}</p>
                  )}
                </div>
              </div>
              {fb.rating && (
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < fb.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200 fill-slate-200"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            {fb.message && (
              <p className="text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2 mb-2 line-clamp-2">
                {fb.message}
              </p>
            )}
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              {new Date(fb.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Skeletons & Error ────────────────────────────────────────────────────────
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-slate-50 p-6 animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="h-9 bg-slate-200 rounded-xl w-72 mb-2" />
      <div className="h-4 bg-slate-100 rounded w-48 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 h-32" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 h-72" />
        <div className="bg-white rounded-2xl border border-slate-200 h-72" />
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 h-64" />
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="p-6 space-y-3 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-12 bg-slate-100 rounded-xl" />
    ))}
  </div>
);

const ErrorMessage = ({ error, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center p-10 bg-white rounded-2xl shadow-lg border border-slate-200 max-w-sm w-full mx-4">
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <p className="text-slate-700 font-semibold mb-1">Something went wrong</p>
      <p className="text-red-500 text-sm mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  </div>
);

// ── Color constant used inside component scope ──
const PIE_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#6366f1"];

export default DashboardPage;