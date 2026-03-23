"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock, RefreshCw, ArrowRight, Zap, AlertTriangle } from "lucide-react";
import axios from "../llb/axios";

export default function SuccessPage() {
  const [status, setStatus] = useState("loading"); // "loading" | "active" | "pending" | "error"
  const [dots, setDots] = useState("");

  /* ── animated dots while loading ── */
  useEffect(() => {
    if (status !== "loading") return;
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, [status]);

  /* ── check subscription ── */
  const checkStatus = async () => {
    setStatus("loading");
    setDots("");
    try {
      const { data } = await axios.get("/subscription-status", {
        withCredentials: true,
      });
      setStatus(data.status === "active" ? "active" : "pending");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { checkStatus(); }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #f8faff 100%)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 sm:p-10 text-center"
        style={{
          background: "#ffffff",
          border: "1.5px solid #e2e8f0",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >

        {/* ── Loading ── */}
        {status === "loading" && (
          <>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "#eff6ff" }}
            >
              <RefreshCw className="w-9 h-9 text-blue-500 animate-spin" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-2">
              Verifying Payment{dots}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Please wait while we confirm your subscription.
            </p>
          </>
        )}

        {/* ── Active ── */}
        {status === "active" && (
          <>
            <div
              className="w-full h-1.5 rounded-full mb-8"
              style={{ background: "linear-gradient(90deg, #22c55e, #16a34a, #22c55e)" }}
            />
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 8px 24px rgba(34,197,94,0.35)",
              }}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: "#dcfce7", color: "#15803d" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Subscription Active
            </span>

            <h2
              className="font-extrabold text-slate-900 mb-3 leading-tight"
              style={{ fontSize: "clamp(1.4rem, 4vw, 1.8rem)" }}
            >
              You're all set!
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-7">
              Your subscription is now active. Start managing your Google reviews
              and protect your reputation today.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["Smart QR Ready", "Unlimited Scans", "Analytics Live"].map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}
                >
                  <Zap className="w-3 h-3" />
                  {f}
                </span>
              ))}
            </div>

            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full inline-flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 4px 16px rgba(34,197,94,0.35)",
              }}
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* ── Pending ── */}
        {status === "pending" && (
          <>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 8px 24px rgba(245,158,11,0.3)",
              }}
            >
              <Clock className="w-10 h-10 text-white" />
            </div>

            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: "#fef3c7", color: "#92400e" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Payment Pending
            </span>

            <h2
              className="font-extrabold text-slate-900 mb-3 leading-tight"
              style={{ fontSize: "clamp(1.4rem, 4vw, 1.8rem)" }}
            >
              Almost there!
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Your payment is being processed. This usually takes a few minutes.
              Please check again shortly.
            </p>

            <button
              onClick={checkStatus}
              className="w-full inline-flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 4px 16px rgba(245,158,11,0.3)",
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Check Again
            </button>
          </>
        )}

        {/* ── Error ── */}
        {status === "error" && (
          <>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "#fef2f2" }}
            >
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>

            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: "#fef2f2", color: "#b91c1c" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Something went wrong
            </span>

            <h2
              className="font-extrabold text-slate-900 mb-3 leading-tight"
              style={{ fontSize: "clamp(1.4rem, 4vw, 1.8rem)" }}
            >
              Couldn't verify payment
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              We had trouble connecting to the server. Please try again or contact
              support if the issue persists.
            </p>

            <button
              onClick={checkStatus}
              className="w-full inline-flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </>
        )}

        {/* Bottom note */}
        {status !== "loading" && (
          <p className="text-xs text-slate-400 mt-6">
            Need help?{" "}
            <a href="mailto:support@infravion.com" className="text-indigo-500 hover:underline font-medium">
              Contact support
            </a>
          </p>
        )}

      </div>
    </div>
  );
}