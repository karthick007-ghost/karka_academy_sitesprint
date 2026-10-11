export function generateStaticParams() {
  return [{ slug: "mern-fullstack" }, { slug: "ai-data-science" }, { slug: "ui-ux-design" }];
}

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  return (
    <main className="container mx-auto min-h-screen px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-ink">Course: {slug}</h1>
      <p className="mt-4 text-ink-2">Detailed syllabus, real-time project requirements, and mentor allocation.</p>
    </main>
  );
}
