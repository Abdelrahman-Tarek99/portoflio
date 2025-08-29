"use client";
import Marquee from "react-fast-marquee";
import {
  Code2,
  FileCode,
  Palette,
  FileText,
  FileCode2,
  Route,
  Database,
  BookOpen,
  TestTube,
  TestTube2,
  Package,
  Github,
  Search,
  Layers,
  ShoppingCart,
} from "lucide-react";

export default function About({
  title,
  bio,
  skillsLabel,
  skills,
  highlights,
}: {
  title: string;
  bio: string;
  skillsLabel: string;
  skills: string[];
  highlights?: string[];
}) {
  // Define the technologies with their icons
  const technologies = [
    {
      name: "React",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.53 0-3.124.613-4.24 1.66L12 3.414l-.648-.44c-1.115-1.047-2.71-1.66-4.24-1.66C3.924 1.314 0 4.99 0 9.745c0 4.755 3.924 8.43 8.112 8.43 1.53 0 3.124-.613 4.24-1.66L12 16.076l.648.44c1.115 1.047 2.71 1.66 4.24 1.66C20.076 18.175 24 14.5 24 9.745c0-4.755-3.924-8.43-8.112-8.43z" />
        </svg>
      ),
    },
    { name: "JavaScript", icon: <FileCode className="w-5 h-5" /> },
    {
      name: "Next.js",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 4.317 8.296 8.908 9.695.779.234 1.62.422 2.748.528.302.028 1.898.028 2.199 0 1.128-.106 1.969-.294 2.748-.528 4.591-1.399 8.256-5.189 8.908-9.695.096-.659.108-.854.108-1.748s-.012-1.089-.108-1.748c-.652-4.506-4.317-8.296-8.908-9.695a12.253 12.253 0 0 0-2.748-.528C11.906.001 11.748 0 11.572 0zm5.069 7.217c.327 0 .593.266.593.593v1.61c0 .327-.266.593-.593.593H9.786c-.982 0-1.779.796-1.779 1.778v5.548c0 .327.266.593.593.593h5.548c.982 0 1.778-.796 1.778-1.778v-1.61c0-.327.266-.593.593-.593s.593.266.593.593v1.61c0 1.636-1.326 2.963-2.963 2.963H9.786c-1.636 0-2.963-1.327-2.963-2.963v-5.548c0-1.636 1.327-2.963 2.963-2.963h6.855z" />
        </svg>
      ),
    },
    { name: "Tailwind CSS", icon: <Palette className="w-5 h-5" /> },
    { name: "CSS", icon: <FileText className="w-5 h-5" /> },
    { name: "HTML", icon: <FileCode2 className="w-5 h-5" /> },
    { name: "React Hook Form", icon: <FileCode className="w-5 h-5" /> },
    { name: "React Router", icon: <Route className="w-5 h-5" /> },
    { name: "React TanStack", icon: <Database className="w-5 h-5" /> },
    { name: "React Storybook", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Jest", icon: <TestTube className="w-5 h-5" /> },
    { name: "React Testing", icon: <TestTube2 className="w-5 h-5" /> },
    { name: "npm", icon: <Package className="w-5 h-5" /> },
    { name: "GitHub", icon: <Github className="w-5 h-5" /> },
    { name: "React Query", icon: <Search className="w-5 h-5" /> },
    { name: "shadcn", icon: <Layers className="w-5 h-5" /> },
    { name: "Shopify", icon: <ShoppingCart className="w-5 h-5" /> },
  ];

  return (
    <section id="about" className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground">{bio}</p>
      {highlights && highlights.length > 0 && (
        <ul className="grid gap-2 list-disc pl-6 text-sm text-muted-foreground">
          {highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}
      <div>
        <h3 className="font-medium mb-4">{skillsLabel}</h3>
        <div className="relative overflow-hidden bg-vanta-purple-lighter/20 rounded-lg p-4 border border-vanta-purple-lighter/30">
          <Marquee
            speed={40}
            gradient={false}
            pauseOnHover={true}
            className="py-2"
          >
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="mx-4 px-4 py-3 rounded-full bg-vanta-purple-lighter/40 border border-vanta-purple-lighter/50 text-foreground-secondary font-medium whitespace-nowrap hover:bg-vanta-purple-lighter/60 hover:text-vanta-pink transition-all duration-300 flex items-center gap-2"
                title={tech.name}
              >
                <span className="text-vanta-pink">{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
