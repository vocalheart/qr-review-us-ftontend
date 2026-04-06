"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "../llb/axios";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import SignupImage from "../../../public/signupimage.png";

const signupSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1 = Form, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Step 1: Send OTP
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
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/verify-otp", { otp }, { withCredentials: true });

      if (res.data.success) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/resend-otp", {}, { withCredentials: true });
      if (res.data.success) {
        toast.success("New OTP sent!");
        setOtp(""); // Clear previous OTP
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT: FORM */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 py-12 sm:py-16 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100"
          >
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-3xl">★</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              {step === 1 ? "Create Account" : "Verify OTP"}
            </h1>
            <p className="text-center text-gray-600 mb-8">
              {step === 1
                ? "Join thousands protecting their reputation"
                : `Enter OTP sent to ${emailForOtp}`}
            </p>

            {/* ===================== STEP 1: SIGNUP FORM ===================== */}
            {step === 1 && (
              <form onSubmit={handleSubmit(onSubmitSignup)} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <UserIcon className="w-5 h-5 text-indigo-600" />
                    Full Name
                  </label>
                  <input
                    {...register("username")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Enter your full name"
                  />
                  {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <EnvelopeIcon className="w-5 h-5 text-indigo-600" />
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <PhoneIcon className="w-5 h-5 text-indigo-600" />
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <LockClosedIcon className="w-5 h-5 text-indigo-600" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </motion.button>
              </form>
            )}

            {/* ===================== STEP 2: OTP VERIFICATION ===================== */}
            {step === 2 && (
              <form onSubmit={verifyOtp} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Enter 6-digit OTP</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center text-3xl tracking-widest py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="123456"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold disabled:opacity-70"
                >
                  {loading ? "Verifying..." : "Verify OTP & Create Account"}
                </motion.button>

                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={loading}
                  className="w-full text-indigo-600 font-medium hover:underline"
                >
                  Resend OTP
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-gray-500 hover:text-gray-700"
                >
                  ← Back to Signup
                </button>
              </form>
            )}

            {step === 1 && (
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </motion.div>
        </div>

        {/* RIGHT SIDE IMAGE (unchanged) */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-bl from-indigo-50 to-white">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
            <Image src={SignupImage} alt="Signup" width={400} height={400} className="mx-auto drop-shadow-2xl" priority />
            <h2 className="text-2xl font-bold text-gray-900 mt-8">Start protecting your reputation today</h2>
          </motion.div>
        </div>
      </div>
    </>
  );
}