/*
 * Home Page — Transition Music Corporation
 * Design: Dark hero with mixing board bg, stats strip, about preview, services grid, client logos marquee
 * Typography: Barlow Condensed (display) + Barlow (body)
 * Colors: #111 base, #F7941D orange accent, white text
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-hero-bg-ADc8iwxotSQGwixb4Qbsb8.webp";
const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-hero-alt1-GpXjogwezerkqhbdgBTStd.webp";
const WAVEFORM_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-services-bg-TUb43GcAyETB2SVCPheXGw.webp";
const HUB_DIAGRAM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-hub-diagram_6aad3df9.png";

const BASE_CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/";

const clientLogos = [
  { file: "f24b2982_238e7871.jpg", name: "NBC" },
  { file: "4a4da63b_05b5d35e.jpg", name: "Local Now" },
  { file: "641053d7_270888ea.jpg", name: "The Weather Channel" },
  { file: "93f0249f_170ba237.jpg", name: "Disney" },
  { file: "2f56c76d_b7ee32df.jpg", name: "TNT" },
  { file: "b9898425_f6855db6.jpg", name: "HBCU Go" },
  { file: "0edb6a03_e1f67cbc.jpg", name: "This TV" },
  { file: "4a8e1711_4d6fe908.jpg", name: "Hearst" },
  { file: "680918dd_30138a58.jpg", name: "Justice Central" },
  { file: "adc96566_3de3b64f.jpg", name: "Freestyle Digital Media" },
  { file: "5b916121_3714edf1.jpg", name: "AMB" },
  { file: "651fd2ef_e54e76e4.jpg", name: "Telemundo" },
  { file: "8f442590_0256b303.jpg", name: "The Africa Channel" },
  { file: "8673d41b_cc3fa259.jpg", name: "CBS Entertainment" },
  { file: "3ac7254f_eb58e2f9.jpg", name: "HBO" },
  { file: "9139d800_c1639522.jpg", name: "TV One" },
  { file: "6d702042_9636b3b7.jpg", name: "Warner Bros" },
  { file: "32544b7c_fa96f9d9.jpg", name: "A&E" },
  { file: "08206b10_9528a211.jpg", name: "Fios by Verizon" },
  { file: "ac40d272_07417b45.jpg", name: "Comedy.tv" },
  { file: "356a2448_1e750d8f.jpg", name: "Dept of Defense" },
  { file: "cf4002a5_147252fc.jpg", name: "Time Life" },
  { file: "dbafdc9b_a4e4cee1.jpg", name: "Client" },
  { file: "a2c64e48_b3bedef9.jpg", name: "Client" },
];

const services = [
  {
    number: "01",
    title: "Music Licensing",
    description: "Access our curated catalog of 150,000+ pre-cleared tracks spanning every genre, mood, and tempo. Streamlined sync licensing for film, TV, advertising, and digital content.",
    icon: "🎵",
  },
  {
    number: "02",
    title: "Music Supervision",
    description: "Our experienced supervisors guide your project from creative brief to final delivery — finding the perfect track, managing rights, and ensuring your vision is fully realized.",
    icon: "🎬",
  },
  {
    number: "03",
    title: "Custom Composition",
    description: "A roster of 100+ Grammy and Emmy award-winning composers and songwriters available to create original, bespoke music tailored precisely to your project's needs.",
    icon: "🎼",
  },
  {
    number: "04",
    title: "Publishing Administration",
    description: "End-to-end rights management, copyright registration, and global royalty collection. We handle the complexity so your creative team can stay focused on content.",
    icon: "📋",
  },
  {
    number: "05",
    title: "Outsourced Music Department",
    description: "A complete, scalable music infrastructure for your organization. From acquisition to distribution, we serve as your dedicated music team — without the overhead.",
    icon: "🏢",
  },
  {
    number: "06",
    title: "Global Royalty Collection",
    description: "Comprehensive performance rights reporting, cue sheet management, and international royalty disbursement through our centralized global administration hub.",
    icon: "🌐",
  },
];

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  
  return count;
}

function StatCard({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 2200, start);
  return (
    <div className="text-center px-6">
      <div
        className="font-black leading-none mb-2"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          color: "oklch(0.72 0.18 52)",
        }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div
        className="text-gray-400 uppercase tracking-widest"
        style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.7rem" }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <Navigation />

      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-start overflow-hidden"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
        {/* Orange accent line left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: "linear-gradient(to bottom, transparent, oklch(0.72 0.18 52), transparent)" }}
        />

        <div className="container relative z-10 pt-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-6"
              style={{ animation: "fadeUp 0.6s ease forwards" }}
            >
              <div className="w-8 h-px" style={{ backgroundColor: "oklch(0.72 0.18 52)" }} />
              <span
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
              >
                Full-Service Music Partner
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-white font-black leading-none mb-6"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                letterSpacing: "-0.02em",
                animation: "fadeUp 0.7s 0.1s ease both",
              }}
            >
              MUSIC FOR<br />
              <span style={{ color: "oklch(0.72 0.18 52)" }}>WHAT'S NEXT.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-gray-300 mb-10 max-w-xl leading-relaxed"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                animation: "fadeUp 0.7s 0.2s ease both",
              }}
            >
              For over 25 years, Transition Music has been the trusted music infrastructure behind the world's leading media brands — delivering end-to-end licensing, supervision, publishing, and custom composition at scale.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4"
              style={{ animation: "fadeUp 0.7s 0.3s ease both" }}
            >
              <a href="https://search.transitionmusic.com/" target="_blank" rel="noopener noreferrer">
                <button
                  className="px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    backgroundColor: "oklch(0.72 0.18 52)",
                    color: "#000",
                    letterSpacing: "0.1em",
                  }}
                >
                  Search Our Library
                </button>
              </a>
              <Link href="/services">
                <button
                  className="px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-white hover:text-black"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    border: "1px solid rgba(255,255,255,0.4)",
                    color: "#fff",
                    letterSpacing: "0.1em",
                    backgroundColor: "transparent",
                  }}
                >
                  Our Services
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-white animate-pulse" />
          <span className="text-white text-xs uppercase tracking-widest" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Scroll
          </span>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section
        ref={statsRef}
        style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(247,148,29,0.15)", borderBottom: "1px solid rgba(247,148,29,0.15)" }}
      >
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-800">
            <StatCard value={500000} suffix="+" label="Global Performances in 2023" start={statsVisible} />
            <StatCard value={150000} suffix="+" label="Pre-Cleared Tracks" start={statsVisible} />
            <StatCard value={100} suffix="+" label="Composers & Songwriters" start={statsVisible} />
            <StatCard value={10} suffix="x" label="NMPA Top 100 Publisher" start={statsVisible} />
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="tmc-section overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={ABOUT_BG}
                  alt="Transition Music Corporation — Music Industry Expertise"
                  className="w-full h-full object-cover"
                />
                {/* Orange accent border */}
                <div
                  className="absolute inset-0"
                  style={{ border: "2px solid oklch(0.72 0.18 52 / 0.4)", pointerEvents: "none" }}
                />
                {/* Credential badge */}
                <div
                  className="absolute bottom-6 right-6 px-5 py-4 text-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.9)", border: "1px solid oklch(0.72 0.18 52 / 0.5)" }}
                >
                  <div
                    className="font-black leading-none"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "2rem",
                      color: "oklch(0.72 0.18 52)",
                    }}
                  >
                    25+
                  </div>
                  <div
                    className="text-gray-300 text-xs uppercase tracking-wider mt-1"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Years in Business
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="order-1 lg:order-2">
              <div className="section-divider" />
              <p
                className="uppercase tracking-widest text-xs mb-4"
                style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
              >
                About Us
              </p>
              <h2
                className="text-white font-black leading-none mb-6"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                THE TEAM<br />BEHIND THE MUSIC.
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
                TMC is a full-service music company built for the modern media landscape. We create, license, manage, and monetize music for television networks, streaming platforms, production companies, and global brands.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Led by Grammy and Emmy award-winning professionals, our team brings decades of hands-on experience to every engagement. Whether you need a single track cleared or a complete outsourced music department, we deliver with precision and care.
              </p>
              <Link href="/about">
                <button
                  className="px-7 py-3.5 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    backgroundColor: "oklch(0.72 0.18 52)",
                    color: "#000",
                    letterSpacing: "0.1em",
                  }}
                >
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section
        className="tmc-section relative overflow-hidden"
        style={{ backgroundColor: "#0d0d0d" }}
      >
        {/* Waveform background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${WAVEFORM_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <div className="section-divider mx-auto" />
            <p
              className="uppercase tracking-widest text-xs mb-4"
              style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
            >
              What We Do
            </p>
            <h2
              className="text-white font-black leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              YOUR END-TO-END<br />MUSIC PARTNER.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div
                key={service.number}
                className="tmc-card p-7 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="font-black leading-none opacity-30 group-hover:opacity-60 transition-opacity"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "1.5rem",
                      color: "oklch(0.72 0.18 52)",
                    }}
                  >
                    {service.number}
                  </span>
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3
                  className="text-white font-bold mb-3"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "1.4rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-gray-400 text-sm leading-relaxed"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <button
                className="px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  backgroundColor: "oklch(0.72 0.18 52)",
                  color: "#000",
                  letterSpacing: "0.1em",
                }}
              >
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="tmc-section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-divider" />
              <p
                className="uppercase tracking-widest text-xs mb-4"
                style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
              >
                Our Approach
              </p>
              <h2
                className="text-white font-black leading-none mb-8"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                THE HUB MODEL.<br />CENTRALIZED.<br />SCALABLE.
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Our hub-based approach puts all of your music needs under one roof. We begin with a comprehensive music audit, then recommend a tailored combination of services — from catalog licensing to custom composition to full publishing administration.
              </p>
              <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                The result is a seamless, scalable music ecosystem that grows with your organization, eliminates redundant costs, and ensures every piece of music in your content is properly licensed, tracked, and monetized.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {["Music Audit", "Strategy", "Execution"].map((step, i) => (
                  <div key={step} className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 font-black text-sm"
                      style={{
                        backgroundColor: "oklch(0.72 0.18 52)",
                        color: "#000",
                        fontFamily: "'Barlow Condensed', sans-serif",
                      }}
                    >
                      {i + 1}
                    </div>
                    <p
                      className="text-gray-300 text-xs uppercase tracking-wider"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hub Diagram */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: "oklch(0.72 0.18 52)" }}
                />
                <img
                  src={HUB_DIAGRAM}
                  alt="Transition Music Corporation Services Hub"
                  className="relative z-10 w-full max-w-sm mx-auto"
                  style={{ filter: "brightness(1.1) contrast(1.05)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS MARQUEE ── */}
      <section
        style={{
          backgroundColor: "#0d0d0d",
          borderTop: "1px solid rgba(247,148,29,0.1)",
          borderBottom: "1px solid rgba(247,148,29,0.1)",
          overflow: "hidden",
          padding: "3rem 0",
        }}
      >
        <div className="container mb-8">
          <p
            className="text-center uppercase tracking-widest text-xs"
            style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.55 0 0)" }}
          >
            Trusted By Leading Media Brands
          </p>
        </div>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to right, #0d0d0d, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, #0d0d0d, transparent)" }}
          />
          <div
            className="marquee-track flex gap-10 items-center"
            style={{ width: "max-content" }}
          >
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: "100px", height: "60px" }}
              >
                <img
                  src={`${BASE_CDN}${logo.file}`}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                  style={{ filter: "grayscale(100%) brightness(0.7)", transition: "filter 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%) brightness(1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%) brightness(0.7)")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTIST SERIES CTA ── */}
      <section className="tmc-section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div
            className="relative overflow-hidden p-10 lg:p-16"
            style={{
              background: "linear-gradient(135deg, rgba(247,148,29,0.12) 0%, rgba(0,0,0,0) 60%)",
              border: "1px solid rgba(247,148,29,0.25)",
            }}
          >
            {/* Background accent */}
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-5"
              style={{
                backgroundImage: `url(${WAVEFORM_BG})`,
                backgroundSize: "cover",
              }}
            />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p
                  className="uppercase tracking-widest text-xs mb-3"
                  style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
                >
                  For Independent Artists
                </p>
                <h2
                  className="text-white font-black leading-none mb-4"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  TMC INDIE<br />ARTIST SERIES
                </h2>
                <p className="text-gray-300 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  We actively seek independent artists whose music has the potential for sync placement. Our curated collection connects emerging talent with major media opportunities — from network television to global streaming platforms.
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <Link href="/submit">
                  <button
                    className="px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 w-full lg:w-auto"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      backgroundColor: "oklch(0.72 0.18 52)",
                      color: "#000",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Submit Your Music
                  </button>
                </Link>
                <p
                  className="text-gray-500 text-xs text-center lg:text-right"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Review our submission guidelines before applying
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMAIL SIGNUP ── */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, rgba(247,148,29,0.08) 0%, rgba(0,0,0,0) 60%)",
          borderTop: "1px solid rgba(247,148,29,0.1)",
          borderBottom: "1px solid rgba(247,148,29,0.1)",
        }}
      >
        <div className="container max-w-2xl text-center">
          <p
            className="uppercase tracking-widest text-xs mb-3"
            style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
          >
            Stay Connected
          </p>
          <h2
            className="text-white font-black leading-none mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Get Music News & Opportunities
          </h2>
          <p
            className="text-gray-400 mb-8"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Subscribe to our newsletter for updates on new placements, artist opportunities, and industry insights.
          </p>
          <div id="mc_embed_shell" style={{ maxWidth: "500px", margin: "0 auto" }} />
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(to bottom, #0a0a0a, #0d0d0d)",
          borderTop: "1px solid rgba(247,148,29,0.1)",
        }}
      >
        <div className="container text-center">
          <h2
            className="text-white font-black leading-none mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            READY TO WORK TOGETHER?
          </h2>
          <p
            className="text-gray-400 mb-8 max-w-lg mx-auto"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Whether you're a network, production company, or independent creator — we have the music solutions to elevate your content.
          </p>
          <Link href="/contact">
            <button
              className="px-10 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                backgroundColor: "oklch(0.72 0.18 52)",
                color: "#000",
                letterSpacing: "0.1em",
              }}
            >
              Get In Touch
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
