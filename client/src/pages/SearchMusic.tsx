/*
 * Search Music Page — Transition Music Corporation
 * Design: Dark editorial with SourceAudio integration info and library overview
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const WAVEFORM_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-services-bg-TUb43GcAyETB2SVCPheXGw.webp";

const libraryCategories = [
  {
    title: "Production Music",
    description: "Thousands of pre-cleared production tracks spanning every genre, mood, and tempo — ready for immediate licensing.",
    count: "50,000+",
  },
  {
    title: "Independent Artists",
    description: "Curated recordings from emerging and established independent artists through our TMC Indie Artist Series.",
    count: "30,000+",
  },
  {
    title: "Classic Masters",
    description: "Access to iconic recordings from legendary artists, available for sync licensing in select projects.",
    count: "Available",
  },
  {
    title: "Sound Design & SFX",
    description: "A comprehensive library of sound effects, ambiences, and designed audio elements for post-production.",
    count: "70,000+",
  },
  {
    title: "Custom Compositions",
    description: "Original music created by our roster of 100+ composers, available exclusively through TMC.",
    count: "Exclusive",
  },
  {
    title: "Moonbaby Media",
    description: "Premium production music from our Moonbaby Media imprint — cinematic, contemporary, and broadcast-ready.",
    count: "Featured",
  },
];

export default function SearchMusic() {
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
              Search Music
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
            FIND THE<br />
            <span style={{ color: "oklch(0.72 0.18 52)" }}>PERFECT TRACK.</span>
          </h1>
        </div>
      </section>

      {/* ── SEARCH PORTAL ── */}
      <section className="py-16" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                150,000+ TRACKS.<br />ONE SEARCH.
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Our music library is powered by SourceAudio — a professional music search platform trusted by broadcasters, production companies, and music supervisors worldwide. Search by genre, mood, tempo, instrumentation, or keyword to find exactly what your project needs.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Every track in our catalog is pre-cleared and available for immediate licensing. No rights conflicts, no delays — just great music, ready when you are.
              </p>
              <a
                href="https://www.sourceaudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  backgroundColor: "oklch(0.72 0.18 52)",
                  color: "#000",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                }}
              >
                Launch Music Search →
              </a>
              <p
                className="text-gray-600 text-xs mt-3"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Powered by SourceAudio. Opens in a new window.
              </p>
            </div>

            {/* Search Preview Card */}
            <div
              className="tmc-card p-8 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url(${WAVEFORM_BG})`,
                  backgroundSize: "cover",
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "oklch(0.72 0.18 52)" }}
                  >
                    <span className="text-black text-lg">🔍</span>
                  </div>
                  <div>
                    <p
                      className="text-white font-semibold text-sm"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}
                    >
                      SourceAudio Search Portal
                    </p>
                    <p
                      className="text-gray-500 text-xs"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      Powered by Transition Music Corporation
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {["Search by mood, genre, tempo, or keyword", "Preview full tracks before licensing", "Instant licensing and download", "Complete metadata and rights information", "Curated playlists by category"].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "oklch(0.72 0.18 52)" }}
                      />
                      <p
                        className="text-gray-300 text-sm"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="p-4 text-center"
                  style={{
                    backgroundColor: "rgba(247,148,29,0.08)",
                    border: "1px solid rgba(247,148,29,0.2)",
                  }}
                >
                  <p
                    className="text-sm mb-3"
                    style={{ fontFamily: "'Barlow', sans-serif", color: "oklch(0.72 0.18 52)" }}
                  >
                    Need help finding the right music?
                  </p>
                  <a
                    href="mailto:creativeservices@transitionmusic.com"
                    className="text-gray-300 text-xs hover:text-white transition-colors underline"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Contact our creative services team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIBRARY CATEGORIES ── */}
      <section
        className="tmc-section"
        style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(247,148,29,0.1)" }}
      >
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
              WHAT'S IN THE LIBRARY.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {libraryCategories.map((cat) => (
              <div key={cat.title} className="tmc-card p-7 group">
                <div className="flex items-start justify-between mb-4">
                  <h3
                    className="text-white font-bold"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "1.4rem",
                    }}
                  >
                    {cat.title}
                  </h3>
                  <span
                    className="font-black text-sm flex-shrink-0 ml-3"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "oklch(0.72 0.18 52)",
                    }}
                  >
                    {cat.count}
                  </span>
                </div>
                <p
                  className="text-gray-400 text-sm leading-relaxed"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LICENSING INFO ── */}
      <section className="tmc-section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-divider mx-auto" />
            <h2
              className="text-white font-black leading-none mb-6"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              NEED A CUSTOM LICENSE?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8" style={{ fontFamily: "'Barlow', sans-serif" }}>
              For custom licensing arrangements, bulk catalog access, or music supervision services, our licensing team is ready to help. We work with clients of all sizes to create flexible, cost-effective music solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:licensing@transitionmusic.com"
                className="inline-block px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  backgroundColor: "oklch(0.72 0.18 52)",
                  color: "#000",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                }}
              >
                Contact Licensing
              </a>
              <a
                href="https://www.sourceaudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-white hover:text-black"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  backgroundColor: "transparent",
                }}
              >
                Search Library
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
