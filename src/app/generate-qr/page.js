"use client";
import { useEffect, useState } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  QrCode, Link2, Trash2, RefreshCw, Check, AlertTriangle,
  Download, Building2, Image as ImageIcon, Star, ChevronDown,
  ChevronUp, Palette, Type, Settings2, Loader2, Copy,
} from "lucide-react";

export default function QRPage() {
  return <ProtectedRoute><QRContent /></ProtectedRoute>;
}

/* ── helpers ─────────────────────────────────────────────── */
function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}
function getContrastColor(hex) {
  const [r, g, b] = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155 ? "#000000" : "#ffffff";
}
function getHue(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max === min) return 0;
  let h = max === r ? ((g - b) / (max - min)) * 60
        : max === g ? (2 + (b - r) / (max - min)) * 60
        :             (4 + (r - g) / (max - min)) * 60;
  return h < 0 ? h + 360 : h;
}
function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ── templates ───────────────────────────────────────────── */
const TEMPLATES = [
  { name: "Professional Navy", backgroundColor: "#023e8a", qrColor: "#000000", textColor: "#caf0f8", headerText: "Share Your Experience on Google", footerText: "Your Opinion Matters!", customText: "Scan to leave a review", showStars: true, gradientBackground: false, showButton: true, buttonText: "Leave Review", buttonColor: "#0096c7", decorativeStars: false, qrBorderRadius: 18, showGoogleLogo: true },
  { name: "Golden Hour", gradientBackground: true, gradientColor1: "#f7b733", gradientColor2: "#fc4a1a", qrColor: "#000000", textColor: "#ffffff", headerText: "Rate Your Experience", footerText: "Thank You! ⭐", customText: "Scan to leave a review", showStars: true, showButton: true, buttonText: "Leave a Review", buttonColor: "#ffffff", decorativeStars: false, qrBorderRadius: 28, showGoogleLogo: true },
  { name: "Electric Blue", backgroundColor: "#0077b6", qrColor: "#000000", textColor: "#ffffff", headerText: "Leave Us a Google Review!", footerText: "Your Feedback Helps Us! 💙", customText: "Scan to review", showStars: true, showButton: true, buttonText: "Review Now", buttonColor: "#00b4d8", decorativeStars: false, qrBorderRadius: 22, showGoogleLogo: true },
  { name: "Cherry Blossom", gradientBackground: true, gradientColor1: "#f72585", gradientColor2: "#b5179e", qrColor: "#000000", textColor: "#ffffff", headerText: "We'd Love Your Feedback!", footerText: "Thank You! 🌸", customText: "Scan the QR code", showStars: true, showButton: false, decorativeStars: true, qrBorderRadius: 30, showGoogleLogo: true },
  { name: "Coral Sunset", backgroundColor: "#ff6b6b", qrColor: "#000000", textColor: "#ffffff", headerText: "Leave Us a Google Review!", footerText: "Your Feedback is Valuable! ❤️", customText: "Scan the QR code to review", showStars: true, showButton: true, buttonText: "Write Review", buttonColor: "#2d3436", decorativeStars: false, qrBorderRadius: 25, showGoogleLogo: true },
];

const DEFAULTS = {
  qrColor: "#000000", backgroundColor: "#ffffff", textColor: "#000000",
  headerText: "Share Your Feedback on Google!", footerText: "We Value Your Opinion!",
  customText: "Scan the QR code to leave a review", showStars: true,
  gradientBackground: false, gradientColor1: "#f0f0f0", gradientColor2: "#ffffff",
  showButton: false, buttonText: "Leave a Review", buttonColor: "#4285F4",
  decorativeStars: false, qrBorderRadius: 20, showGoogleLogo: true,
  logoSize: 80, logoPosition: "above",
};

/* ── main content ────────────────────────────────────────── */
function QRContent() {
  const [qr, setQr] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loadingQR, setLoadingQR] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeSection, setActiveSection] = useState("form"); // form | design

  // Form settings
  const [companyName, setCompanyName] = useState("");
  const [customURL, setCustomURL] = useState("");
  const [redirectFromRating, setRedirectFromRating] = useState(3);
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoSrc, setLogoSrc] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState("");
  const [settingsError, setSettingsError] = useState("");

  // Design state
  const [design, setDesign] = useState({ ...DEFAULTS });
  const setD = (key, val) => setDesign((p) => ({ ...p, [key]: val }));
  /* ── fetch ── */
  const fetchFormSettings = async () => {
    try {
      const { data } = await axios.get("/custom-url/get-url", { withCredentials: true });
      if (data.success && data.data) {
        setCompanyName(data.data.companyName || "");
        setCustomURL(data.data.url || "");
        setRedirectFromRating(data.data.redirectFromRating ?? 3);
        setLogoUrl(data.data.logoUrl || "");
        setLogoSrc(data.data.logoUrl || null);
      }
    } catch {}
  };

  const fetchQR = async () => {
    setFetching(true); setError("");
    try {
      const { data } = await axios.get("/my-qr", { withCredentials: true });
      setQr(data.success ? data.qr : null);
    } catch { setError("Failed to load QR code."); }
    finally { setFetching(false); }
  };
  useEffect(() => { fetchFormSettings(); fetchQR(); }, []);
  /* ── generate / delete ── */
  const generateQR = async () => {
    setLoadingQR(true); setError("");
    try {
      const { data } = await axios.post("/generate-qr", {}, { withCredentials: true });
      if (data.success) { setQr(data.qr); setDesign({ ...DEFAULTS }); setSelectedTemplate(null); }
      else setError(data.message || "Failed to generate QR");
    } catch { setError("Something went wrong."); }
    finally { setLoadingQR(false); }
  };
  const deleteQR = async () => {
    setLoadingQR(true); setError("");
    try {
      const { data } = await axios.delete("/delete-qr", { withCredentials: true });
      if (data.success) { setQr(null); setShowDeleteDialog(false); setSelectedTemplate(null); setDesign({ ...DEFAULTS }); }
      else setError(data.message || "Failed to delete QR");
    } catch { setError("Failed to delete QR."); }
    finally { setLoadingQR(false); }
  };
  /* ── save form settings ── */
  const handleSaveSettings = async () => {
    if (!customURL.trim()) { setSettingsError("Please enter a redirect URL"); return; }
    if (!companyName.trim()) { setSettingsError("Please enter your brand name"); return; }
    setSettingsLoading(true); setSettingsSuccess(""); setSettingsError("");
    try {
      let newLogoUrl = logoUrl;
      if (logoFile) {
        const fd = new FormData(); fd.append("logo", logoFile);
        const up = await axios.post("/form/upload-logo", fd, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
        if (up.data.success) { newLogoUrl = up.data.data.logoUrl; setLogoUrl(newLogoUrl); setLogoSrc(newLogoUrl); setLogoFile(null); }
        else { setSettingsError(up.data.message || "Logo upload failed"); setSettingsLoading(false); return; }
      }
      const { data } = await axios.post("/custom-url/set-url", { url: customURL.trim(), companyName: companyName.trim(), redirectFromRating: Number(redirectFromRating) }, { withCredentials: true });
      if (data.success) { setSettingsSuccess("Settings saved!"); setTimeout(() => setSettingsSuccess(""), 3000); await fetchFormSettings(); }
      else setSettingsError(data.message || "Failed to save");
    } catch (err) { setSettingsError(err.response?.data?.message || "Something went wrong"); }
    finally { setSettingsLoading(false); }
  };
  const handleDeleteSettings = async () => {
    setSettingsLoading(true);
    try {
      const { data } = await axios.delete("/custom-url/delete-url", { withCredentials: true });
      if (data.success) { setCompanyName(""); setCustomURL(""); setRedirectFromRating(3); setLogoUrl(""); setLogoSrc(null); setSettingsSuccess("Deleted!"); setTimeout(() => setSettingsSuccess(""), 2000); }
      else setSettingsError(data.message || "Failed to delete");
    } catch (err) { setSettingsError(err.response?.data?.message || "Error"); }
    finally { setSettingsLoading(false); }
  };
  /* ── template select ── */
  const handleTemplateSelect = (index) => {
    setSelectedTemplate(index);
    const t = TEMPLATES[index];
    setDesign({ ...DEFAULTS, ...t });
  };
  /* ── copy link ── */
  const copyLink = async () => {
    if (!qr?.data) return;
    await navigator.clipboard.writeText(qr.data);
    setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000);
  };

  /* ── download: plain (just the QR image) ── */
  const downloadPlainQR = () => {
    if (!qr?.imageUrl) return;
    const a = document.createElement("a");
    a.href = qr.imageUrl;
    a.download = "qr-code.png";
    a.click();
  };

  /* ── download: with template/design ── */
  const downloadDesignedQR = () => {
    if (!qr?.imageUrl) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1080; canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    const d = design;

    const qrImg = new Image(); qrImg.crossOrigin = "anonymous";
    qrImg.onload = () => {
      // background
      if (d.gradientBackground) {
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, d.gradientColor1); grad.addColorStop(1, d.gradientColor2);
        ctx.fillStyle = grad;
      } else { ctx.fillStyle = d.backgroundColor; }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let y = 120; ctx.textAlign = "center";

      // google logo
      if (d.showGoogleLogo) {
        const letters = ["G","o","o","g","l","e"];
        const colors = ["#4285F4","#EA4335","#FBBC04","#4285F4","#34A853","#EA4335"];
        ctx.font = "bold 90px Arial";
        let lx = canvas.width / 2 - 220;
        letters.forEach((l, i) => { ctx.fillStyle = colors[i]; ctx.fillText(l, lx, y); lx += ctx.measureText(l).width + 2; });
        y += 130;
      }

      const wrapText = (text, maxW, size, bold = false) => {
        ctx.font = `${bold ? "bold " : ""}${size}px Arial`;
        const words = text.split(" "); let line = ""; const lines = [];
        words.forEach((w) => { const t = line + w + " "; if (ctx.measureText(t).width > maxW && line) { lines.push(line.trim()); line = w + " "; } else line = t; });
        lines.push(line.trim()); return lines;
      };

      // header
      if (d.headerText) {
        ctx.fillStyle = d.textColor;
        const lines = wrapText(d.headerText, canvas.width - 160, 72, true);
        lines.forEach((l) => { ctx.fillText(l, canvas.width / 2, y); y += 90; }); y += 30;
      }

      // brand name
      if (companyName) { ctx.fillStyle = d.textColor; ctx.font = "bold 58px Arial"; ctx.fillText(companyName, canvas.width / 2, y); y += 80; }

      // logo above
      const drawQRAndRest = (afterLogoY) => {
        y = afterLogoY;
        const qs = 620, qx = (canvas.width - qs) / 2;
        ctx.shadowColor = "rgba(0,0,0,0.18)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
        ctx.fillStyle = "#fff"; roundRectPath(ctx, qx - 44, y - 44, qs + 88, qs + 88, d.qrBorderRadius); ctx.fill();
        ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
        ctx.drawImage(qrImg, qx, y, qs, qs);
        if (d.qrColor !== "#000000") {
          const id = ctx.getImageData(qx, y, qs, qs), pixels = id.data;
          const [r, g, b] = hexToRgb(d.qrColor);
          for (let i = 0; i < pixels.length; i += 4) { if (pixels[i] < 50 && pixels[i+1] < 50 && pixels[i+2] < 50 && pixels[i+3] > 0) { pixels[i]=r; pixels[i+1]=g; pixels[i+2]=b; } }
          ctx.putImageData(id, qx, y);
        }
        y += qs + 70;

        // custom text
        if (d.customText) { ctx.fillStyle = d.textColor; const ls = wrapText(d.customText, canvas.width-160, 50); ls.forEach(l => { ctx.fillText(l, canvas.width/2, y); y += 64; }); y += 30; }

        // stars
        if (d.showStars) {
          const ss = 80, sp = 20, tw = ss*5+sp*4, sx = (canvas.width-tw)/2;
          for (let i = 0; i < 5; i++) { drawStar(ctx, sx+i*(ss+sp)+ss/2, y, ss/2); }
          y += ss + 60;
        }

        // button
        if (d.showButton) {
          const bw=560, bh=110, bx=(canvas.width-bw)/2;
          ctx.shadowColor="rgba(0,0,0,0.22)"; ctx.shadowBlur=18; ctx.shadowOffsetY=8;
          ctx.fillStyle=d.buttonColor; roundRectPath(ctx,bx,y,bw,bh,55); ctx.fill();
          ctx.shadowColor="transparent"; ctx.shadowBlur=0; ctx.shadowOffsetY=0;
          ctx.fillStyle=getContrastColor(d.buttonColor); ctx.font="bold 50px Arial"; ctx.fillText(d.buttonText,canvas.width/2,y+bh/2+18);
          y += bh + 60;
        }

        // footer
        if (d.footerText) { ctx.fillStyle=d.textColor; const ls=wrapText(d.footerText,canvas.width-160,54,true); ls.forEach(l => { ctx.fillText(l,canvas.width/2,y); y+=68; }); }

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a"); a.href=url; a.download="google-review-qr-designed.png";
          document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        }, "image/png");
      };

      if (d.logoPosition === "above" && logoSrc) {
        const li = new Image(); li.crossOrigin = "anonymous";
        li.onload = () => { const ls=d.logoSize*1.5, lx=(canvas.width-ls)/2; ctx.drawImage(li,lx,y,ls,ls); drawQRAndRest(y+ls+60); };
        li.onerror = () => drawQRAndRest(y); li.src = logoSrc;
      } else drawQRAndRest(y);
    };
    qrImg.onerror = () => alert("Failed to load QR image."); qrImg.src = qr.imageUrl;
  };

  function drawStar(ctx, cx, cy, r) {
    const spikes=5, inner=r*0.5; let rot=Math.PI/2*3;
    ctx.beginPath(); ctx.moveTo(cx, cy-r);
    for (let i=0;i<spikes;i++) {
      ctx.lineTo(cx+Math.cos(rot)*r, cy+Math.sin(rot)*r); rot+=Math.PI/spikes;
      ctx.lineTo(cx+Math.cos(rot)*inner, cy+Math.sin(rot)*inner); rot+=Math.PI/spikes;
    }
    ctx.closePath();
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    g.addColorStop(0,"#FFF700"); g.addColorStop(0.5,"#FFD700"); g.addColorStop(1,"#FFA500");
    ctx.fillStyle=g; ctx.fill();
  }

  const bgStyle = design.gradientBackground
    ? { background: `linear-gradient(135deg, ${design.gradientColor1}, ${design.gradientColor2})` }
    : { backgroundColor: design.backgroundColor };

  /* ══════════════════════════════════════════════════════════
      RENDER
  ══════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <QrCode className="w-7 h-7 text-indigo-600" />
              QR Code Generator
            </h1>
            <p className="mt-1 text-sm text-slate-500">Customize and download your Google Review QR</p>
          </div>
          {qr && (
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="inline-flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-95"
            >
              <Trash2 className="w-4 h-4" /> Delete QR
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Loading ── */}
        {fetching && <QRSkeleton />}

        {/* ── No QR ── */}
        {!fetching && !qr && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <QrCode className="w-10 h-10 text-indigo-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No QR Code Yet</h2>
            <p className="text-slate-500 text-sm mb-6">Your QR is auto-created at signup. Click below to generate.</p>
            <button
              onClick={generateQR}
              disabled={loadingQR}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md active:scale-95 disabled:opacity-70"
            >
              {loadingQR ? <Loader2 className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
              Generate QR Code
            </button>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-semibold text-sm">{error}</p>
              <button onClick={fetchQR} className="text-indigo-600 text-xs font-medium mt-1 hover:underline flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Retry
              </button>
            </div>
          </div>
        )}

        {/* ── QR EXISTS ── */}
        {qr && (
          <div className="space-y-6">
            {/* ── Template Selector ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Choose a Template</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {/* No template option */}
                <button
                  onClick={() => { setSelectedTemplate(null); setDesign({ ...DEFAULTS }); }}
                  className={`p-2.5 rounded-xl border-2 transition-all ${selectedTemplate === null ? "border-indigo-500 bg-indigo-50 shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                >
                  <div className="w-full h-16 sm:h-20 bg-white border border-slate-200 rounded-lg flex items-center justify-center mb-2">
                    <QrCode className="w-7 h-7 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-600 text-center">Plain QR</p>
                </button>

                {TEMPLATES.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => handleTemplateSelect(i)}
                    className={`p-2.5 rounded-xl border-2 transition-all hover:scale-105 ${selectedTemplate === i ? "border-indigo-500 bg-indigo-50 shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                  >
                    <div
                      className="w-full h-16 sm:h-20 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden"
                      style={t.gradientBackground ? { background: `linear-gradient(135deg, ${t.gradientColor1}, ${t.gradientColor2})` } : { backgroundColor: t.backgroundColor }}
                    >
                      <div className="w-9 h-9 bg-white rounded-lg shadow" />
                      {t.showStars && (
                        <div className="absolute bottom-1.5 flex gap-0.5">
                          {[...Array(3)].map((_, j) => (
                            <svg key={j} className="w-2.5 h-2.5" fill="#FFD700" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-600 text-center leading-tight">{t.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Main Grid: Preview + Controls ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* ── PREVIEW ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Live Preview</h2>
                <div className="flex justify-center">
                  <div className="w-full max-w-xs sm:max-w-sm p-6 rounded-2xl shadow-xl relative overflow-hidden" style={bgStyle}>
                    {/* Decorative stars */}
                    {design.decorativeStars && (
                      ["top-10 left-3","top-20 left-6","top-32 right-3","top-24 right-6"].map((cls, i) => (
                        <div key={i} className={`absolute ${cls}`} style={{ transform: `rotate(${i*15-20}deg)` }}>
                          <svg className={`w-${i%2===0?8:6} h-${i%2===0?8:6}`} fill="#FFD700" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      ))
                    )}

                    {/* Google Logo */}
                    {design.showGoogleLogo && (
                      <div className="text-center text-2xl sm:text-3xl font-extrabold mb-4">
                        {"Google".split("").map((l, i) => (
                          <span key={i} style={{ color: ["#4285F4","#EA4335","#FBBC04","#4285F4","#34A853","#EA4335"][i] }}>{l}</span>
                        ))}
                      </div>
                    )}

                    {design.headerText && (
                      <h3 className="text-base sm:text-lg font-bold text-center mb-4" style={{ color: design.textColor }}>{design.headerText}</h3>
                    )}

                    {design.logoPosition === "above" && logoSrc && (
                      <div className="flex justify-center mb-4">
                        <img src={logoSrc} alt="Logo" className="object-contain rounded-lg" style={{ width: design.logoSize, height: design.logoSize }} />
                      </div>
                    )}
                    {companyName && (
                      <p className="text-sm sm:text-base font-bold text-center mb-4" style={{ color: design.textColor }}>{companyName}</p>
                    )}

                    {/* QR Code */}
                    <div className="bg-white p-3 sm:p-4 mx-auto w-fit mb-4 shadow-lg relative" style={{ borderRadius: design.qrBorderRadius }}>
                      <div className="relative w-36 h-36 sm:w-44 sm:h-44">
                        <img
                          src={qr.imageUrl} alt="QR Code" className="w-full h-full"
                          style={{ filter: design.qrColor !== "#000000" ? `invert(1) hue-rotate(${getHue(design.qrColor)}deg) saturate(5) brightness(0.8)` : "none" }}
                        />
                        {design.logoPosition === "center" && logoSrc && (
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1">
                            <img src={logoSrc} alt="Logo" className="object-contain rounded-full" style={{ width: design.logoSize * 0.6, height: design.logoSize * 0.6 }} />
                          </div>
                        )}
                      </div>
                    </div>

                    {design.customText && (
                      <p className="text-xs sm:text-sm text-center mb-4" style={{ color: design.textColor }}>{design.customText}</p>
                    )}
                    {design.showStars && (
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-6 h-6 sm:w-7 sm:h-7" fill="#FFD700" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    )}
                    {design.showButton && (
                      <div className="flex justify-center mb-4">
                        <button className="px-6 py-2 font-bold text-sm rounded-full shadow"
                          style={{ backgroundColor: design.buttonColor, color: getContrastColor(design.buttonColor) }}>
                          {design.buttonText}
                        </button>
                      </div>
                    )}
                    {design.footerText && (
                      <p className="text-sm font-bold text-center" style={{ color: design.textColor }}>{design.footerText}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── CONTROLS ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Tab toggle */}
                <div className="flex border-b border-slate-100">
                  {[
                    { key: "form", label: "Form Settings", icon: <Settings2 className="w-4 h-4" /> },
                    { key: "design", label: "Design", icon: <Palette className="w-4 h-4" /> },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveSection(tab.key)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all ${
                        activeSection === tab.key
                          ? "bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {tab.icon}{tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-5 max-h-[520px] overflow-y-auto space-y-5">
                  {/* ── Form Settings Tab ── */}
                  {activeSection === "form" && (
                    <>
                      <Field label="Brand Name" icon={<Building2 className="w-4 h-4" />}>
                        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. ABC Restaurant"
                          className="input-base" />
                      </Field>
                      <Field label="Redirect URL" icon={<Link2 className="w-4 h-4" />}>
                        <input type="url" value={customURL} onChange={(e) => setCustomURL(e.target.value)} placeholder="https://yourwebsite.com"
                          className="input-base" />
                        <p className="text-xs text-slate-400 mt-1">High-rating users will be redirected here</p>
                      </Field>
                      <Field label="Brand Logo" icon={<ImageIcon className="w-4 h-4" />}>
                        {logoSrc && <img src={logoSrc} alt="Logo" className="w-16 h-16 object-contain rounded-xl border border-slate-200 mb-2" />}
                        <input type="file" accept="image/*" onChange={(e) => { const f=e.target.files[0]; if(f){setLogoFile(f);const r=new FileReader();r.onload=ev=>setLogoSrc(ev.target.result);r.readAsDataURL(f);}}}
                          className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
                      </Field>
                      <Field label="Redirect Threshold" icon={<Star className="w-4 h-4" />}>
                        <select value={redirectFromRating} onChange={(e) => setRedirectFromRating(Number(e.target.value))} className="input-base">
                          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} star{n>1?"s":""} {n===1?"and above (all)":n===5?"only":"and above"}</option>)}
                        </select>
                        <div className="flex gap-1 mt-2">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} className={`w-5 h-5 ${s<=redirectFromRating?"text-amber-400 fill-amber-400":"text-slate-200 fill-slate-200"}`} />
                          ))}
                        </div>
                      </Field>

                      <div className="flex gap-2 pt-1">
                        <button onClick={handleSaveSettings} disabled={settingsLoading}
                          className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-70 active:scale-95">
                          {settingsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                          {settingsLoading ? "Saving..." : "Save Settings"}
                        </button>
                        {(companyName || customURL || logoUrl) && (
                          <button onClick={handleDeleteSettings} disabled={settingsLoading}
                            className="p-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition active:scale-95">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {settingsSuccess && <Alert type="success">{settingsSuccess}</Alert>}
                      {settingsError && <Alert type="error">{settingsError}</Alert>}
                    </>
                  )}

                  {/* ── Design Tab ── */}
                  {activeSection === "design" && (
                    <>
                      <Field label="Header Text" icon={<Type className="w-4 h-4" />}>
                        <input value={design.headerText} onChange={e=>setD("headerText",e.target.value)} className="input-base" placeholder="Share Your Feedback..." />
                      </Field>
                      <Field label="Text Below QR">
                        <input value={design.customText} onChange={e=>setD("customText",e.target.value)} className="input-base" placeholder="Scan to leave a review" />
                      </Field>
                      <Field label="Footer Text">
                        <input value={design.footerText} onChange={e=>setD("footerText",e.target.value)} className="input-base" placeholder="We Value Your Opinion!" />
                      </Field>

                      {/* Toggles */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          ["showGoogleLogo","Google Logo"],["showStars","Star Rating"],
                          ["decorativeStars","Decorative ★"],["showButton","CTA Button"],
                          ["gradientBackground","Gradient BG"],
                        ].map(([key, label]) => (
                          <label key={key} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                            <input type="checkbox" checked={design[key]} onChange={e=>setD(key,e.target.checked)}
                              className="w-4 h-4 accent-indigo-600" />
                            <span className="text-xs font-semibold text-slate-700">{label}</span>
                          </label>
                        ))}
                      </div>

                      {/* Button fields */}
                      {design.showButton && (
                        <Field label="Button Text">
                          <input value={design.buttonText} onChange={e=>setD("buttonText",e.target.value)} className="input-base" />
                        </Field>
                      )}

                      {/* Colors */}
                      <div className="grid grid-cols-2 gap-3">
                        {design.gradientBackground ? (
                          <>
                            <ColorPicker label="Gradient Start" value={design.gradientColor1} onChange={v=>setD("gradientColor1",v)} />
                            <ColorPicker label="Gradient End" value={design.gradientColor2} onChange={v=>setD("gradientColor2",v)} />
                          </>
                        ) : (
                          <ColorPicker label="Background" value={design.backgroundColor} onChange={v=>setD("backgroundColor",v)} />
                        )}
                        <ColorPicker label="Text Color" value={design.textColor} onChange={v=>setD("textColor",v)} />
                        <ColorPicker label="QR Color" value={design.qrColor} onChange={v=>setD("qrColor",v)} />
                        {design.showButton && <ColorPicker label="Button Color" value={design.buttonColor} onChange={v=>setD("buttonColor",v)} />}
                      </div>

                      {/* Sliders */}
                      <div>
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">QR Corner Radius — {design.qrBorderRadius}px</label>
                        <input type="range" min={0} max={40} value={design.qrBorderRadius} onChange={e=>setD("qrBorderRadius",Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
                      </div>
                      {logoSrc && (
                        <>
                          <div>
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Logo Size — {design.logoSize}px</label>
                            <input type="range" min={40} max={150} value={design.logoSize} onChange={e=>setD("logoSize",Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
                          </div>
                          <Field label="Logo Position">
                            <select value={design.logoPosition} onChange={e=>setD("logoPosition",e.target.value)} className="input-base">
                              <option value="above">Above QR Code</option>
                              <option value="center">Center (Over QR)</option>
                            </select>
                          </Field>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ── Action Bar ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              {/* Link */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-5">
                <Link2 className="w-4 h-4 text-slate-400 shrink-0" />
                <p className="text-sm text-indigo-600 font-mono truncate flex-1">{qr.data}</p>
                <button onClick={copyLink} className="shrink-0 p-1.5 rounded-lg hover:bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 transition">
                  {copySuccess ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button onClick={copyLink}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition shadow-md hover:shadow-lg active:scale-95">
                  {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copySuccess ? "Copied!" : "Copy Link"}
                </button>

                <button onClick={downloadPlainQR}
                  className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-semibold text-sm transition shadow-md hover:shadow-lg active:scale-95">
                  <QrCode className="w-4 h-4" />
                  Download Plain QR
                </button>

                <button onClick={downloadDesignedQR}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition shadow-md hover:shadow-lg active:scale-95">
                  <Download className="w-4 h-4" />
                  Download Designed
                </button>
              </div>

              <p className="text-xs text-slate-400 text-center mt-3">
                <strong>Plain QR</strong> — just the code &nbsp;•&nbsp; <strong>Designed</strong> — full poster with template
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Delete Dialog ── */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-7 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Delete QR Code?</h3>
            <p className="text-sm text-slate-500 mb-6">This action <span className="text-red-600 font-semibold">cannot be undone</span>.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteDialog(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition active:scale-95">
                Cancel
              </button>
              <button onClick={deleteQR} disabled={loadingQR}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition shadow-md active:scale-95 disabled:opacity-70">
                {loadingQR ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Helper components ───────────────────────────────────── */
const Field = ({ label, icon, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
      {icon && <span className="text-slate-400">{icon}</span>}{label}
    </label>
    {children}
  </div>
);

const ColorPicker = ({ label, value, onChange }) => (
  <div>
    <label className="text-xs font-semibold text-slate-500 block mb-1">{label}</label>
    <div className="flex items-center gap-2">
      <input type="color" value={value} onChange={e=>onChange(e.target.value)}
        className="w-10 h-10 rounded-lg border-2 border-slate-200 cursor-pointer p-0.5" />
      <span className="text-xs font-mono text-slate-500">{value}</span>
    </div>
  </div>
);

const Alert = ({ type, children }) => (
  <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
    type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                       : "bg-red-50 border border-red-200 text-red-600"}`}>
    {type === "success" ? <Check className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
    {children}
  </div>
);

const QRSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 animate-pulse space-y-4 max-w-md mx-auto">
    <div className="w-40 h-6 bg-slate-200 rounded mx-auto" />
    <div className="w-52 h-52 bg-slate-200 rounded-2xl mx-auto" />
    <div className="w-32 h-4 bg-slate-100 rounded mx-auto" />
  </div>
);