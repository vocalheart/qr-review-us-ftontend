"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import axios from "../llb/axios";
import SignupImage from "../../../public/signupimage.png";
import {
  User, Mail, Lock, Phone, Eye, EyeOff,
  Loader2, ArrowRight, RefreshCw, CheckCircle2,
  ShieldCheck, KeyRound, AlertCircle, ChevronLeft,
} from "lucide-react";

/* ─── Schema ─────────────────────────────── */
const signupSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email:    z.string().email("Invalid email address"),
  phone:    z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/* ─── Field error ─────────────────────────── */
function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{msg}
    </p>
  );
}

/* ─── Input class ─────────────────────────── */
const inp = "w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400";

/* ─── Page ────────────────────────────────── */
export default function SignupPage() {
  const router = useRouter();

  const [showPw,    setShowPw]    = useState(false);
  const [step,      setStep]      = useState(1);   // 1 = form, 2 = otp
  const [loading,   setLoading]   = useState(false);
  const [otp,       setOtp]       = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  /* ── Step 1: send OTP ── */
  const onSubmitSignup = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/signup", data, { withCredentials: true });
      if (res.data.success) {
        setEmailForOtp(data.email);
        setStep(2);
        toast.success("OTP sent to your email!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  /* ── Step 2: verify OTP ── */
  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) { toast.error("Please enter 6-digit OTP"); return; }
    setLoading(true);
    try {
      const res = await axios.post("/verify-otp", { otp }, { withCredentials: true });
      if (res.data.success) {
        toast.success("Account created successfully!");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally { setLoading(false); }
  };

  /* ── Resend OTP ── */
  const resendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/resend-otp", {}, { withCredentials: true });
      if (res.data.success) { toast.success("New OTP sent!"); setOtp(""); }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally { setLoading(false); }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { fontSize: "13px" } }} />

      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">

        {/* ══ LEFT: FORM ══ */}
        <div className="flex-1 flex items-center justify-center px-3 sm:px-4 py-10 sm:py-16 lg:py-0 lg:px-8 xl:px-12">
          <div className="w-full max-w-md">

            {/* Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-10">

              {/* Logo */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="w-11 h-11 sm:w-13 sm:h-13 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              {/* Step indicators */}
              <div className="flex items-center justify-center gap-2 mb-5 sm:mb-6">
                {["Account", "Verify"].map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      step === i + 1 ? "text-indigo-600" : step > i + 1 ? "text-green-600" : "text-gray-300"
                    }`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                        step > i + 1
                          ? "bg-green-500 border-green-500 text-white"
                          : step === i + 1
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-200 text-gray-300"
                      }`}>
                        {step > i + 1 ? "✓" : i + 1}
                      </div>
                      <span className="hidden sm:inline">{label}</span>
                    </div>
                    {i < 1 && (
                      <div className={`w-8 sm:w-12 h-0.5 rounded-full transition-colors ${step > 1 ? "bg-green-400" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Title */}
              <div className="text-center mb-5 sm:mb-7">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {step === 1 ? "Create account" : "Verify your email"}
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5">
                  {step === 1
                    ? "Join thousands protecting their reputation"
                    : `OTP sent to ${emailForOtp}`}
                </p>
              </div>

              {/* ── STEP 1: Signup form ── */}
              {step === 1 && (
                <form onSubmit={handleSubmit(onSubmitSignup)} className="space-y-4 sm:space-y-5">

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input {...register("username")} placeholder="Your full name" className={`${inp} pl-9`} />
                    </div>
                    <FieldError msg={errors.username?.message} />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input {...register("email")} type="email" placeholder="you@example.com" className={`${inp} pl-9`} />
                    </div>
                    <FieldError msg={errors.email?.message} />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input {...register("phone")} type="tel" maxLength={10} placeholder="9876543210" className={`${inp} pl-9`} />
                    </div>
                    <FieldError msg={errors.phone?.message} />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        {...register("password")}
                        type={showPw ? "text" : "password"}
                        placeholder="At least 6 characters"
                        className={`${inp} pl-9 pr-10`}
                      />
                      <button type="button" onClick={() => setShowPw(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <FieldError msg={errors.password?.message} />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-60 shadow-sm shadow-indigo-200 mt-1"
                  >
                    {loading
                      ? <><Loader2 className="w-4 h-4 animate-spin" />Sending OTP…</>
                      : <><span>Send OTP</span><ArrowRight className="w-4 h-4" /></>
                    }
                  </button>
                </form>
              )}

              {/* ── STEP 2: OTP ── */}
              {step === 2 && (
                <form onSubmit={verifyOtp} className="space-y-4 sm:space-y-5">

                  {/* Info banner */}
                  <div className="flex items-start gap-2.5 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-xs text-indigo-700">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
                    <span>Check your inbox for a 6-digit OTP. Valid for 5 minutes.</span>
                  </div>

                  {/* OTP input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Enter OTP</label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="6-digit OTP"
                        className={`${inp} pl-9 font-mono tracking-widest text-base sm:text-lg text-center`}
                      />
                    </div>
                    {otp.length > 0 && otp.length < 6 && (
                      <p className="mt-1.5 text-xs text-amber-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />{6 - otp.length} more digits needed
                      </p>
                    )}
                  </div>

                  {/* Verify button */}
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-60 shadow-sm shadow-indigo-200"
                  >
                    {loading
                      ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying…</>
                      : <><CheckCircle2 className="w-4 h-4" />Verify & Create Account</>
                    }
                  </button>

                  {/* Resend */}
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-1.5 text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium transition disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    {loading ? "Sending…" : "Didn't receive OTP? Resend"}
                  </button>

                  {/* Back */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-gray-700 font-medium transition"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Back to signup
                  </button>
                </form>
              )}

              {/* Sign in link */}
              {step === 1 && (
                <div className="mt-6 sm:mt-8 text-center">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition">
                      Sign in
                    </Link>
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-5 px-2">
              By signing up you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:underline">Terms</a> and{" "}
              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* ══ RIGHT: IMAGE (lg only) ══ */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 xl:p-12 bg-white border-l border-gray-100">
          <div className="text-center max-w-sm xl:max-w-md">
            <Image
              src={SignupImage}
              alt="Signup illustration"
              width={400}
              height={400}
              className="mx-auto drop-shadow-xl"
              priority
            />
            <h2 className="text-xl xl:text-2xl font-extrabold text-gray-900 mt-8 tracking-tight">
              Start protecting your reputation today
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Join thousands of businesses managing their online presence.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-6">
              {[["10k+", "Users"], ["4.9★", "Rating"], ["99%", "Uptime"]].map(([val, label]) => (
                <div key={label} className="text-center">
                  <p className="text-base font-extrabold text-indigo-600">{val}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}