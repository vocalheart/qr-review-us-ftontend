"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";
import {UserIcon,EnvelopeIcon,PhoneIcon,KeyIcon,CheckIcon,XMarkIcon,ArrowPathIcon} from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/* Validation Schemas                                                   */
/* ------------------------------------------------------------------ */
const profileSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password required"),
    newPassword: z.string().min(6, "New password must be 6+ characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

/* ------------------------------------------------------------------ */
/* Main Page – Protected Only                                           */
/* ------------------------------------------------------------------ */
export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

/* ------------------------------------------------------------------ */
/* All UI + API Logic – NO Auth Checks Here                            */
/* ------------------------------------------------------------------ */
function ProfileContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profile, setProfile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(profileSchema) });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: pwdErrors },
    reset: resetPassword,
  } = useForm({ resolver: zodResolver(passwordSchema) });

  /* ------------------- Fetch Profile ------------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/profile", { withCredentials: true });
        if (data.success) {
          setProfile(data.profile);
          reset(data.profile);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [reset]);

  /* ------------------- Update Profile ------------------- */
  const onSubmit = async (formData) => {
    setSaving(true);
    try {
      const { data } = await axios.put("/profile", formData, {
        withCredentials: true,
      });
      if (data.success) {
        setProfile(data.profile);
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ------------------- Change Password ------------------- */
  const onPasswordChange = async (formData) => {
    try {
      const { data } = await axios.post("/change-password", formData, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("Password changed successfully!");
        setShowPasswordModal(false);
        resetPassword();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  /* ------------------- Loading State ------------------- */
  if (loading) return <ProfileSkeleton />;

  /* ------------------- Render UI ------------------- */
  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow">
              {profile?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              <p className="text-sm text-gray-500">Manage your account information</p>
            </div>
          </div>

          {/* Profile Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  {...register("username")}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Your full name"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  {...register("email")}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone (Optional)
              </label>
              <div className="relative">
                <PhoneIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  {...register("phone")}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium text-sm transition disabled:opacity-70"
            >
              {saving ? (
                <>
                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckIcon className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </form>

          {/* Action Buttons */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="w-full flex items-center justify-center gap-2 bg-yellow-50 text-yellow-700 px-5 py-3 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition font-medium text-xs sm:text-sm"
            >
              <KeyIcon className="w-4 h-4" />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  resetPassword();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handlePasswordSubmit(onPasswordChange)}
              className="space-y-4"
            >
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  {...registerPassword("oldPassword")}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="••••••"
                />
                {pwdErrors.oldPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {pwdErrors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  {...registerPassword("newPassword")}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="••••••"
                />
                {pwdErrors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {pwdErrors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  {...registerPassword("confirmPassword")}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="••••••"
                />
                {pwdErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {pwdErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 text-white py-2.5 rounded-lg hover:bg-yellow-600 transition font-medium text-xs sm:text-sm"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    resetPassword();
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium text-xs sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Loading Skeleton                                                     */
/* ------------------------------------------------------------------ */
const ProfileSkeleton = () => (
  <div className="max-w-xl mx-auto py-10 px-4 animate-pulse space-y-4">
    <div className="h-14 w-14 bg-gray-200 rounded-full" />
    <div className="bg-white rounded-2xl p-6 space-y-4 border border-gray-100">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-10 bg-gray-100 rounded-lg" />
      ))}
      <div className="h-10 bg-indigo-100 rounded-lg" />
    </div>
    <div className="h-12 bg-yellow-50 rounded-lg border border-yellow-100" />
  </div>
);