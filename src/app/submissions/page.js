"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  MessageSquare,
  Search,
  Phone,
  Star,
  Clock,
  Download,
  RefreshCw,
  AlertTriangle,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Filter,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const MESSAGE_TRUNCATE_LENGTH = 100;

/* ── Expandable Message (mobile cards) ─────────────────────────────── */
function ExpandableMessage({ message }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = message.length > MESSAGE_TRUNCATE_LENGTH;

  if (!isLong) {
    return <p className="text-sm text-slate-600 leading-relaxed">{message}</p>;
  }

  return (
    <div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {expanded ? message : `${message.slice(0, MESSAGE_TRUNCATE_LENGTH)}…`}
      </p>
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        {expanded ? (
          <>Show less <ChevronUp className="w-3 h-3" /></>
        ) : (
          <>Read more <ChevronDown className="w-3 h-3" /></>
        )}
      </button>
    </div>
  );
}

/* ── Expandable Message (desktop table) ────────────────────────────── */
function ExpandableMessageInline({ message }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = message.length > MESSAGE_TRUNCATE_LENGTH;

  if (!isLong) {
    return (
      <p className="text-sm text-slate-600 leading-relaxed" title={message}>
        {message}
      </p>
    );
  }

  return (
    <div className="max-w-xs">
      <p className="text-sm text-slate-600 leading-relaxed">
        {expanded ? message : `${message.slice(0, MESSAGE_TRUNCATE_LENGTH)}…`}
      </p>
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        {expanded ? (
          <>Show less <ChevronUp className="w-3 h-3" /></>
        ) : (
          <>Read more <ChevronDown className="w-3 h-3" /></>
        )}
      </button>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────────────── */
export default function SubmissionsPage() {
  return (
    <ProtectedRoute>
      <SubmissionsContent />
    </ProtectedRoute>
  );
}

/* ── Content ───────────────────────────────────────────────────────── */
function SubmissionsContent() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState("");

  const ITEMS_PER_PAGE = 10;

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get("/my-feedbacks", { withCredentials: true });
      if (data.success) {
        setFeedbacks(
          data.feedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } else {
        setError("Failed to fetch submissions");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  const filtered = useMemo(() => {
    return feedbacks.filter((fb) => {
      const term = search.toLowerCase();
      const matchSearch =
        fb.name?.toLowerCase().includes(term) ||
        fb.phone?.includes(search) ||
        fb.message?.toLowerCase().includes(term);
      const matchRating = filterRating === 0 || fb.rating === filterRating;
      return matchSearch && matchRating;
    });
  }, [feedbacks, search, filterRating]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const avgRating = feedbacks.length
    ? (feedbacks.reduce((a, fb) => a + (fb.rating || 0), 0) / feedbacks.filter(f => f.rating).length).toFixed(1)
    : null;

  const todayCount = feedbacks.filter(
    (fb) => new Date(fb.createdAt).toDateString() === new Date().toDateString()
  ).length;

  const copyPhone = (phone, id) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Message", "Rating", "Submitted At"];
    const rows = filtered.map((fb) => [
      fb.name || "",
      fb.phone || "",
      `"${(fb.message || "").replace(/"/g, '""')}"`,
      fb.rating || "",
      new Date(fb.createdAt).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const StarRow = ({ rating }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
        />
      ))}
    </div>
  );

  const ratingColor = (r) => {
    if (r >= 4) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (r === 3) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  if (loading) return <SubmissionsSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center max-w-sm w-full">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <p className="text-slate-700 font-semibold mb-1">Something went wrong</p>
          <p className="text-red-500 text-sm mb-6">{error}</p>
          <button
            onClick={fetchFeedbacks}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition text-sm font-medium shadow-md active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-7 h-7 text-indigo-600" />
              Submissions
            </h1>
            <p className="mt-1 text-sm text-slate-500">All customer feedback in one place</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchFeedbacks}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition shadow-md hover:shadow-lg active:scale-95"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ── Mini Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Submissions", value: feedbacks.length, icon: <Users className="w-4 h-4" />, color: "indigo" },
            { label: "Today's Submissions", value: todayCount, icon: <Clock className="w-4 h-4" />, color: "emerald" },
            { label: "Average Rating", value: avgRating ? `${avgRating} ★` : "—", icon: <Star className="w-4 h-4" />, color: "amber" },
          ].map((s) => {
            const colors = {
              indigo: "bg-indigo-50 border-indigo-100 text-indigo-600",
              emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
              amber: "bg-amber-50 border-amber-100 text-amber-600",
            };
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${colors[s.color]}`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-xl font-extrabold text-slate-800">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, phone or message..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm bg-slate-50"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {[0, 5, 4, 3, 2, 1].map((r) => (
              <button
                key={r}
                onClick={() => { setFilterRating(r); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  filterRating === r
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {r === 0 ? "All" : `${r}★`}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results count ── */}
        {(search || filterRating > 0) && (
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
            {search ? ` for "${search}"` : ""}
            {filterRating > 0 ? ` with ${filterRating}★` : ""}
          </p>
        )}

        {/* ── Empty State ── */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-base font-bold text-slate-700 mb-1">
              {search || filterRating > 0 ? "No matching submissions" : "No submissions yet"}
            </h3>
            <p className="text-sm text-slate-400">
              {search || filterRating > 0
                ? "Try adjusting your search or filter."
                : "Share your QR code to start collecting feedback."}
            </p>
          </div>
        ) : (
          <>
            {/* ── Desktop Table ── */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["Customer", "Phone", "Message", "Rating", "Submitted"].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((fb) => (
                    <tr key={fb._id} className="hover:bg-slate-50/60 transition-colors group align-top">
                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                            {(fb.name || "?").charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-slate-800 text-sm">
                            {fb.name || "Anonymous"}
                          </span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4">
                        {fb.phone ? (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-sm text-slate-600">{fb.phone}</span>
                            <button
                              onClick={() => copyPhone(fb.phone, fb._id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-indigo-50 text-indigo-500"
                              title="Copy"
                            >
                              {copiedId === fb._id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>

                      {/* Message — expandable */}
                      <td className="px-5 py-4">
                        {fb.message ? (
                          <ExpandableMessageInline message={fb.message} />
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>

                      {/* Rating */}
                      <td className="px-5 py-4">
                        {fb.rating ? (
                          <div className="flex flex-col gap-1">
                            <StarRow rating={fb.rating} />
                            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border w-fit ${ratingColor(fb.rating)}`}>
                              {fb.rating}/5
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-700 font-medium">
                            {new Date(fb.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {new Date(fb.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Cards ── */}
            <div className="md:hidden space-y-3">
              {paginated.map((fb) => (
                <div key={fb._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
                        {(fb.name || "?").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{fb.name || "Anonymous"}</p>
                        {fb.phone && (
                          <button
                            onClick={() => copyPhone(fb.phone, fb._id)}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            {fb.phone}
                            {copiedId === fb._id
                              ? <Check className="w-3 h-3 text-emerald-500" />
                              : <Copy className="w-3 h-3" />}
                          </button>
                        )}
                      </div>
                    </div>
                    {fb.rating && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${ratingColor(fb.rating)}`}>
                        {fb.rating}★
                      </span>
                    )}
                  </div>

                  {fb.rating && (
                    <div className="mb-2">
                      <StarRow rating={fb.rating} />
                    </div>
                  )}

                  {/* Message — expandable on mobile */}
                  {fb.message && (
                    <div className="bg-slate-50 rounded-xl px-3 py-2 mb-3">
                      <ExpandableMessage message={fb.message} />
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {new Date(fb.createdAt).toLocaleString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 pt-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const p = i + 1;
                    if (totalPages > 7 && Math.abs(p - page) > 2 && p !== 1 && p !== totalPages) {
                      if (p === 2 || p === totalPages - 1) return <span key={p} className="text-slate-400 text-sm px-1">…</span>;
                      return null;
                    }
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                          page === p
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ── Skeleton ──────────────────────────────────────────────────────── */
const SubmissionsSkeleton = () => (
  <div className="min-h-screen bg-slate-50 animate-pulse">
    <div className="bg-white border-b border-slate-200 px-6 py-6">
      <div className="h-8 bg-slate-200 rounded-xl w-48 mb-2" />
      <div className="h-4 bg-slate-100 rounded w-64" />
    </div>
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 h-20" />
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 h-16" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200 h-16" />
      ))}
    </div>
  </div>
);