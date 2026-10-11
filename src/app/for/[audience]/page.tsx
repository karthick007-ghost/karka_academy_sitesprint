export function generateStaticParams() {
  return [
    { audience: "school-students" },
    { audience: "college-students" },
    { audience: "graduates" },
    { audience: "professionals" },
  ];
}

interface AudiencePageProps {
  params: Promise<{ audience: string }>;
}

export default async function AudiencePage({ params }: AudiencePageProps) {
  const { audience } = await params;
  return (
    <main className="container mx-auto min-h-screen px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-ink">Programs for {audience}</h1>
      <p className="mt-4 text-ink-2">Tailored learning paths designed for your background and career goals.</p>
    </main>
  );
}
