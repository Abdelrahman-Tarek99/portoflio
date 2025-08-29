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
        <h3 className="font-medium mb-2">{skillsLabel}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-md border px-2 py-1 text-sm">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
