"use client";
import React, { useEffect, useState } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  Receipt, Calendar, Clock, CreditCard, CheckCircle,
  XCircle, AlertCircle, ExternalLink, RefreshCw,
  TrendingUp, Zap, IndianRupee, Hash,
} from "lucide-react";

/* ── Status config ──────────────────────────────────────── */
const STATUS = {
  active: {
    label: "Active",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: <XCircle className="w-3.5 h-3.5" />,
    cls: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-500",
  },
  failed: {
    label: "Failed",
    icon: <XCircle className="w-3.5 h-3.5" />,
    cls: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
  },
  created: {
    label: "Pending",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
  },
};

const getStatus = (s) => STATUS[s] || STATUS.created;

/* ── Main Page ──────────────────────────────────────────── */
function Page() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await axios.get("/subscription-history", { withCredentials: true });
      if (res.data.success) setHistory(res.data.history || []);
    } catch (err) {
      console.error("History fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  /* ── stats ── */
  const totalSpent = history.reduce((a, s) => a + (s.amount || 0), 0) / 100;
  const activeCount = history.filter((s) => s.status === "active").length;
  const totalCount = history.length;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        {/* ── Header ── */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Receipt className="w-7 h-7 text-indigo-600" />
                Subscription History
              </h1>
              <p className="mt-1 text-sm text-slate-500">All your billing & subscription records</p>
            </div>
            <button
              onClick={() => fetchHistory(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium px-4 py-2 rounded-xl transition active:scale-95 disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* ── Loading ── */}
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {/* stat skeletons */}
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 h-24" />
                ))}
              </div>
              {/* card skeletons */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                  <div className="flex justify-between">
                    <div className="h-5 w-36 bg-slate-200 rounded" />
                    <div className="h-5 w-20 bg-slate-100 rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-4 bg-slate-100 rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            /* ── Empty State ── */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-slate-300" />
              </div>
              <h2 className="text-base font-bold text-slate-700 mb-1">No Subscription History</h2>
              <p className="text-slate-400 text-sm">You haven't purchased any subscription yet.</p>
              <a
                href="/subscribe"
                className="inline-flex items-center gap-2 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-md active:scale-95 text-sm"
              >
                <Zap className="w-4 h-4" /> Get Started
              </a>
            </div>
          ) : (
            <>
              {/* ── Summary Stats ── */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: <Receipt className="w-4 h-4" />, label: "Total Plans", value: totalCount, color: "indigo" },
                  { icon: <CheckCircle className="w-4 h-4" />, label: "Active", value: activeCount, color: "emerald" },
                  { icon: <IndianRupee className="w-4 h-4" />, label: "Total Spent", value: `₹${totalSpent}`, color: "violet" },
                ].map((s) => {
                  const colors = {
                    indigo: "bg-indigo-50 border-indigo-100 text-indigo-600",
                    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
                    violet: "bg-violet-50 border-violet-100 text-violet-600",
                  };
                  return (
                    <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${colors[s.color]}`}>
                        {s.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg sm:text-xl font-extrabold text-slate-800 truncate">{s.value}</p>
                        <p className="text-xs text-slate-400">{s.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── History Cards ── */}
              <div className="space-y-4">
                {history.map((sub, idx) => {
                  const st = getStatus(sub.status);
                  const isActive = sub.status === "active";
                  const isPending = sub.status === "created";
                  const startDate = sub.currentStart
                    ? new Date(sub.currentStart).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                    : null;
                  const endDate = sub.currentEnd
                    ? new Date(sub.currentEnd).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                    : null;
                  const createdAt = new Date(sub.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

                  return (
                    <div
                      key={sub._id}
                      className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
                        isActive ? "border-emerald-200" : "border-slate-200"
                      }`}
                    >
                      {/* Active banner */}
                      {isActive && (
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-white text-xs font-semibold tracking-wide uppercase">Currently Active</span>
                        </div>
                      )}
                      {isPending && (
                        <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-5 py-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-white text-xs font-semibold tracking-wide uppercase">Payment Pending</span>
                        </div>
                      )}

                      <div className="p-5 sm:p-6">
                        {/* Top row */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isActive ? "bg-emerald-100" : "bg-slate-100"
                            }`}>
                              <CreditCard className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-slate-500"}`} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm sm:text-base">
                                {sub.planId || "Premium Plan"}
                              </p>
                              <p className="text-xs text-slate-400 mt-0.5">Created {createdAt}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Amount badge */}
                            <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1.5 rounded-xl">
                              <IndianRupee className="w-3.5 h-3.5" />
                              {(sub.amount || 0) / 100}
                            </div>
                            {/* Status badge */}
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${st.cls}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                              {st.label}
                            </span>
                          </div>
                        </div>

                        {/* Info grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {/* Sub ID */}
                          {sub.subscriptionId && (
                            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5">
                              <Hash className="w-4 h-4 text-slate-400 shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs text-slate-400 font-medium">Subscription ID</p>
                                <p className="text-xs text-slate-700 font-mono truncate">{sub.subscriptionId}</p>
                              </div>
                            </div>
                          )}

                          {/* Start date */}
                          {startDate && (
                            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5">
                              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                              <div>
                                <p className="text-xs text-slate-400 font-medium">Start Date</p>
                                <p className="text-xs text-slate-700 font-semibold">{startDate}</p>
                              </div>
                            </div>
                          )}

                          {/* End date */}
                          {endDate && (
                            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5">
                              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                              <div>
                                <p className="text-xs text-slate-400 font-medium">Expiry Date</p>
                                <p className="text-xs text-slate-700 font-semibold">{endDate}</p>
                              </div>
                            </div>
                          )}

                          {/* Days remaining */}
                          {isActive && (
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5">
                              <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                              <div>
                                <p className="text-xs text-emerald-600 font-medium">Time Remaining</p>
                                <p className="text-xs text-emerald-700 font-bold">{sub.daysRemaining || 0} days left</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Progress bar for active */}
                        {isActive && sub.daysRemaining !== undefined && (
                          <div className="mt-4">
                            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                              <span>Plan progress</span>
                              <span>{7 - (sub.daysRemaining || 0)} / 7 days used</span>
                            </div>
                            <div className="bg-slate-100 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all"
                                style={{ width: `${Math.max(0, Math.min(100, ((7 - (sub.daysRemaining || 0)) / 7) * 100))}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Complete payment CTA */}
                        {sub.shortUrl && isPending && (
                          <div className="mt-4 pt-4 border-t border-slate-100">
                            <a
                              href={sub.shortUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-md active:scale-95"
                            >
                              <Zap className="w-4 h-4" />
                              Complete Payment
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Page;