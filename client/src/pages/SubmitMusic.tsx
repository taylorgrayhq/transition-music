/*
 * Submit Music Page — Transition Music Corporation
 * Design: Dark editorial with submission guidelines and form
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { submitForm } from "@/lib/apiForms";
import siteContent from "@/content/site.json";

const WAVEFORM_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-services-bg-TUb43GcAyETB2SVCPheXGw.webp";

const guidelines = [
  {
    title: "AI-Generated Music Policy",
    body: "No AI-generated submissions. TMC does not accept purely AI-generated music. All submissions must be 100% original, human-authored work with no uncleared samples. If AI tools were used in any capacity, you must disclose it at the time of submission. AI-assisted work is eligible only with significant human authorship and the required documentation.",
  },
  {
    title: "Original Recordings Only",
    body: "We accept original compositions and recordings only. Covers, remixes, or interpolations of existing copyrighted works will not be considered.",
  },
  {
    title: "High-Quality Audio",
    body: "Submissions must be high-quality recordings (minimum 320kbps MP3 or WAV). Demos or rough recordings will not be considered for placement.",
  },
  {
    title: "Rights Clearance",
    body: "You must own or control all rights to the submitted material, including master recording rights and publishing rights. Co-written works require consent from all rights holders.",
  },
  {
    title: "Metadata Required",
    body: "All submissions must include complete metadata: title, artist name, composer(s), publisher(s), ISRC (if available), BPM, key, and genre.",
  },
  {
    title: "Response Time",
    body: "Due to the volume of submissions we receive, we are unable to respond to every submission. If your music is a fit for our current needs, a member of our team will be in touch within 60 days.",
  },
  {
    title: "No Unsolicited Physical Media",
    body: "Please do not send CDs, USB drives, or other physical media. Digital submissions only via the form below or by emailing submissions@transitionmusic.com.",
  },
];

export default function SubmitMusic() {
  const [formData, setFormData] = useState({
    artistName: "",
    contactName: "",
    email: "",
    phone: "",
    genre: "",
    aiUsed: "",
    spotifyUrl: "",
    message: "",
    agree: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const submitMutation = trpc.forms.submitMusic.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error("Please confirm that you have read and agree to the submission guidelines.");
      return;
    }
    if (formData.aiUsed === "Yes" && !formData.message.trim()) {
      toast.error("Please disclose the AI tools used in the Additional Notes / AI-Use Disclosure field.");
      return;
    }
    setSubmitting(true);
    try {
      const submission = {
          artistName: formData.artistName,
          contactName: formData.contactName,
        email: formData.email,
          phone: formData.phone,
          genre: formData.genre,
          aiUsed: formData.aiUsed,
          spotifyUrl: formData.spotifyUrl,
        message: formData.message,
      };
      // The Cloudflare Worker exposes the existing Netlify-compatible endpoint.
      // Use it for the static production build; the legacy tRPC path is not
      // available once the site is served outside the Manus application server.
      await submitForm("submit-music", submission);
      toast.success("Thank you for your submission! We'll review your music and be in touch if it's a fit for our catalog.");
      setFormData({
        artistName: "",
        contactName: "",
        email: "",
          phone: "",
          genre: "",
          aiUsed: "",
          spotifyUrl: "",
        message: "",
        agree: false,
      });
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const isLoading = submitMutation.isPending;

  const inputStyle: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#fff",
    fontFamily: "'Barlow', sans-serif",
    fontSize: "1rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <Navigation />

      {/* ── PAGE HERO ── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{
          minHeight: "45vh",
          backgroundImage: `url(${WAVEFORM_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "80px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.5) 100%)",
          }}
        />
        <div className="container relative z-10 pb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "oklch(0.72 0.18 52)" }} />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
            >
              Submit Music
            </span>
          </div>
          <h1
            className="text-white font-black leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {siteContent.submitMusic.heroLineOne}<br />
            <span style={{ color: "oklch(0.72 0.18 52)" }}>{siteContent.submitMusic.heroLineTwo}</span>
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-16" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-gray-300 leading-relaxed text-lg mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Transition Music Corporation actively seeks independent artists whose music has the potential for sync placement in television, film, and digital media. Our TMC Indie Artist Series is a curated collection of independent recordings licensed for use across our client network.
            </p>
            <p className="text-gray-500 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Before submitting, please review our guidelines carefully. We receive a high volume of submissions and can only respond to those that meet our current needs.
            </p>
          </div>
        </div>
      </section>

      {/* ── GUIDELINES + FORM ── */}
      <section className="pb-20" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Guidelines */}
            <div>
              <div className="section-divider" />
              <h2
                className="text-white font-black leading-none mb-8"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                SUBMISSION GUIDELINES
              </h2>
              <div className="space-y-5">
                {guidelines.map((g, i) => (
                  <div
                    key={g.title}
                    className={`flex gap-4 ${i === 0 ? "p-5 sm:p-6" : ""}`}
                    style={i === 0 ? {
                      backgroundColor: "rgba(247,148,29,0.1)",
                      border: "1px solid rgba(247,148,29,0.55)",
                      boxShadow: "0 0 30px rgba(247,148,29,0.08)",
                    } : undefined}
                  >
                    <div
                      className={`${i === 0 ? "w-9 h-9 text-base" : "w-7 h-7 text-sm"} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-black`}
                      style={{
                        backgroundColor: "oklch(0.72 0.18 52)",
                        color: "#000",
                        fontFamily: "'Barlow Condensed', sans-serif",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h4
                        className="text-white font-semibold mb-2"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: i === 0 ? "1.45rem" : "1.2rem" }}
                      >
                        {g.title}
                      </h4>
                      <p
                        className={`${i === 0 ? "text-gray-200" : "text-gray-300"} text-base leading-relaxed`}
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        {g.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-8 p-5"
                style={{ backgroundColor: "rgba(247,148,29,0.08)", border: "1px solid rgba(247,148,29,0.2)" }}
              >
                <p
                  className="text-base leading-relaxed"
                  style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
                >
                  You may also submit directly via email to{" "}
                  <a
                    href="mailto:submissions@transitionmusic.com"
                    className="underline hover:text-white transition-colors"
                  >
                    submissions@transitionmusic.com
                  </a>
                  . Please include all required metadata in your email.
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="section-divider" />
              <h2
                className="text-white font-black leading-none mb-8"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {siteContent.submitMusic.formHeading}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Artist / Band Name *
                    </label>
                    <input
                      type="text"
                      name="artistName"
                      value={formData.artistName}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Primary Genre *
                  </label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  >
                    <option value="" style={{ backgroundColor: "#1a1a1a" }}>Select a genre...</option>
                    {["Pop", "R&B / Soul", "Hip-Hop", "Rock", "Country", "Electronic / Dance", "Jazz", "Classical", "World", "Ambient / Instrumental", "Folk / Americana", "Gospel / Christian", "Other"].map((g) => (
                      <option key={g} value={g} style={{ backgroundColor: "#1a1a1a" }}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Link to Music (Spotify, SoundCloud, Dropbox, Google Drive, etc.) *
                  </label>
                  <input
                    type="url"
                    name="spotifyUrl"
                    value={formData.spotifyUrl}
                    onChange={handleChange}
                    required
                    placeholder="https://"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Were AI tools used in creating this submission? *
                  </label>
                  <select
                    name="aiUsed"
                    value={formData.aiUsed}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)" )}
                  >
                    <option value="" style={{ backgroundColor: "#1a1a1a" }}>Select an answer...</option>
                    <option value="No" style={{ backgroundColor: "#1a1a1a" }}>No — entirely human-authored</option>
                    <option value="Yes" style={{ backgroundColor: "#1a1a1a" }}>Yes — disclosed in the notes below</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm uppercase tracking-wide mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Additional Notes / AI-Use Disclosure
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your music, rights status, relevant credits, and any AI tools used..."
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agree"
                    id="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="mt-1 flex-shrink-0"
                    style={{ accentColor: "oklch(0.72 0.18 52)", width: "16px", height: "16px" }}
                  />
                  <label
                    htmlFor="agree"
                    className="text-gray-400 text-sm leading-relaxed cursor-pointer"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    I confirm that I have read and agree to the submission guidelines, including the AI-generated music policy, and that I own or control all rights to the submitted material. By submitting, I agree to our Submission Terms.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    backgroundColor: "oklch(0.72 0.18 52)",
                    color: "#000",
                    letterSpacing: "0.1em",
                    marginTop: "0.5rem",
                  }}
                >
                  {submitting ? "Submitting..." : "Submit Music"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
