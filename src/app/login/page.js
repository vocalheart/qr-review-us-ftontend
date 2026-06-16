// app/login/page.js
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import {
  Eye, EyeOff, Mail, Lock, ArrowRight, Loader2,
  X, KeyRound, ShieldCheck, RefreshCw, CheckCircle2,
  AlertCircle,
} from "lucide-react";

/* ─── Schemas ─────────────────────────────── */
const loginSchema = z.object({
  email:    z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetSchema = z
  .object({
    otp:             z.string().min(4, "OTP must be at least 4 characters"),
    newPassword:     z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine(d => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

/* ─── Reusable input wrapper ──────────────── */
function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{msg}
    </p>
  );
}

/* ─── Page ────────────────────────────────── */
export default function LoginPage() {
  const { login }  = useAuth();
  const router     = useRouter();

  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);

  // forgot-password dialog
  const [dialogOpen,  setDialogOpen]  = useState(false);
  const [step,        setStep]        = useState(1);       // 1=email, 2=otp+reset
  const [fpEmail,     setFpEmail]     = useState("");
  const [otpLoading,  setOtpLoading]  = useState(false);
  const [resetLoading,setResetLoading]= useState(false);

  /* ── Forms ── */
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: regForgot, handleSubmit: hsForgot,
    formState: { errors: eForgot },
  } = useForm({ resolver: zodResolver(forgotSchema) });

  const {
    register: regReset, handleSubmit: hsReset,
    formState: { errors: eReset }, reset: resetForm,
    getValues: getResetValues,
  } = useForm({ resolver: zodResolver(resetSchema) });

  /* ── Handlers ── */
  const onLogin = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Login successful! Redirecting…");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
    } finally { setLoading(false); }
  };

  const onSendOtp = async (data) => {
    setOtpLoading(true);
    try {
      const res = await fetch("https://api.reviewbadhao.com/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: data.email }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to send OTP");
      setFpEmail(data.email);
      setStep(2);
      toast.success("OTP sent! Check your inbox.");
    } catch (err) {
      toast.error(err.message || "Failed to send OTP.");
    } finally { setOtpLoading(false); }
  };

  const onResetPassword = async (data) => {
    setResetLoading(true);
    try {
      const res = await fetch("https://api.reviewbadhao.com/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp: data.otp, newPassword: data.newPassword }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to reset password");
      toast.success("Password reset successful! Please login.");
      closeDialog();
    } catch (err) {
      toast.error(err.message || "Reset failed.");
    } finally { setResetLoading(false); }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setStep(1);
    setFpEmail("");
    resetForm();
  };

  const resendOtp = () => {
    hsForgot(onSendOtp)();
  };

  /* ── Input class ── */
  const inp = "w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400";

  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { fontSize: "13px" } }} />

      {/* ══════════════ LOGIN PAGE ══════════════ */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3 sm:px-4 py-10 sm:py-16">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-10">

            {/* Logo */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-11 h-11 sm:w-13 sm:h-13 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1.5">
                Sign in to manage your reviews and feedback
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onLogin)} className="space-y-4 sm:space-y-5">

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className={`${inp} pl-9`}
                  />
                </div>
                <FieldError msg={errors.email?.message} />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    {...register("password")}
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    className={`${inp} pl-9 pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <FieldError msg={errors.password?.message} />
              </div>

              {/* Forgot password link */}
              <div className="text-right -mt-1">
                <button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                  className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium transition"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-60 shadow-sm shadow-indigo-200"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" />Signing in…</>
                  : <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>
                }
              </button>
            </form>

            {/* Divider + Sign up */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold transition">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-5 px-2">
            By signing in you agree to our{" "}
            <a href="#" className="text-indigo-600 hover:underline">Terms</a> and{" "}
            <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* ══════════════ FORGOT PASSWORD DIALOG ══════════════ */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
            style={{ animation: "slideUp 0.3s cubic-bezier(0.32,0.72,0,1)" }}
          >
            {/* Dialog header */}
            <div className="bg-indigo-600 px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {step === 1 ? "Forgot password?" : "Reset password"}
                </h2>
                <p className="text-xs text-indigo-200 mt-0.5">
                  {step === 1 ? "Enter your email to receive an OTP" : `OTP sent to ${fpEmail}`}
                </p>
              </div>
              <button
                onClick={closeDialog}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-indigo-200 hover:bg-white/20 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step indicators */}
            <div className="flex border-b border-gray-100">
              {["Email", "Reset"].map((label, i) => (
                <div key={label} className={`flex-1 py-2.5 text-center text-xs font-semibold border-b-2 transition-colors ${
                  step === i + 1
                    ? "border-indigo-600 text-indigo-600"
                    : step > i + 1
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-400"
                }`}>
                  <span className="flex items-center justify-center gap-1.5">
                    {step > i + 1
                      ? <CheckCircle2 className="w-3.5 h-3.5" />
                      : <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold" style={{
                          borderColor: step === i + 1 ? "#4f46e5" : "#d1d5db",
                          color: step === i + 1 ? "#4f46e5" : "#9ca3af",
                        }}>{i + 1}</span>
                    }
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Dialog body */}
            <div className="p-5 sm:p-6">

              {/* ── STEP 1: Email ── */}
              {step === 1 && (
                <form onSubmit={hsForgot(onSendOtp)} className="space-y-4">
                  <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-xs text-indigo-700">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
                    <span>We'll send a one-time password to your email. Valid for 5 minutes.</span>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        {...regForgot("email")}
                        type="email"
                        placeholder="you@example.com"
                        className={`${inp} pl-9`}
                      />
                    </div>
                    <FieldError msg={eForgot.email?.message} />
                  </div>

                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-60 shadow-sm shadow-indigo-200"
                  >
                    {otpLoading
                      ? <><Loader2 className="w-4 h-4 animate-spin" />Sending OTP…</>
                      : <><span>Send OTP</span><ArrowRight className="w-4 h-4" /></>
                    }
                  </button>
                </form>
              )}

              {/* ── STEP 2: OTP + new password ── */}
              {step === 2 && (
                <form onSubmit={hsReset(onResetPassword)} className="space-y-4">

                  {/* OTP */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      OTP Code
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        {...regReset("otp")}
                        type="text"
                        maxLength={6}
                        placeholder="6-digit OTP"
                        className={`${inp} pl-9 font-mono tracking-widest text-base`}
                      />
                    </div>
                    <FieldError msg={eReset.otp?.message} />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        {...regReset("newPassword")}
                        type="password"
                        placeholder="At least 6 characters"
                        className={`${inp} pl-9`}
                      />
                    </div>
                    <FieldError msg={eReset.newPassword?.message} />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        {...regReset("confirmPassword")}
                        type="password"
                        placeholder="Repeat new password"
                        className={`${inp} pl-9`}
                      />
                    </div>
                    <FieldError msg={eReset.confirmPassword?.message} />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-2.5 sm:py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition active:scale-[0.98]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-60 shadow-sm shadow-indigo-200"
                    >
                      {resetLoading
                        ? <><Loader2 className="w-4 h-4 animate-spin" />Resetting…</>
                        : <><CheckCircle2 className="w-4 h-4" />Reset</>
                      }
                    </button>
                  </div>

                  {/* Resend OTP */}
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={otpLoading}
                    className="w-full flex items-center justify-center gap-1.5 text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium transition disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${otpLoading ? "animate-spin" : ""}`} />
                    {otpLoading ? "Sending…" : "Didn't receive OTP? Resend"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <style>{`
            @keyframes slideUp {
              from { transform: translateY(40px); opacity: 0; }
              to   { transform: translateY(0);    opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}