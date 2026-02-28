/*
 * Services Page — Transition Music Corporation
 * Design: Dark editorial layout with service cards, hub diagram, and CTA
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const WAVEFORM_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-services-bg-TUb43GcAyETB2SVCPheXGw.webp";
const HUB_DIAGRAM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-hub-diagram_6aad3df9.png";

const services = [
  {
    number: "01",
    title: "Global Digital Music Library",
    description: "Access our curated catalog of 150,000+ pre-cleared tracks spanning every genre, mood, tempo, and instrumentation. Our library includes production music, independent artist recordings, classic masters, and original compositions — all fully licensed and ready for immediate use.",
    detail: "Ideal for: TV networks, streaming platforms, production companies, advertising agencies",
  },
  {
    number: "02",
    title: "Custom Composition",
    description: "Our roster of 100+ Grammy and Emmy award-winning composers and songwriters is available to create original, bespoke music tailored precisely to your project's creative brief. From underscore to theme songs, we deliver music that is uniquely yours.",
    detail: "Ideal for: Original series, brand campaigns, film scores, advertising",
  },
  {
    number: "03",
    title: "Music Supervision",
    description: "Our experienced music supervisors guide your project from initial creative brief through final delivery. We identify the right tracks, manage the clearance process, coordinate with rights holders, and ensure your music vision is fully realized on time and on budget.",
    detail: "Ideal for: Television series, films, documentaries, branded content",
  },
  {
    number: "04",
    title: "Music Clearance & Licensing",
    description: "Navigating the complex landscape of music rights doesn't have to slow your production. Our clearance team handles master and sync license negotiations, rights research, and documentation — so you can focus on creating great content.",
    detail: "Ideal for: Any production requiring licensed music from third-party catalogs",
  },
  {
    number: "05",
    title: "Publishing Administration",
    description: "We provide comprehensive publishing administration services including copyright registration, royalty collection, and rights management. Our team ensures that every composition in your catalog is properly registered and generating maximum revenue.",
    detail: "Ideal for: Songwriters, composers, independent labels, production companies",
  },
  {
    number: "06",
    title: "Global Royalty Collection & Disbursement",
    description: "Our centralized hub model ensures that every performance of your music is tracked, every royalty is collected from every territory, and every rights holder is paid accurately and on time. We work with all major performance rights organizations worldwide.",
    detail: "Ideal for: Publishers, labels, composers, and rights holders with international exposure",
  },
  {
    number: "07",
    title: "Performance Rights Reporting",
    description: "Accurate, timely cue sheet preparation and submission is critical to ensuring that composers and publishers receive the royalties they are owed. Our team manages the entire reporting process, from production logs to final PRO submission.",
    detail: "Ideal for: TV networks, production companies, streaming platforms",
  },
  {
    number: "08",
    title: "Outsourced Music Department",
    description: "For organizations that need a complete music solution without the overhead of an in-house team, TMC serves as your dedicated music department. We handle strategy, acquisition, supervision, clearance, administration, and reporting — all under one roof.",
    detail: "Ideal for: TV stations, networks, production companies, digital media brands",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <Navigation />

      {/* ── PAGE HERO ── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{
          minHeight: "50vh",
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
              Services
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
            YOUR END-TO-END<br />
            <span style={{ color: "oklch(0.72 0.18 52)" }}>MUSIC PARTNER.</span>
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-16" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-gray-300 leading-relaxed text-lg mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Transition Music offers a comprehensive suite of music services designed to meet the needs of today's media landscape. Whether you require a single track cleared or a complete outsourced music infrastructure, we deliver with precision, creativity, and care.
            </p>
            <p className="text-gray-500 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Our integrated approach means that every service we offer is connected — licensing informs supervision, supervision informs publishing, and publishing informs royalty collection. The result is a seamless music ecosystem that works harder for your content and your bottom line.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="pb-20" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service) => (
              <div
                key={service.number}
                className="tmc-card p-8 group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="font-black leading-none"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "1rem",
                      color: "oklch(0.72 0.18 52)",
                      opacity: 0.7,
                    }}
                  >
                    {service.number}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ backgroundColor: "rgba(247,148,29,0.2)" }}
                  />
                </div>
                <h3
                  className="text-white font-bold mb-4"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "1.6rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-gray-400 leading-relaxed text-sm mb-4"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {service.description}
                </p>
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)", opacity: 0.7 }}
                >
                  {service.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HUB MODEL ── */}
      <section
        className="tmc-section"
        style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(247,148,29,0.1)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: "oklch(0.72 0.18 52)" }}
                />
                <img
                  src={HUB_DIAGRAM}
                  alt="TMC Services Hub Model"
                  className="relative z-10 w-full max-w-sm mx-auto"
                  style={{ filter: "brightness(1.1) contrast(1.05)" }}
                />
              </div>
            </div>

            <div>
              <div className="section-divider" />
              <p
                className="uppercase tracking-widest text-xs mb-4"
                style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
              >
                How It Works
              </p>
              <h2
                className="text-white font-black leading-none mb-6"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                THE TMC HUB.<br />EVERYTHING CONNECTED.
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Our hub model places TMC at the center of your music ecosystem. Every service — from artist acquisition and library licensing to supervision, clearance, publishing, and royalty collection — flows through a single, centralized point of contact.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8" style={{ fontFamily: "'Barlow', sans-serif" }}>
                This integrated approach eliminates the communication gaps, rights conflicts, and administrative overhead that occur when multiple vendors handle different parts of the music process. You get one team, one relationship, one invoice — and complete peace of mind.
              </p>

              <div className="space-y-3">
                {["Music Audit & Strategy", "Service Selection & Onboarding", "Ongoing Management & Reporting", "Royalty Collection & Disbursement"].map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black"
                      style={{
                        backgroundColor: "oklch(0.72 0.18 52)",
                        color: "#000",
                        fontFamily: "'Barlow Condensed', sans-serif",
                      }}
                    >
                      {i + 1}
                    </div>
                    <p
                      className="text-gray-300 text-sm"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20"
        style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(247,148,29,0.1)" }}
      >
        <div className="container text-center">
          <h2
            className="text-white font-black leading-none mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            LET'S TALK ABOUT YOUR NEEDS.
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Every client engagement begins with a music audit. Contact us to schedule a consultation and learn how TMC can serve your organization.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <button
                className="px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  backgroundColor: "oklch(0.72 0.18 52)",
                  color: "#000",
                  letterSpacing: "0.1em",
                }}
              >
                Schedule a Consultation
              </button>
            </Link>
            <a href="https://search.transitionmusic.com/" target="_blank" rel="noopener noreferrer">
              <button
                className="px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-white hover:text-black"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  letterSpacing: "0.1em",
                  backgroundColor: "transparent",
                }}
              >
                Search Our Library
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
