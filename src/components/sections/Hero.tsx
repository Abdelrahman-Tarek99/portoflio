"use client";
import { Reveal } from "@/components/ui/Reveal";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [loadingError, setLoadingError] = useState(false);

  const texts = [
    "Computer Eng. Graduate",
    "Tech Enthusiast",
    "I build fast, accessible web apps.",
  ];

  useEffect(() => {
    // Load the Lottie animation data from the extracted JSON file
    const loadAnimation = async () => {
      try {
        console.log("Loading Lottie animation...");
        const response = await fetch("/animation.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Animation data loaded successfully:", data);
        setAnimationData(data);
        setLoadingError(false);
      } catch (error) {
        console.error("Failed to load Lottie animation:", error);
        setLoadingError(true);
        // Try to provide more helpful error information
        if (error instanceof Error) {
          console.error("Error details:", error.message);
        }
      }
    };

    loadAnimation();
  }, []);

  useEffect(() => {
    const currentText = texts[currentIndex];

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, currentIndex, isDeleting, texts]);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-16"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <div className="space-y-8 text-left">
          {/* Main Title */}
          <Reveal>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-foreground">Front End</span>{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Developer
              </span>
            </h1>
          </Reveal>

          {/* Animated Typing Text */}
          <Reveal delay={0.1}>
            <div className="h-16 flex items-center">
              <span className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </Reveal>

          {/* CTA Button - Download CV */}
          <Reveal delay={0.2}>
            <div className="pt-4 flex justify-start">
              <a
                href="/AbdelrahmanYounees_cv.pdf"
                download
                className="inline-flex items-center gap-3 ltr:mr-4 rtl:ml-4 rounded-xl bg-primary px-8 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Download className="w-6 h-6" />
                Download CV
              </a>
            </div>
          </Reveal>

          {/* Social Links */}
          <Reveal delay={0.3}>
            <div className="flex items-center gap-6 pt-6">
              <a
                href="https://github.com/Abdelrahman-Tarek99"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300 group hover:scale-110"
                aria-label="GitHub Profile"
              >
                <Github className="w-7 h-7 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/abdelrahman-tarek-7a5924199"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300 group hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-7 h-7 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="mailto:abdelrahmantarekk1999@gmail.com"
                className="p-4 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300 group hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-7 h-7 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="tel:01114443609"
                className="p-4 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300 group hover:scale-110"
                aria-label="Phone"
              >
                <Phone className="w-7 h-7 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Side - Lottie Animation */}
        <Reveal delay={0.4}>
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg">
              {animationData ? (
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  className="w-full h-auto"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : loadingError ? (
                <div className="w-full h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <p>Animation could not be loaded</p>
                    <p className="text-sm opacity-70">
                      Check console for details
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p>Loading animation...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
