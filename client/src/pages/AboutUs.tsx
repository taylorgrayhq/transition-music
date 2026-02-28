/*
 * About Us Page — Transition Music Corporation
 * Design: Dark, editorial layout with gold record room image, team credentials, client logos grid
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-about-bg-fscjPNDwFiTHPKpak4QMAT.webp";
const WAVEFORM_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-services-bg-TUb43GcAyETB2SVCPheXGw.webp";
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

const credentials = [
  { value: "25+", label: "Years in Business" },
  { value: "Top 100", label: "NMPA Publisher — 10 Consecutive Years" },
  { value: "500K+", label: "Global Performances (2023)" },
  { value: "29+", label: "Active TV Series" },
  { value: "8+", label: "Network Partners" },
  { value: "Grammy/Emmy", label: "Award-Winning Team" },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <Navigation />

      {/* ── PAGE HERO ── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{
          minHeight: "60vh",
          backgroundImage: `url(${ABOUT_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          paddingTop: "80px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.3) 100%)",
          }}
        />
        <div className="container relative z-10 pb-16">
          <div
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px" style={{ backgroundColor: "oklch(0.72 0.18 52)" }} />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
            >
              About Us
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
            THE TEAM<br />
            <span style={{ color: "oklch(0.72 0.18 52)" }}>BEHIND THE MUSIC.</span>
          </h1>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="tmc-section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-divider" />
              <h2
                className="text-white font-black leading-none mb-6"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                A LEGACY BUILT ON<br />MUSIC THAT MOVES.
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Transition Music Corporation was founded with a singular mission: to make world-class music accessible, manageable, and profitable for media companies of every size. Over the past 25 years, we have grown from a boutique licensing firm into one of the most respected full-service music companies in the industry.
              </p>
              <p className="text-gray-400 leading-relaxed mb-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Our team is led by Donna Ross Jones, a music industry veteran whose career spans Grammy and Emmy award-winning productions. Under her leadership, TMC has been recognized by the National Music Publishers' Association (NMPA) as a Top 100 Music Publisher for ten consecutive years — a distinction that reflects our commitment to both creative excellence and rigorous rights management.
              </p>
              <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Today, we serve as the outsourced music department for over 29 active television series across 8+ networks, managing everything from initial music strategy through final royalty disbursement. Our clients trust us not just as a vendor, but as a true creative and operational partner.
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((cred) => (
                <div
                  key={cred.label}
                  className="tmc-card p-6"
                >
                  <div
                    className="font-black leading-none mb-2"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "1.8rem",
                      color: "oklch(0.72 0.18 52)",
                    }}
                  >
                    {cred.value}
                  </div>
                  <p
                    className="text-gray-400 text-xs leading-snug uppercase tracking-wide"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {cred.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT SETS US APART ── */}
      <section
        className="tmc-section relative overflow-hidden"
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${WAVEFORM_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <div className="section-divider mx-auto" />
            <h2
              className="text-white font-black leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              WHAT SETS US APART.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "End-to-End Expertise",
                body: "From creative brief to cue sheet, we manage every stage of the music lifecycle. Our integrated approach eliminates the gaps that occur when multiple vendors handle different parts of the process.",
              },
              {
                title: "Depth of Catalog",
                body: "Our library of 150,000+ pre-cleared tracks — spanning production music, independent artists, and classic masters — means you spend less time searching and more time creating.",
              },
              {
                title: "Global Administration",
                body: "Our centralized hub model ensures that every performance is tracked, every royalty is collected, and every rights holder is paid — across every territory, every platform, every time.",
              },
            ].map((item) => (
              <div key={item.title} className="tmc-card p-8">
                <div
                  className="w-10 h-1 mb-5"
                  style={{ backgroundColor: "oklch(0.72 0.18 52)" }}
                />
                <h3
                  className="text-white font-bold mb-4"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "1.5rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-gray-400 leading-relaxed text-sm"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS ── */}
      <section className="tmc-section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-divider mx-auto" />
            <h2
              className="text-white font-black leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              OUR CLIENTS.
            </h2>
            <p
              className="text-gray-500 mt-3 text-sm"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Trusted by the world's leading media brands and networks.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {clientLogos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-4 tmc-card"
                style={{ aspectRatio: "3/2" }}
              >
                <img
                  src={`${BASE_CDN}${logo.file}`}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                  style={{ filter: "grayscale(80%) brightness(0.8)", transition: "filter 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%) brightness(1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(80%) brightness(0.8)")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20"
        style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(247,148,29,0.1)" }}
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
            READY TO PARTNER WITH US?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Let's talk about how Transition Music can serve as your dedicated music department.
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
                Contact Us
              </button>
            </Link>
            <Link href="/services">
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
                Our Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
