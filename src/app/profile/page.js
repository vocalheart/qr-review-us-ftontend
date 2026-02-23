"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";
import {
  User, Mail, Phone, Key, Check, X, Loader2,
  Shield, Eye, EyeOff, Lock, Save,
} from "lucide-react";

/* ── Schemas ─────────────────────────────────────────────────────── */
const profileSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Current password required"),
    newPassword: z.string().min(6, "New password must be 6+ characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

/* ── Main Page ───────────────────────────────────────────────────── */
export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

/* ── Content ─────────────────────────────────────────────────────── */
function ProfileContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } =
    useForm({ resolver: zodResolver(profileSchema) });

  const {
    register: rPwd, handleSubmit: hPwd,
    formState: { errors: pwdErrors }, reset: resetPwd, watch: watchPwd,
  } = useForm({ resolver: zodResolver(passwordSchema) });

  /* ── Fetch ── */
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/profile", { withCredentials: true });
        if (data.success) { setProfile(data.profile); reset(data.profile); }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load profile");
      } finally { setLoading(false); }
    })();
  }, [reset]);

  /* ── Update Profile ── */
  const onSubmit = async (fd) => {
    setSaving(true);
    try {
      const { data } = await axios.put("/profile", fd, { withCredentials: true });
      if (data.success) { setProfile(data.profile); toast.success("Profile updated!"); }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally { setSaving(false); }
  };

  /* ── Change Password ── */
  const onPasswordChange = async (fd) => {
    setPwdLoading(true);
    try {
      const { data } = await axios.post("/change-password", fd, { withCredentials: true });
      if (data.success) {
        toast.success("Password changed successfully!");
        setShowPasswordModal(false);
        resetPwd();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    } finally { setPwdLoading(false); }
  };

  if (loading) return <ProfileSkeleton />;

  const initials = profile?.username?.charAt(0).toUpperCase() || "U";
  const newPwd = watchPwd("newPassword") || "";
  const strength = newPwd.length === 0 ? 0 : newPwd.length < 6 ? 1 : newPwd.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Fair", "Strong"];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-500"];

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: "12px", fontSize: "14px" } }} />

      <div className="min-h-screen bg-slate-50">
        {/* ── Page Header ── */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">My Profile</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your personal information and security</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* ── Avatar Card ── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-slate-900 truncate">{profile?.username || "—"}</h2>
              <p className="text-sm text-slate-500 truncate">{profile?.email || "—"}</p>
              {profile?.phone && (
                <p className="text-sm text-slate-400 mt-0.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {profile.phone}
                </p>
              )}
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full shrink-0">
              <Check className="w-3.5 h-3.5" />
              Verified
            </div>
          </div>

          {/* ── Profile Form ── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Personal Information</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("username")}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.username
                        ? "border-red-300 focus:ring-red-200"
                        : "border-slate-200 focus:ring-indigo-200 focus:border-indigo-400"
                    }`}
                    placeholder="Your full name"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("email")}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-300 focus:ring-red-200"
                        : "border-slate-200 focus:ring-indigo-200 focus:border-indigo-400"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Phone <span className="text-slate-400 normal-case font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("phone")}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Save */}
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="w-4 h-4" /> Save Changes</>
                )}
              </button>
            </form>
          </div>

          {/* ── Security Card ── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Security</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Password</p>
                  <p className="text-xs text-slate-400 mt-0.5">Last changed: unknown</p>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
                >
                  <Key className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          Password Modal
      ══════════════════════════════════════ */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Lock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Change Password</h2>
                  <p className="text-xs text-slate-400">Keep your account secure</p>
                </div>
              </div>
              <button
                onClick={() => { setShowPasswordModal(false); resetPwd(); }}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={hPwd(onPasswordChange)} className="p-6 space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    {...rPwd("oldPassword")}
                    className={`w-full px-4 py-3 pr-10 border rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      pwdErrors.oldPassword
                        ? "border-red-300 focus:ring-red-200"
                        : "border-slate-200 focus:ring-amber-200 focus:border-amber-400"
                    }`}
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowOld(!showOld)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {pwdErrors.oldPassword && (
                  <p className="text-red-500 text-xs mt-1.5">{pwdErrors.oldPassword.message}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    {...rPwd("newPassword")}
                    className={`w-full px-4 py-3 pr-10 border rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      pwdErrors.newPassword
                        ? "border-red-300 focus:ring-red-200"
                        : "border-slate-200 focus:ring-amber-200 focus:border-amber-400"
                    }`}
                    placeholder="Min. 6 characters"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength Meter */}
                {newPwd.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map((s) => (
                        <div
                          key={s}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            strength >= s ? strengthColor[strength] : "bg-slate-100"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs font-medium ${
                      strength === 1 ? "text-red-500" : strength === 2 ? "text-amber-500" : "text-emerald-600"
                    }`}>
                      {strengthLabel[strength]}
                    </p>
                  </div>
                )}
                {pwdErrors.newPassword && (
                  <p className="text-red-500 text-xs mt-1.5">{pwdErrors.newPassword.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    {...rPwd("confirmPassword")}
                    className={`w-full px-4 py-3 pr-10 border rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      pwdErrors.confirmPassword
                        ? "border-red-300 focus:ring-red-200"
                        : "border-slate-200 focus:ring-amber-200 focus:border-amber-400"
                    }`}
                    placeholder="Repeat new password"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {pwdErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1.5">{pwdErrors.confirmPassword.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={pwdLoading}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-70"
                >
                  {pwdLoading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>
                    : <><Check className="w-4 h-4" /> Update Password</>}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowPasswordModal(false); resetPwd(); }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
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

/* ── Skeleton ──────────────────────────────────────────────────────── */
const ProfileSkeleton = () => (
  <div className="min-h-screen bg-slate-50 animate-pulse">
    <div className="bg-white border-b border-slate-200 px-6 py-6">
      <div className="h-8 bg-slate-200 rounded-xl w-40 mb-2" />
      <div className="h-4 bg-slate-100 rounded w-56" />
    </div>
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-5">
        <div className="w-20 h-20 bg-slate-200 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-slate-200 rounded w-36" />
          <div className="h-4 bg-slate-100 rounded w-48" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-xl" />
        ))}
        <div className="h-12 bg-indigo-100 rounded-xl" />
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 h-20" />
    </div>
  </div>
);