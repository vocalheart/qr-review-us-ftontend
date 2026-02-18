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

  // Detect iOS devices (Safari, Chrome iOS, WebView)
  const isIOS = () => {
    if (typeof navigator === "undefined") return false;
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  useEffect(() => {
    checkSubscriptionStatus();

    return () => {
      stopPolling();
    };
  }, []);

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
      setSubscriptionStatus(res.data);
      return res.data;
    } catch (err) {
      console.error("Error checking status:", err);
      return null;
    } finally {
      setCheckingStatus(false);
    }
  };

  //  Polling after payment window opened
  const startPollingForPayment = () => {
    stopPolling();
    setWaitingForPayment(true);
    setInfo("Waiting for payment confirmation...");

    pollingRef.current = setInterval(async () => {
      const status = await checkSubscriptionStatus();
      if (!status) return;

      //  Success
      if (status.status === "active") {
        stopPolling();
        setWaitingForPayment(false);
        setInfo("Payment successful! Redirecting to dashboard...");

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      }

      //  Failed / Cancelled
      if (status.status === "failed" || status.status === "cancelled") {
        stopPolling();
        setWaitingForPayment(false);
        setError("Payment failed or cancelled. Please try again.");
      }
    }, 4000);

    // ⏱ 10 min timeout safety
    timeoutRef.current = setTimeout(() => {
      stopPolling();
      setWaitingForPayment(false);
      setInfo("");
      setError("Payment verification timed out. Please refresh and try again.");
    }, 10 * 60 * 1000);
  };

  // FULL iOS + Desktop SAFE subscription handler
  const startSubscription = async () => {
    try {
      setLoading(true);
      setError("");
      setInfo("");

      //iOS → Direct redirect (most reliable)
      if (isIOS()) {
        setInfo("Redirecting to payment...");

        const res = await axios.post("/create-subscription", {});

        if (res.data?.subscription?.short_url) {
          const paymentUrl = res.data.subscription.short_url;

          // iOS NEVER block redirect
          window.location.href = paymentUrl;
          return;
        } else {
          setError("Unable to start subscription. Please try again.");
          return;
        }
      }

      //  Desktop / Android → Open blank window first (anti popup block)
      const paymentWindow = window.open("", "_blank");

      if (!paymentWindow) {
        setError("Popup blocked! Please allow popups and try again.");
        setLoading(false);
        return;
      }

      setInfo("Opening secure payment page...");
      // Call backend AFTER window opened (important)
      const res = await axios.post("/create-subscription", {});
      if (res.data?.subscription?.short_url) {
        const paymentUrl = res.data.subscription.short_url;
        // Redirect the already opened tab
        paymentWindow.location.href = paymentUrl;
        setInfo("Payment window opened. Complete payment to activate.");
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

  // Loading screen
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

  // ACTIVE SUBSCRIPTION UI
  if (subscriptionStatus?.status === "active") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            Active Subscription
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

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">
                <strong>Started:</strong>{" "}
                {subscriptionStatus.currentStart
                  ? new Date(
                      subscriptionStatus.currentStart
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Expires:</strong>{" "}
                {subscriptionStatus.currentEnd
                  ? new Date(
                      subscriptionStatus.currentEnd
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
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
              Complete the payment. This page will auto-activate.
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
