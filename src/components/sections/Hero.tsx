import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Hero({
  title,
  subtitle,
  ctaProjects,
  ctaContact,
}: {
  title: string;
  subtitle: string;
  ctaProjects: string;
  ctaContact: string;
}) {
  return (
    <section
      id="hero"
      className="min-h-[80vh] flex flex-col items-center justify-center text-center gap-10 px-4 py-16"
    >
      {/* Profile Image - Large and prominent */}
      <Reveal>
        <div className="relative">
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 mx-auto mb-8">
            <Image
              src="/profile.jpg"
              alt="Abdelrahman Tarek"
              fill
              className="rounded-full object-cover border-4 border-primary/30 shadow-2xl"
              priority
            />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl opacity-60" />
            {/* Ring effect */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
          </div>
        </div>
      </Reveal>

      {/* Name and Title */}
      <Reveal delay={0.1}>
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>
      </Reveal>

      {/* CTA Buttons */}
      <Reveal delay={0.2}>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/AbdelrahmanYounees_cv.pdf"
            download
            className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Download className="w-6 h-6" />
            Download CV
          </a>
          <a
            href="#projects"
            className="inline-flex items-center rounded-xl border-2 border-primary/30 px-8 py-4 text-foreground font-semibold hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            {ctaProjects}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-xl border-2 border-primary/30 px-8 py-4 text-foreground font-semibold hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            {ctaContact}
          </a>
        </div>
      </Reveal>

      {/* Social Links */}
      <Reveal delay={0.3}>
        <div className="flex items-center gap-8 pt-6">
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
    </section>
  );
}
