import { getTranslations } from "next-intl/server";
import { fetchProjects } from "@/features/projects/github";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ProjectsSection from "@/components/sections/Projects";
import ContactSection from "@/components/sections/Contact";
import { type AppLocale } from "@/features/i18n/locales";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const projects = await fetchProjects("auto");

  return (
    <main className="container mx-auto px-4 space-y-16">
      <Hero />
      <hr />
      <About
        title={t("about.title")}
        bio={t("about.bio")}
        skillsLabel={t("about.skills")}
        highlights={t.raw("about.highlights") as string[]}
      />
      <hr />
      <ProjectsSection
        title={t("projects.title")}
        projects={projects}
        starsLabel={t("projects.stars")}
      />
      <hr />
      <ContactSection title={t("contact.title")} />
    </main>
  );
}
