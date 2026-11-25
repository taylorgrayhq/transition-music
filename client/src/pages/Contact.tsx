/*
 * Contact Page — Transition Music Corporation
 * Design: Dark editorial with contact cards and form
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { submitNetlifyForm, usesNetlifyForms } from "@/lib/netlifyForms";

const WAVEFORM_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-services-bg-TUb43GcAyETB2SVCPheXGw.webp";

const contactDepts = [
  {
    dept: "Creative Services",
    email: "creativeservices@transitionmusic.com",
    description: "Music supervision, catalog inquiries, and creative partnerships.",
  },
  {
    dept: "Licensing",
    email: "licensing@transitionmusic.com",
    description: "Sync licensing, master clearances, and catalog access.",
  },
  {
    dept: "Legal",
    email: "legal@transitionmusic.com",
    description: "Rights management, contracts, and legal inquiries.",
  },
  {
    dept: "Music Submissions",
    email: "submissions@transitionmusic.com",
    description: "Independent artist submissions and catalog placement.",
  },
  {
    dept: "Cue Sheets",
    email: "cuesheets@transitionmusic.com",
    description: "Performance rights reporting and cue sheet management.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitMutation = trpc.forms.submitContact.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (usesNetlifyForms) {
        await submitNetlifyForm("contact", formData);
      } else {
        await submitMutation.mutateAsync(formData);
      }
      toast.success("Thank you for reaching out! A member of our team will be in touch shortly.");
      setFormData({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
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
    fontSize: "0.9rem",
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
              Contact
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
            LET'S<br />
            <span style={{ color: "oklch(0.72 0.18 52)" }}>CONNECT.</span>
          </h1>
        </div>
      </section>

      {/* ── CONTACT CONTENT ── */}
      <section className="tmc-section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Departments + Address */}
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
                REACH THE RIGHT TEAM.
              </h2>

              <div className="space-y-4 mb-10">
                {contactDepts.map((dept) => (
                  <div
                    key={dept.dept}
                    className="tmc-card p-5 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4
                          className="text-white font-semibold mb-1"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}
                        >
                          {dept.dept}
                        </h4>
                        <p
                          className="text-gray-500 text-xs mb-2"
                          style={{ fontFamily: "'Barlow', sans-serif" }}
                        >
                          {dept.description}
                        </p>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-xs transition-colors hover:text-white"
                          style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
                        >
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div
                className="p-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h4
                  className="font-semibold mb-4 uppercase tracking-widest text-xs"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "oklch(0.72 0.18 52)" }}
                >
                  Office
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Address</p>
                    <address className="not-italic text-gray-300">
                      P.O. Box 2586<br />
                      Toluca Lake, CA 91610
                    </address>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:3238607074" className="text-gray-300 hover:text-white transition-colors">
                      323.860.7074
                    </a>
                    <p className="text-gray-600 text-xs mt-1">Fax: 323.860.7986</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
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
                SEND US A MESSAGE.
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
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
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
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
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  >
                    <option value="" style={{ backgroundColor: "#1a1a1a" }}>Select a subject...</option>
                    {[
                      "Music Licensing Inquiry",
                      "Music Supervision",
                      "Custom Composition",
                      "Publishing Administration",
                      "Outsourced Music Department",
                      "Royalty Collection",
                      "General Inquiry",
                      "Other",
                    ].map((s) => (
                      <option key={s} value={s} style={{ backgroundColor: "#1a1a1a" }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project, needs, or question..."
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.18 52)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
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
                  {submitting ? "Sending..." : "Send Message"}
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
