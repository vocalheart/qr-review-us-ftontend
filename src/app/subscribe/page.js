"use client";

import { useState, useEffect, useRef } from "react";
import axios from "../llb/axios";

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [waitingForPayment, setWaitingForPayment] = useState(false);

  const pollingRef = useRef(null);
  const timeoutRef = useRef(null);

  // Detect iOS devices
  const isIOS = () => {
    if (typeof navigator === "undefined") return false;
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  useEffect(() => {
    checkSubscriptionStatus();

    // Auto check when user returns from payment tab (VERY IMPORTANT)
    const handleFocus = () => {
      if (waitingForPayment) {
        checkSubscriptionStatus();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && waitingForPayment) {
        checkSubscriptionStatus();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [waitingForPayment]);

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const checkSubscriptionStatus = async () => {
    try {
      const res = await axios.get("/subscription-status");
      const data = res.data;
      setSubscriptionStatus(data);

      // AUTO ACTIVATE WITHOUT REFRESH
      if (data?.status === "active") {
        stopPolling();
        setWaitingForPayment(false);
        setInfo("Payment successful! Activating your subscription...");

        // Small delay for better UX
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1200);
      }

      return data;
    } catch (err) {
      console.error("Error checking status:", err);
      return null;
    } finally {
      setCheckingStatus(false);
    }
  };

  // Smart polling (works even if user comes back from payment)
  const startPollingForPayment = () => {
    stopPolling();
    setWaitingForPayment(true);
    setInfo("Waiting for payment confirmation...");

    // Fast polling for first 30 seconds (real-time feel)
    pollingRef.current = setInterval(async () => {
      const status = await checkSubscriptionStatus();
      if (!status) return;

      if (status.status === "failed" || status.status === "cancelled") {
        stopPolling();
        setWaitingForPayment(false);
        setError("Payment failed or cancelled. Please try again.");
      }
    }, 3000);

    //  Safety timeout (10 min)
    timeoutRef.current = setTimeout(() => {
      stopPolling();
      setWaitingForPayment(false);
      setInfo("");
      setError("Payment verification timed out. Please try again.");
    }, 10 * 60 * 1000);
  };

  //  FINAL iOS + Desktop + Auto Refresh Safe Handler
  const startSubscription = async () => {
    try {
      setLoading(true);
      setError("");
      setInfo("");

      // iOS / Safari / WebView (BEST: redirect)
      if (isIOS()) {
        setInfo("Redirecting to secure payment...");

        const res = await axios.post("/create-subscription", {});

        if (res.data?.subscription?.short_url) {
          const paymentUrl = res.data.subscription.short_url;

          // Start polling BEFORE redirect (key fix)
          startPollingForPayment();

          // Redirect (never blocked on iOS)
          window.location.href = paymentUrl;
          return;
        } else {
          setError("Unable to start subscription. Please try again.");
          return;
        }
      }

      // Desktop / Android (anti-popup block)
      const paymentWindow = window.open("", "_blank");

      if (!paymentWindow) {
        setError("Popup blocked! Please allow popups and try again.");
        setLoading(false);
        return;
      }

      setInfo("Opening secure payment page...");

      // Call API after opening window (critical)
      const res = await axios.post("/create-subscription", {});

      if (res.data?.subscription?.short_url) {
        const paymentUrl = res.data.subscription.short_url;

        // Redirect opened window to payment
        paymentWindow.location.href = paymentUrl;

        // Start real-time polling
        startPollingForPayment();
      } else {
        paymentWindow.close();
        setError("Unable to start subscription. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError(
        err?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  //  Loading screen
  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Checking subscription status...
          </p>
        </div>
      </div>
    );
  }

  // ACTIVE SUBSCRIPTION UI (auto shows without refresh)
  if (subscriptionStatus?.status === "active") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            🎉 Subscription Activated
          </h1>

          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Days Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  {subscriptionStatus.daysRemaining || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hours Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  {subscriptionStatus.hoursRemaining || 0}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  // 💳 SUBSCRIBE UI
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-black mb-2">
          7-Day Premium Subscription
        </h1>

        <p className="text-gray-600 mb-6">
          Unlock all premium features for just ₹2 (7 days)
        </p>

        <div className="mb-6">
          <span className="text-4xl font-extrabold text-black">₹2</span>
          <span className="text-gray-500 text-lg"> / 7 days</span>
        </div>

        {waitingForPayment ? (
          <div className="w-full py-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
              <span className="font-semibold text-sm">
                Waiting for payment confirmation...
              </span>
            </div>
            <p className="text-xs mt-2">
              Complete the payment. Subscription will activate automatically
              (no refresh needed).
            </p>
          </div>
        ) : (
          <button
            onClick={startSubscription}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Opening Payment..." : "Start 7-Day Plan for ₹2"}
          </button>
        )}

        {info && (
          <p className="mt-4 text-indigo-600 text-sm font-medium">{info}</p>
        )}
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
