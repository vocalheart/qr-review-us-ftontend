// app/subscription-history/page.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  Receipt, Calendar, Clock, CreditCard, CheckCircle,
  XCircle, AlertCircle, ExternalLink, RefreshCw,
  Zap, IndianRupee, Hash,
} from "lucide-react";

/* ── Status config (all statuses) ──────────────────────── */
const STATUS = {
  active: {
    label: "Active",
    icon: <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    banner: "bg-gradient-to-r from-emerald-500 to-teal-500",
  },
  authenticated: {
    label: "Trial Active",
    icon: <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    cls: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    banner: "bg-gradient-to-r from-blue-500 to-cyan-500",
  },
  expired: {
    label: "Expired",
    icon: <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    cls: "bg-orange-50 text-orange-700 border-orange-200",
    dot: "bg-orange-400",
    banner: "bg-gradient-to-r from-orange-500 to-amber-500",
  },
  completed: {
    label: "Completed",
    icon: <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    cls: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
    banner: "bg-gradient-to-r from-violet-500 to-purple-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    cls: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-500",
    banner: "bg-gradient-to-r from-red-500 to-rose-500",
  },
  failed: {
    label: "Failed",
    icon: <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    cls: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
    banner: "bg-gradient-to-r from-slate-500 to-slate-600",
  },
  created: {
    label: "Pending",
    icon: <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
    banner: "bg-gradient-to-r from-amber-400 to-orange-400",
  },
};

const getStatus = (s) => STATUS[s] || STATUS.created;

/* ── Plan total duration in days ───────────────────────── */
const PLAN_DURATION = {
  trial:     7,
  monthly:   30,
  quarterly: 90,
  yearly:    365,
};

const getPlanDuration = (planType) =>
  PLAN_DURATION[planType?.toLowerCase()] ?? 30;

/* ── User-friendly plan name ───────────────────────────── */
const getPlanName = (planType) => {
  switch (planType?.toLowerCase()) {
    case "trial":     return "7 Days Free Trial";
    case "monthly":   return "Monthly Plan";
    case "quarterly": return "3 Months Plan";
    case "yearly":    return "1 Year Plan";
    default:          return "Premium Plan";
  }
};

/* ── Days elapsed from start ───────────────────────────── */
const getDaysElapsed = (startStr) => {
  if (!startStr) return 0;
  const diff = Date.now() - new Date(startStr).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

/* ── Main Page ──────────────────────────────────────────── */
function Page() {
  const [history,    setHistory]    = useState([]);
  const [loading,    setLoading]    = useState(true);
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

  /* ── Derived stats ── */
  const totalSpent   = history.reduce((a, s) => a + (s.amount || 0), 0) / 100;
  // ✅ count both active + authenticated (trial) as "active"
  const activeCount  = history.filter(
    (s) => s.status === "active" || s.status === "authenticated"
  ).length;
  const totalCount   = history.length;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">

        {/* ── Page Header ── */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  Subscription History
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 ml-10 sm:ml-13">
                View all your billing and subscription records
              </p>
            </div>
            <button
              onClick={() => fetchHistory(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center sm:justify-start gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition active:scale-95 disabled:opacity-60 flex-shrink-0 w-full sm:w-auto"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">

          {/* ── Loading ── */}
          {loading ? (
            <div className="space-y-4 sm:space-y-6 animate-pulse">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg sm:rounded-2xl border border-slate-200 h-20 sm:h-24" />
                ))}
              </div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg sm:rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-3">
                  <div className="flex justify-between">
                    <div className="h-5 w-32 bg-slate-200 rounded" />
                    <div className="h-5 w-16 bg-slate-100 rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(4)].map((_, j) => <div key={j} className="h-4 bg-slate-100 rounded" />)}
                  </div>
                </div>
              ))}
            </div>

          ) : history.length === 0 ? (
            /* ── Empty ── */
            <div className="bg-white rounded-lg sm:rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Receipt className="w-8 h-8 text-slate-300" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
                No Subscription History
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8">
                You haven't purchased any subscription yet. Get started today!
              </p>
              <a
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition shadow-md active:scale-95 text-xs sm:text-sm"
              >
                <Zap className="w-4 h-4" />
                Get Started
              </a>
            </div>

          ) : (
            <>
              {/* ── Summary Stats ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: <Receipt className="w-4 h-4 sm:w-5 sm:h-5" />,      label: "Total Plans",   value: totalCount,                color: "indigo"  },
                  { icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />,  label: "Active Plans",  value: activeCount,               color: "emerald" },
                  { icon: <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />, label: "Total Spent",   value: `₹${totalSpent.toFixed(2)}`, color: "violet"  },
                ].map((s) => {
                  const clsMap = {
                    indigo:  "bg-indigo-50  border-indigo-100  text-indigo-600",
                    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
                    violet:  "bg-violet-50  border-violet-100  text-violet-600",
                  };
                  return (
                    <div key={s.label} className="bg-white rounded-lg sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center border flex-shrink-0 ${clsMap[s.color]}`}>
                        {s.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm sm:text-lg lg:text-xl font-bold text-slate-900 truncate">{s.value}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── History Cards ── */}
              <div className="space-y-4 sm:space-y-6">
                {history.map((sub) => {
                  const st = getStatus(sub.status);

                  // ✅ isActive covers both paid active + trial
                  const isActive  = sub.status === "active" || sub.status === "authenticated";
                  const isTrial   = sub.status === "authenticated";
                  const isPending = sub.status === "created";
                  const isExpired = sub.status === "expired";

                  const startDate = sub.currentStart
                    ? new Date(sub.currentStart).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                    : null;
                  const endDate = sub.currentEnd
                    ? new Date(sub.currentEnd).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                    : null;
                  const createdAt = new Date(sub.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

                  // ✅ Dynamic progress bar based on planType
                  const totalDays   = getPlanDuration(sub.planType);
                  const elapsed     = getDaysElapsed(sub.currentStart);
                  const clampedElapsed = Math.min(elapsed, totalDays);
                  const progressPct = totalDays > 0 ? Math.round((clampedElapsed / totalDays) * 100) : 0;
                  const daysLeft    = Math.max(0, totalDays - elapsed);

                  return (
                    <div
                      key={sub._id}
                      className={`bg-white rounded-lg sm:rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
                        isActive ? "border-emerald-200" : isExpired ? "border-orange-200" : "border-slate-200"
                      }`}
                    >
                      {/* Status Banner — active / trial / pending */}
                      {(isActive || isPending) && (
                        <div className={`px-4 sm:px-6 py-2 sm:py-2.5 flex items-center gap-2 ${st.banner}`}>
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />
                          <span className="text-white text-xs font-bold tracking-wide uppercase">
                            {isTrial   ? "7 Days Free Trial — Active"
                             : isActive ? "Currently Active"
                             :            "Payment Pending"}
                          </span>
                        </div>
                      )}

                      {/* Expired banner */}
                      {isExpired && (
                        <div className={`px-4 sm:px-6 py-2 sm:py-2.5 flex items-center gap-2 ${st.banner}`}>
                          <span className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                          <span className="text-white text-xs font-bold tracking-wide uppercase">
                            Plan Expired
                          </span>
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">

                        {/* Top row */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                              isActive ? "bg-emerald-100" : isExpired ? "bg-orange-100" : "bg-slate-100"
                            }`}>
                              <CreditCard className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                isActive ? "text-emerald-600" : isExpired ? "text-orange-500" : "text-slate-500"
                              }`} />
                            </div>
                            <div className="min-w-0">
                              {/* ✅ User-friendly plan name */}
                              <p className="font-bold text-slate-900 text-sm sm:text-base truncate">
                                {getPlanName(sub.planType)}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">Created on {createdAt}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            {/* Amount */}
                            <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex-shrink-0">
                              <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              <span>{(sub.amount || 0) / 100}</span>
                            </div>
                            {/* Status */}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-bold flex-shrink-0 ${st.cls}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                              {st.label}
                            </span>
                          </div>
                        </div>

                        {/* ✅ Trial banner pill */}
                        {isTrial && (
                          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-2 rounded-xl">
                            <span>🎉</span>
                            <span>Your 7 Days Free Trial is Active — {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining</span>
                          </div>
                        )}

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {sub.subscriptionId && (
                            <div className="flex items-center gap-2 bg-slate-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                              <Hash className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs text-slate-400 font-medium">Subscription ID</p>
                                <p className="text-xs text-slate-700 font-mono truncate">{sub.subscriptionId}</p>
                              </div>
                            </div>
                          )}
                          {startDate && (
                            <div className="flex items-center gap-2 bg-slate-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                              <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-slate-400 font-medium">Start Date</p>
                                <p className="text-xs text-slate-700 font-semibold">{startDate}</p>
                              </div>
                            </div>
                          )}
                          {endDate && (
                            <div className="flex items-center gap-2 bg-slate-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                              <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-slate-400 font-medium">Expiry Date</p>
                                <p className="text-xs text-slate-700 font-semibold">{endDate}</p>
                              </div>
                            </div>
                          )}
                          {/* Days remaining pill for active (non-trial) */}
                          {isActive && !isTrial && (
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                              <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-emerald-600 font-medium">Time Remaining</p>
                                <p className="text-xs text-emerald-700 font-bold">
                                  {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* ✅ Dynamic progress bar — only for active plans */}
                        {isActive && sub.currentStart && (
                          <div className="pt-1">
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                              <span className="font-medium">Plan Progress</span>
                              <span>
                                {clampedElapsed} / {totalDays} days
                                {daysLeft > 0 && (
                                  <span className="ml-1 text-slate-400">
                                    ({daysLeft} left)
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  isTrial
                                    ? "bg-gradient-to-r from-blue-400 to-cyan-500"
                                    : "bg-gradient-to-r from-emerald-400 to-teal-500"
                                }`}
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                            <p className="text-right text-[10px] text-slate-400 mt-1">{progressPct}% used</p>
                          </div>
                        )}

                        {/* Payment CTA for pending */}
                        {sub.shortUrl && isPending && (
                          <div className="pt-3 sm:pt-4 border-t border-slate-100">
                            <a
                              href={sub.shortUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition shadow-md active:scale-95 w-full sm:w-auto"
                            >
                              <Zap className="w-4 h-4" />
                              Complete Payment
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}

                        {/* Renew CTA for expired */}
                        {isExpired && (
                          <div className="pt-3 sm:pt-4 border-t border-slate-100">
                            <a
                              href="/subscribe"
                              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition shadow-md active:scale-95 w-full sm:w-auto"
                            >
                              <RefreshCw className="w-4 h-4" />
                              Renew Subscription
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