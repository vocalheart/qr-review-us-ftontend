"use client";

import { useState, useEffect, useRef } from "react";
import axios from "../llb/axios";
import {
  CheckCircle,
  Zap,
  Shield,
  Star,
  Clock,
  ArrowRight,
  Loader2,
  AlertCircle,
  QrCode,
  BarChart2,
  MessageSquare,
  Calendar,
  RefreshCw,
} from "lucide-react";

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [waitingForPayment, setWaitingForPayment] = useState(false);

  const pollingRef = useRef(null);
  const timeoutRef = useRef(null);

  const isIOS = () => {
    if (typeof navigator === "undefined") return false;
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  useEffect(() => {
    checkSubscriptionStatus();
    return () => stopPolling();
  }, []);

  const stopPolling = () => {
    if (pollingRef.current) { clearInterval(pollingRef.current); pollingRef.current = null; }
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
  };

  const checkSubscriptionStatus = async () => {
    try {
      const res = await axios.get("/subscription-status");
      setSubscriptionStatus(res.data);
      return res.data;
    } catch (err) {
      console.error("Error checking status:", err);
      return null;
    } finally {
      setCheckingStatus(false);
    }
  };

  const startPollingForPayment = () => {
    stopPolling();
    setWaitingForPayment(true);
    setInfo("Waiting for payment confirmation...");

    pollingRef.current = setInterval(async () => {
      const status = await checkSubscriptionStatus();
      if (!status) return;
      if (status.status === "active") {
        stopPolling();
        setWaitingForPayment(false);
        setInfo("Payment successful! Redirecting to dashboard...");
        setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
      }
      if (status.status === "failed" || status.status === "cancelled") {
        stopPolling();
        setWaitingForPayment(false);
        setError("Payment failed or cancelled. Please try again.");
      }
    }, 4000);

    timeoutRef.current = setTimeout(() => {
      stopPolling();
      setWaitingForPayment(false);
      setInfo("");
      setError("Payment verification timed out. Please refresh and try again.");
    }, 10 * 60 * 1000);
  };

  const startSubscription = async () => {
    try {
      setLoading(true);
      setError("");
      setInfo("");

      if (isIOS()) {
        setInfo("Redirecting to payment...");
        const res = await axios.post("/create-subscription", {});
        if (res.data?.subscription?.short_url) {
          window.location.href = res.data.subscription.short_url;
          return;
        } else {
          setError("Unable to start subscription. Please try again.");
          return;
        }
      }
      const paymentWindow = window.open("", "_blank");
      if (!paymentWindow) {
        setError("Popup blocked! Please allow popups and try again.");
        setLoading(false);
        return;
      }

      setInfo("Opening secure payment page...");
      const res = await axios.post("/create-subscription", {});
      if (res.data?.subscription?.short_url) {
        paymentWindow.location.href = res.data.subscription.short_url;
        setInfo("Payment window opened. Complete payment to activate.");
        startPollingForPayment();
      } else {
        paymentWindow.close();
        setError("Unable to start subscription. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Features list ──
  const features = [
    { icon: <QrCode className="w-4 h-4" />, text: "Unlimited QR Code Generation" },
    { icon: <BarChart2 className="w-4 h-4" />, text: "Analytics & Rating Dashboard" },
    { icon: <MessageSquare className="w-4 h-4" />, text: "Feedback Collection & Management" },
    { icon: <Shield className="w-4 h-4" />, text: "Smart Review Filtering" },
    { icon: <Zap className="w-4 h-4" />, text: "Instant Activation" },
  ];

  // ── Loading ──
  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
          </div>
          <p className="text-slate-600 font-medium text-sm">Checking subscription status...</p>
        </div>
      </div>
    );
  }

  // ── ACTIVE SUBSCRIPTION ──
  if (subscriptionStatus?.status === "active") {
    const daysLeft = subscriptionStatus.daysRemaining || 0;
    const hoursLeft = subscriptionStatus.hoursRemaining || 0;
    const startDate = subscriptionStatus.currentStart
      ? new Date(subscriptionStatus.currentStart).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : "N/A";
    const endDate = subscriptionStatus.currentEnd
      ? new Date(subscriptionStatus.currentEnd).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : "N/A";

    const totalHours = 7 * 24;
    const remainingHours = daysLeft * 24 + hoursLeft;
    const pct = Math.max(0, Math.min(100, (remainingHours / totalHours) * 100));

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Active Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              SUBSCRIPTION ACTIVE
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">You're all set!</h1>
            <p className="text-slate-500 text-sm mt-1">Your premium plan is running smoothly</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Green Header */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-emerald-100 text-xs font-medium uppercase tracking-wider mb-1">1 Year Premium</p>
                  <p className="text-3xl font-extrabold">₹2000 <span className="text-lg font-normal opacity-70">/ week</span></p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs text-emerald-100 mb-2">
                  <span>Time remaining</span>
                  <span>{daysLeft}d {hoursLeft}h left</span>
                </div>
                <div className="bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="px-6 py-5 space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  Started
                </div>
                <span className="text-slate-800 font-semibold text-sm">{startDate}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock className="w-4 h-4" />
                  Expires
                </div>
                <span className="text-slate-800 font-semibold text-sm">{endDate}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SUBSCRIBE UI ──
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <Star className="w-3.5 h-3.5 fill-indigo-500" />
            PREMIUM PLAN
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Upgrade to Premium</h1>
          <p className="text-slate-500 text-sm mt-1">Everything you need to grow your reviews</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Price Header */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 px-6 py-8 text-white text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/5 rounded-full" />

            {/* <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-3">7-Day Trial</p> */}
            <div className="flex items-end justify-center gap-1 mb-2">
              <span className="text-5xl font-extrabold">₹2</span>
              <span className="text-indigo-200 text-base pb-1.5">/ 7 days</span>
            </div>
            <p className="text-indigo-200 text-xs">No hidden charges • Cancel anytime</p>
          </div>

          {/* Features */}
          <div className="px-6 py-5 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">What's included</p>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                    {f.icon}
                  </div>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="px-6 py-6">
            {waitingForPayment ? (
              <div className="w-full py-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <div className="flex items-center justify-center gap-2 text-amber-700 font-semibold text-sm mb-1">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Waiting for payment...
                </div>
                <p className="text-amber-600 text-xs">Complete payment in the opened tab. This page will auto-activate.</p>
              </div>
            ) : (
              <button
                onClick={startSubscription}
                disabled={loading}
                className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Opening Payment...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Start 1 Year Plan — ₹2000 Only
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            {/* Info / Error */}
            {info && (
              <div className="mt-4 flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm rounded-xl px-4 py-3">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                {info}
              </div>
            )}
            {error && (
              <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Payment Error</p>
                  <p className="text-xs text-red-500 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {/* Trust badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
              <Shield className="w-3.5 h-3.5" />
              Secured by Razorpay • 256-bit SSL encrypted
            </div>
          </div>
        </div>

        {/* Money back note */}
        <p className="text-center text-xs text-slate-400 mt-4">
          ✦ Instant activation after payment &nbsp;•&nbsp; No auto-renewal surprises
        </p>
      </div>
    </div>
  );
}