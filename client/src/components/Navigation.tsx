/* 
 * Navigation Component — Transition Music Corporation
 * Design: Sticky dark nav with orange accent, logo left, links right
 * Mobile: Hamburger menu with slide-down drawer
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const TMC_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663378282072/dEY7EBsjzfkvLeHY8foBJU/tmc-logo-white-v4_4cd96a55.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Submit Music", href: "/submit" },
  { label: "Search Music", href: "/search" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(247,148,29,0.2)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <img
              src={TMC_LOGO}
              alt="Transition Music Corporation"
              className="h-8 lg:h-10 w-auto object-contain"
              style={{ filter: "brightness(1)" }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                  location === link.href
                    ? "tmc-orange"
                    : "text-gray-300 hover:text-white"
                }`}
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  letterSpacing: "0.08em",
                  fontSize: "0.8rem",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{
                transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{
                transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "400px" : "0",
          backgroundColor: "rgba(10,10,10,0.98)",
          borderTop: mobileOpen ? "1px solid rgba(247,148,29,0.2)" : "none",
        }}
      >
        <div className="container py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3 px-2 text-sm font-medium uppercase tracking-widest border-b border-gray-800 last:border-0 transition-colors ${
                location === link.href ? "tmc-orange" : "text-gray-300"
              }`}
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
