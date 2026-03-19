// app/login/page.js
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "../llb/axios";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  otp: z.string().min(4, "OTP must be at least 4 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: errorsReset },
    reset: resetForm,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (data) => {
    setOtpLoading(true);
    try {
      const response = await fetch(`https://api.reviewbadhao.com/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send OTP");
      }

      setForgotPasswordEmail(data.email);
      setForgotPasswordStep(2);
      toast.success("OTP sent to your email! Valid for 5 minutes.");
    } catch (err) {
      toast.error(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    setResetLoading(true);
    try {
      const response = await fetch(`https://api.reviewbadhao.com/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          otp: data.otp,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to reset password");
      }

      toast.success("Password reset successful! Please login with your new password.");
      closeForgotPasswordDialog();
    } catch (err) {
      toast.error(err.message || "Failed to reset password. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const closeForgotPasswordDialog = () => {
    setShowForgotPasswordDialog(false);
    setForgotPasswordStep(1);
    setForgotPasswordEmail("");
    resetForm();
  };

  return (
    <>
      <Toaster position="top-center" />

      {/* ==================== MAIN LOGIN FORM ==================== */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            {/* Logo */}
            <div className="flex justify-center mb-6 sm:mb-8 lg:mb-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-2 sm:mb-3">
              Welcome Back
            </h1>
            <p className="text-center text-xs sm:text-sm lg:text-base text-gray-600 mb-6 sm:mb-8 lg:mb-10">
              Sign in to manage your reviews and feedback
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 lg:space-y-6">
              {/* Email Field */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm lg:text-base"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 pr-10 sm:pr-12 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm lg:text-base"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition flex-shrink-0"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 lg:py-3.5 rounded-lg sm:rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg hover:shadow-xl text-xs sm:text-sm lg:text-base transform hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4">
              <button
                onClick={() => setShowForgotPasswordDialog(true)}
                className="block w-full text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition"
              >
                Forgot your password?
              </button>
              <p className="text-xs sm:text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-xs text-gray-500 mt-4 sm:mt-6 lg:mt-8 px-2">
            By signing in, you agree to our{" "}
            <a href="#" className="text-indigo-600 hover:underline transition">Terms</a> and{" "}
            <a href="#" className="text-indigo-600 hover:underline transition">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* ==================== FORGOT PASSWORD DIALOG ==================== */}
      {showForgotPasswordDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Dialog Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6 lg:p-8 rounded-t-2xl sm:rounded-t-3xl flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Reset Password</h2>
                <p className="text-xs sm:text-sm text-indigo-100 mt-1">
                  {forgotPasswordStep === 1 ? "Enter your email address" : "Enter OTP and new password"}
                </p>
              </div>
              <button
                onClick={closeForgotPasswordDialog}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 sm:p-2 transition flex-shrink-0"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {forgotPasswordStep === 1 ? (
                // Step 1: Email Input
                <form onSubmit={handleSubmitForgot(handleForgotPassword)} className="space-y-4 sm:space-y-5 lg:space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                      Email Address
                    </label>
                    <input
                      {...registerForgot("email")}
                      type="email"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm lg:text-base"
                      placeholder="Enter your registered email"
                    />
                    {errorsForgot.email && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        {errorsForgot.email.message}
                      </p>
                    )}
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="flex gap-2 sm:gap-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      <p className="text-xs sm:text-sm text-indigo-800">
                        We'll send a one-time password (OTP) to your email address. The OTP will be valid for 5 minutes.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg text-xs sm:text-sm lg:text-base"
                  >
                    {otpLoading ? (
                      <>
                        <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                // Step 2: OTP & New Password
                <form onSubmit={handleSubmitReset(handleResetPassword)} className="space-y-4 sm:space-y-5 lg:space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-green-800">OTP sent successfully!</p>
                        <p className="text-xs text-green-700 mt-0.5 break-all">{forgotPasswordEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/* OTP Field */}
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd"/>
                      </svg>
                      OTP Code
                    </label>
                    <input
                      {...registerReset("otp")}
                      type="text"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm sm:text-base lg:text-lg font-mono tracking-wider"
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                    />
                    {errorsReset.otp && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        {errorsReset.otp.message}
                      </p>
                    )}
                  </div>

                  {/* New Password Field */}
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                      New Password
                    </label>
                    <input
                      {...registerReset("newPassword")}
                      type="password"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm lg:text-base"
                      placeholder="Enter new password"
                    />
                    {errorsReset.newPassword && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        {errorsReset.newPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                      Confirm New Password
                    </label>
                    <input
                      {...registerReset("confirmPassword")}
                      type="password"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm lg:text-base"
                      placeholder="Confirm new password"
                    />
                    {errorsReset.confirmPassword && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        {errorsReset.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordStep(1)}
                      className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-50 transition text-xs sm:text-sm lg:text-base"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="flex-1 bg-indigo-600 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg text-xs sm:text-sm lg:text-base"
                    >
                      {resetLoading ? (
                        <>
                          <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span>Resetting...</span>
                        </>
                      ) : (
                        <>
                          <span>Reset</span>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSubmitForgot(handleForgotPassword)()}
                    className="w-full text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition"
                  >
                    Didn't receive OTP? Resend
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}