"use client";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../llb/axios";

export default function FeedbackLanding() {
  const { qrId } = useParams();   // This is your randomId

  // Feedback States
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  // Custom Settings
  const [customURL, setCustomURL] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [redirectFromRating, setRedirectFromRating] = useState(4);
  const [logoUrl, setLogoUrl] = useState("");

  // Activation States
  const [isActivated, setIsActivated] = useState(true);
  const [activationMessage, setActivationMessage] = useState("");

  // Activate Form State (Only 3 fields as per your request)
  const [activateForm, setActivateForm] = useState({
    username: "",
    email: "",
    randomId: qrId || "",   // Auto-filled from URL
  });
  const [activating, setActivating] = useState(false);

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  // Fetch custom settings
  useEffect(() => {
    const fetchSettings = async () => {
      if (!qrId) return;

      try {
        const { data } = await axios.get(`/custom-url/get-url/${qrId}`);

        if (data.success && data.data) {
          setIsActivated(true);
          setCustomURL(data.data.url || "");
          setCompanyName(data.data.companyName || "Our Service");
          setRedirectFromRating(data.data.redirectFromRating ?? 4);
          setLogoUrl(data.data.logoUrl || "");
        } 
        else if (!data.success && data.message?.toLowerCase().includes("activate")) {
          setIsActivated(false);
          setActivationMessage(data.message || "Please activate your ID, contact customer support");
        } 
        else {
          setIsActivated(true);
          setCompanyName("Our Service");
          setRedirectFromRating(4);
        }
      } catch (err) {
        console.log("Error fetching settings:", err);
        setIsActivated(true);
        setCompanyName("Our Service");
        setRedirectFromRating(4);
      }
    };

    fetchSettings();
  }, [qrId]);

  // Handle Activate QR - Calls your backend API
  const handleActivateQR = async (e) => {
    e.preventDefault();

    if (!activateForm.username || !activateForm.email) {
      toast.error("Username and Email are required");
      return;
    }

    setActivating(true);
    try {
      const payload = {
        username: activateForm.username.trim(),
        email: activateForm.email.trim().toLowerCase(),
        randomId: qrId,                    // Taken from URL params (as you asked)
      };

      const { data } = await axios.post("/admin/create-user", payload);

      if (data.success) {
        toast.success("QR Activated Successfully! Account created.");
        
        // Refresh the UI to show feedback page
        setIsActivated(true);
        
        // Optional: Reset form
        setActivateForm({ username: "", email: "", randomId: qrId || "" });
      } else {
        toast.error(data.message || "Activation failed");
      }
    } catch (error) {
      console.error("Activation error:", error);
      toast.error(error.response?.data?.message || "Failed to activate QR. Please try again.");
    } finally {
      setActivating(false);
    }
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);

    if (rating >= 4) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 600);
    }

    if (rating >= redirectFromRating && customURL) {
      setTimeout(() => window.location.href = customURL, 800);
    } else {
      setTimeout(() => setShowModal(true), 300);
    }
  };

  const handleStarHover = (rating) => setHoveredRating(rating);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRating) {
      toast.error("Please select a rating");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        qrId,
        name: form.name.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        rating: selectedRating,
      };

      const { data } = await axios.post("/save-feedback", payload);

      if (data.success) {
        toast.success(data.message || "Thank you for your feedback!");
        setShowModal(false);
        setForm({ name: "", phone: "", message: "" });
        setSelectedRating(0);
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const ExplodingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full ${isExploding ? "animate-explode" : ""}`}
          style={{
            left: "50%",
            top: "50%",
            animationDelay: `${i * 0.05}s`,
            "--tx": `${Math.random() * 300 - 150}px`,
            "--ty": `${Math.random() * 300 - 150}px`,
          }}
        />
      ))}
    </div>
  );

  // ==================== NOT ACTIVATED SCREEN ====================
  if (!isActivated) {
    return (
      <>
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">

              {/* Header */}
              <div className="text-center mb-10">
                <div className="mx-auto w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mb-6 animate-bounce">
                  <ExclamationTriangleIcon className="w-12 h-12 text-red-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-red-700 mb-3 animate-slideDown">
                  Your QR ID is Not Activated
                </h1>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed animate-slideDown delay-200">
                  {activationMessage}
                </p>
              </div>

              {/* Activate Form */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  Activate This QR Code
                </h2>

                <form onSubmit={handleActivateQR} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={activateForm.username}
                      onChange={(e) => setActivateForm({ ...activateForm, username: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-300 focus:border-red-500 outline-none"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={activateForm.email}
                      onChange={(e) => setActivateForm({ ...activateForm, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-300 focus:border-red-500 outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* randomId is auto-filled and disabled */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">QR ID</label>
                    <input
                      type="text"
                      value={qrId || ""}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-2xl text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={activating}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center justify-center"
                  >
                    {activating ? "Activating..." : "Activate QR Code"}
                  </button>
                </form>
              </div>

              <div className="text-center text-xs text-gray-500">
                QR ID: <span className="font-mono">{qrId}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-8 text-center">
              Powered by <span className="font-bold text-indigo-600">VocalHeartInfoTech</span>
            </p>
          </div>
        </div>
      </>
    );
  }

  // ==================== NORMAL FEEDBACK SCREEN ====================
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <h2 className="text-xl font-bold text-indigo-700 mb-3">{companyName}</h2>

          <div className="bg-white rounded-3xl shadow-2xl p-6 relative overflow-hidden">
            {logoUrl && (
              <div
                className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-16 z-0"
                style={{ backgroundImage: `url(${logoUrl})` }}
              />
            )}
            <div className="relative z-10">
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                How was your experience with {companyName}?
              </h2>

              <div className="relative mb-6">
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-all duration-300 transform hover:scale-110 active:scale-95"
                    >
                      {(hoveredRating >= star || selectedRating >= star) ? (
                        <StarIcon className="w-10 h-10 text-yellow-400 drop-shadow-md" />
                      ) : (
                        <StarOutline className="w-10 h-10 text-gray-300 hover:text-yellow-300" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-4 h-8">
                  {(hoveredRating > 0 || selectedRating > 0) && (
                    <p className="text-base font-semibold text-gray-700 animate-fadeIn">
                      {ratingLabels[hoveredRating || selectedRating]}
                    </p>
                  )}
                </div>

                {isExploding && <ExplodingParticles />}
              </div>

              <p className="text-sm text-gray-600">Tap a star to rate your experience</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-10">
            Powered by <span className="font-bold text-indigo-600">VocalHeartInfoTech</span>
          </p>
        </div>
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-4 sm:items-center">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto animate-scaleIn">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">We Value Your Feedback</h3>
                  <p className="text-sm text-gray-600 mt-1">Help us improve our service</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-2xl text-gray-400 hover:text-gray-700">×</button>
              </div>

              <div className="flex flex-col items-center gap-3 mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <StarIcon key={s} className={`w-8 h-8 ${s <= selectedRating ? "text-yellow-500" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="font-bold text-gray-800">{ratingLabels[selectedRating]}</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                  <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300" placeholder="Phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
                  <textarea required maxLength={300} rows={4} value={form.message} 
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 resize-none" 
                    placeholder="Your feedback..." />
                  <p className="text-right text-xs text-gray-500 mt-1">{form.message.length}/300</p>
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-70">
                  {submitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes explode { 0% { transform: translate(0,0) scale(1); opacity:1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity:0; } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }

        .animate-explode { animation: explode 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-out forwards; }
        .animate-slideDown.delay-200 { animation-delay: 200ms; }
        .animate-bounce { animation: bounce 1.2s infinite; }
      `}</style>
    </>
  );
}