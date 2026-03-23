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
  Crown,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/* ─────────────────────────────────────────
   Plan definitions (frontend display only)
───────────────────────────────────────── */
const PLANS = [
  {
    type: "monthly",
    label: "Monthly",
    price: "₹649",
    period: "/ month",
    badge: null,
    description: "Perfect to get started",
    color: "from-slate-600 to-slate-800",
    accentBg: "bg-slate-600",
    accentText: "text-slate-600",
    accentBorder: "border-slate-300",
    accentHover: "hover:bg-slate-700",
    accentLight: "bg-slate-100",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    type: "quarterly",
    label: "3 Months",
    price: "₹1449",
    period: "/ 3 months",
    badge: "BEST VALUE",
    description: "Save ₹498 vs monthly",
    color: "from-indigo-600 to-violet-600",
    accentBg: "bg-indigo-600",
    accentText: "text-indigo-600",
    accentBorder: "border-indigo-400",
    accentHover: "hover:bg-indigo-700",
    accentLight: "bg-indigo-50",
    icon: <Sparkles className="w-5 h-5" />,
    popular: true,
  },
  {
    type: "yearly",
    label: "1 Year",
    price: "₹2499",
    period: "/ year",
    badge: "MOST POPULAR",
    description: "Save ₹3289 vs monthly",
    color: "from-amber-500 to-orange-600",
    accentBg: "bg-amber-500",
    accentText: "text-amber-600",
    accentBorder: "border-amber-400",
    accentHover: "hover:bg-amber-600",
    accentLight: "bg-amber-50",
    icon: <Crown className="w-5 h-5" />,
  },
];

const FEATURES = [
  { icon: <QrCode className="w-4 h-4" />, text: "Unlimited QR Code Generation" },
  { icon: <BarChart2 className="w-4 h-4" />, text: "Analytics & Rating Dashboard" },
  { icon: <MessageSquare className="w-4 h-4" />, text: "Feedback Collection & Management" },
  { icon: <Shield className="w-4 h-4" />, text: "Smart Review Filtering" },
  { icon: <Zap className="w-4 h-4" />, text: "Instant Activation" },
];

/* gradient per plan on active screen */
const ACTIVE_COLORS = {
  monthly:   "from-slate-500 to-slate-700",
  quarterly: "from-indigo-500 to-violet-600",
  yearly:    "from-amber-400 to-orange-500",
  default:   "from-emerald-500 to-teal-600",
};

export default function SubscribePage() {
  const [loading, setLoading]                       = useState(false);
  const [loadingPlan, setLoadingPlan]               = useState(null);
  const [checkingStatus, setCheckingStatus]         = useState(true);
  const [error, setError]                           = useState("");
  const [info, setInfo]                             = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [waitingForPayment, setWaitingForPayment]   = useState(false);
  const [selectedPlan, setSelectedPlan]             = useState("quarterly");

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
    if (timeoutRef.current) { clearTimeout(timeoutRef.current);  timeoutRef.current = null; }
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

  const startSubscription = async (planType) => {
    try {
      setLoading(true);
      setLoadingPlan(planType);
      setError("");
      setInfo("");

      if (isIOS()) {
        setInfo("Redirecting to payment...");
        const res = await axios.post("/create-subscription", { planType });
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
        setLoadingPlan(null);
        return;
      }

      setInfo("Opening secure payment page...");
      const res = await axios.post("/create-subscription", { planType });

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
      setLoadingPlan(null);
    }
  };

  /* ── LOADING ── */
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

  /* ── ACTIVE SUBSCRIPTION ── */
  if (subscriptionStatus?.status === "active") {
    const daysLeft  = subscriptionStatus.daysRemaining  || 0;
    const hoursLeft = subscriptionStatus.hoursRemaining || 0;
    const planType  = subscriptionStatus.planType  || "default";
    const planLabel = subscriptionStatus.planLabel || "Premium Plan";
    const planPrice = subscriptionStatus.planPrice || "";

    const fmtDate = (val) =>
      val
        ? new Date(val).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
        : "N/A";

    const startDate = fmtDate(subscriptionStatus.currentStart);
    const endDate   = fmtDate(subscriptionStatus.currentEnd);

    /* progress bar scaled to plan duration */
    const planDays = planType === "monthly" ? 30 : planType === "quarterly" ? 90 : 365;
    const remainingHours = daysLeft * 24 + hoursLeft;
    const pct = Math.max(0, Math.min(100, (remainingHours / (planDays * 24)) * 100));

    const periodLabel =
      planType === "monthly" ? "/ month" :
      planType === "quarterly" ? "/ 3 months" :
      "/ year";

    const gradientClass = ACTIVE_COLORS[planType] || ACTIVE_COLORS.default;

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              SUBSCRIPTION ACTIVE
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">You're all set!</h1>
            <p className="text-slate-500 text-sm mt-1">Your premium plan is running smoothly</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Coloured header */}
            <div className={`bg-gradient-to-br ${gradientClass} px-6 py-8 text-white`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">{planLabel}</p>
                  <p className="text-3xl font-extrabold">
                    {planPrice}{" "}
                    <span className="text-lg font-normal opacity-60">{periodLabel}</span>
                  </p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-white/70 mb-2">
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

            {/* Dates */}
            <div className="px-6 py-5 space-y-1">
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

  /* ── SUBSCRIBE UI – 3 plan cards ── */
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <Star className="w-3.5 h-3.5 fill-indigo-500" />
            PREMIUM PLANS
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Choose Your Plan</h1>
          <p className="text-slate-500 text-sm mt-2">Everything you need to grow your reviews. Cancel anytime.</p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {PLANS.map((plan) => {
            const isSelected    = selectedPlan === plan.type;
            const isThisLoading = loadingPlan === plan.type;

            return (
              <div
                key={plan.type}
                onClick={() => !waitingForPayment && !loading && setSelectedPlan(plan.type)}
                className={`relative bg-white rounded-2xl border-2 shadow-sm overflow-hidden cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? `${plan.accentBorder} shadow-lg scale-[1.02]`
                    : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {plan.badge && (
                  <div className={`absolute top-3 right-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full ${plan.accentBg}`}>
                    {plan.badge}
                  </div>
                )}

                <div className={`bg-gradient-to-br ${plan.color} px-5 py-6 text-white relative overflow-hidden`}>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                  <div className="flex items-center gap-2 mb-3 relative z-10">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      {plan.icon}
                    </div>
                    <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">{plan.label}</span>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-3xl font-extrabold">{plan.price}</span>
                      <span className="text-white/60 text-sm pb-1">{plan.period}</span>
                    </div>
                    <p className="text-white/70 text-xs">{plan.description}</p>
                  </div>
                </div>

                <div className="px-5 py-4 border-b border-slate-100">
                  <ul className="space-y-2.5">
                    {FEATURES.map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-slate-600">
                        <div className={`w-5 h-5 ${plan.accentLight} rounded-md flex items-center justify-center ${plan.accentText} shrink-0`}>
                          {f.icon}
                        </div>
                        {f.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-5 py-4">
                  {waitingForPayment && isSelected ? (
                    <div className="w-full py-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                      <div className="flex items-center justify-center gap-2 text-amber-700 font-semibold text-xs">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Waiting for payment...
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startSubscription(plan.type);
                      }}
                      disabled={loading || waitingForPayment}
                      className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 ${
                        loading || waitingForPayment
                          ? "opacity-50 cursor-not-allowed bg-slate-400"
                          : `${plan.accentBg} ${plan.accentHover} hover:shadow-md`
                      }`}
                    >
                      {isThisLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Opening...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Get {plan.label}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                  {isSelected && !waitingForPayment && (
                    <p className={`text-center text-xs mt-2 font-medium ${plan.accentText}`}>
                      ✓ Selected
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Status messages */}
        <div className="max-w-md mx-auto space-y-3">
          {waitingForPayment && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <div>
                <p className="font-semibold">Waiting for payment...</p>
                <p className="text-xs text-amber-600">Complete payment in the opened tab. This page will auto-activate.</p>
              </div>
            </div>
          )}
          {info && !waitingForPayment && (
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm rounded-xl px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              {info}
            </div>
          )}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Payment Error</p>
                <p className="text-xs text-red-500 mt-0.5">{error}</p>
              </div>
            </div>
          )}
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs pt-1">
            <Shield className="w-3.5 h-3.5" />
            Secured by Razorpay • 256-bit SSL encrypted
          </div>
          <p className="text-center text-xs text-slate-400">
            ✦ Instant activation after payment &nbsp;•&nbsp; No auto-renewal surprises
          </p>
        </div>

      </div>
    </div>
  );
}