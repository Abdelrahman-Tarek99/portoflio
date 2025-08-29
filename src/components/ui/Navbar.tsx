"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";
import { animate } from "framer-motion";

type Section = "hero" | "about" | "projects" | "contact";

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const headerRef = useRef<HTMLElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<Record<Section, HTMLAnchorElement | null>>({
    hero: null,
    about: null,
    projects: null,
    contact: null,
  });

  // Callback refs to properly assign elements
  const setHeroRef = useCallback((el: HTMLAnchorElement | null) => {
    navItemRefs.current.hero = el;
  }, []);

  const setAboutRef = useCallback((el: HTMLAnchorElement | null) => {
    navItemRefs.current.about = el;
  }, []);

  const setProjectsRef = useCallback((el: HTMLAnchorElement | null) => {
    navItemRefs.current.projects = el;
  }, []);

  const setContactRef = useCallback((el: HTMLAnchorElement | null) => {
    navItemRefs.current.contact = el;
  }, []);

  useEffect(() => {
    if (document.readyState === "complete") {
      setVisible(true);
      return;
    }
    const onLoad = () => setVisible(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Update underline position when active section changes
  useEffect(() => {
    const activeItem = navItemRefs.current[activeSection];
    if (activeItem && navItemsRef.current) {
      const navRect = navItemsRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const left = itemRect.left - navRect.left;
      const width = itemRect.width;

      setUnderlineStyle({ left, width });
    }
  }, [activeSection]);

  // Intersection Observer to detect which section is in view
  useEffect(() => {
    // Wait a bit for the DOM to be fully ready
    const timer = setTimeout(() => {
      const sections = ["hero", "about", "projects", "contact"] as Section[];
      const observers: IntersectionObserver[] = [];

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (section) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setActiveSection(sectionId);
              }
            },
            {
              threshold: 0.3,
              rootMargin: "-20% 0px -20% 0px",
            }
          );
          observer.observe(section);
          observers.push(observer);
        }
      });

      // Also check scroll position to handle when user is at the very top
      const handleScroll = () => {
        if (window.scrollY < 100) {
          setActiveSection("hero");
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial position

      // Fallback: If no sections are found, ensure hero is active
      setTimeout(() => {
        if (!document.getElementById("hero")) {
          // Try to find it again after a delay
          const heroSection = document.getElementById("hero");
          if (heroSection) {
            setActiveSection("hero");
          }
        }
      }, 500);

      return () => {
        observers.forEach((observer) => observer.disconnect());
        window.removeEventListener("scroll", handleScroll);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = headerRef.current?.getBoundingClientRect().height ?? 0;
    const targetTop =
      el.getBoundingClientRect().top + window.scrollY - headerH - 8;

    const controls = animate(window.scrollY, targetTop, {
      duration: 0.8,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (latest) => window.scrollTo(0, latest),
    });

    return () => controls.stop();
  }

  if (!visible) return null;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-vanta-purple-lighter/30 bg-vanta-purple-light/80 backdrop-blur"
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href={`/${locale}`}
          className="font-bold text-lg text-foreground hover:text-vanta-pink transition-colors"
        >
          {t("hero.title")}
        </Link>

        <div
          ref={navItemsRef}
          className="relative flex items-center gap-6 text-sm"
        >
          <a
            ref={setHeroRef}
            href="#hero"
            onClick={(e) => handleAnchorClick(e, "hero")}
            className={`relative px-3 py-2 transition-colors ${
              activeSection === "hero"
                ? "text-vanta-pink font-medium"
                : "text-foreground-secondary hover:text-vanta-pink"
            }`}
          >
            {t("nav.hero")}
          </a>

          <a
            ref={setAboutRef}
            href="#about"
            onClick={(e) => handleAnchorClick(e, "about")}
            className={`relative px-3 py-2 transition-colors ${
              activeSection === "about"
                ? "text-vanta-pink font-medium"
                : "text-foreground-secondary hover:text-vanta-pink"
            }`}
          >
            {t("nav.about")}
          </a>

          <a
            ref={setProjectsRef}
            href="#projects"
            onClick={(e) => handleAnchorClick(e, "projects")}
            className={`relative px-3 py-2 transition-colors ${
              activeSection === "projects"
                ? "text-vanta-pink font-medium"
                : "text-foreground-secondary hover:text-vanta-pink"
            }`}
          >
            {t("nav.projects")}
          </a>

          <a
            ref={setContactRef}
            href="#contact"
            onClick={(e) => handleAnchorClick(e, "contact")}
            className={`relative px-3 py-2 transition-colors ${
              activeSection === "contact"
                ? "text-vanta-pink font-medium"
                : "text-foreground-secondary hover:text-vanta-pink"
            }`}
          >
            {t("nav.contact")}
          </a>

          {/* Animated underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-vanta-pink to-vanta-pink-light transition-all duration-300 ease-out"
            style={{
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
            }}
          />
        </div>
      </nav>
    </header>
  );
}
