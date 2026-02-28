/*
 * Footer Component — Transition Music Corporation
 * Design: Dark footer with orange accents, contact info, and nav links
 */

import { Link } from "wouter";

const TMC_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-logo-white-v4_4cd96a55.png";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(247,148,29,0.2)",
      }}
    >
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src={TMC_LOGO}
              alt="Transition Music Corporation"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed mt-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Your end-to-end music partner for over 25 years. Serving global brands and content creators with world-class music solutions.
            </p>
            <p className="text-gray-500 text-xs mt-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
              NMPA Top 100 Music Publisher<br />10 Consecutive Years
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-white font-semibold uppercase tracking-widest text-xs mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "oklch(0.72 0.18 52)" }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Submit Music", href: "/submit" },
                { label: "Search Music", href: "https://search.transitionmusic.com/", external: true },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  {(link as any).external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-semibold uppercase tracking-widest text-xs mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "oklch(0.72 0.18 52)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400" style={{ fontFamily: "'Barlow', sans-serif" }}>
              <li>
                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-0.5">Creative Services</span>
                <a href="mailto:creativeservices@transitionmusic.com" className="hover:text-white transition-colors text-xs">
                  creativeservices@transitionmusic.com
                </a>
              </li>
              <li>
                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-0.5">Licensing</span>
                <a href="mailto:licensing@transitionmusic.com" className="hover:text-white transition-colors text-xs">
                  licensing@transitionmusic.com
                </a>
              </li>
              <li>
                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-0.5">Submissions</span>
                <a href="mailto:submissions@transitionmusic.com" className="hover:text-white transition-colors text-xs">
                  submissions@transitionmusic.com
                </a>
              </li>
              <li>
                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-0.5">Cue Sheets</span>
                <a href="mailto:cuesheets@transitionmusic.com" className="hover:text-white transition-colors text-xs">
                  cuesheets@transitionmusic.com
                </a>
              </li>
            </ul>
          </div>

          {/* Address & Phone */}
          <div>
            <h4
              className="text-white font-semibold uppercase tracking-widest text-xs mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "oklch(0.72 0.18 52)" }}
            >
              Office
            </h4>
            <address className="not-italic text-gray-400 text-sm space-y-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
              <p>P.O. Box 2586<br />Toluca Lake, CA 91610</p>
              <p>
                <a href="tel:3238607074" className="hover:text-white transition-colors">
                  323.860.7074
                </a>
              </p>
              <p className="text-gray-600 text-xs">Fax: 323.860.7986</p>
            </address>

            <div className="mt-6">
              <h4
                className="text-white font-semibold uppercase tracking-widest text-xs mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "oklch(0.72 0.18 52)" }}
              >
                Music Search
              </h4>
              <a
                href="https://www.sourceaudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-xs transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Powered by SourceAudio →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-gray-600 text-xs" style={{ fontFamily: "'Barlow', sans-serif" }}>
            © {new Date().getFullYear()} Transition Music Corporation. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Toluca Lake, CA · Los Angeles
          </p>
        </div>
      </div>
    </footer>
  );
}
