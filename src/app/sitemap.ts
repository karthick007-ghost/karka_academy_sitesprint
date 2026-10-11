import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://karka.academy";

  const routes = [
    "",
    "/courses",
    "/courses/mern-fullstack",
    "/courses/ai-data-science",
    "/courses/ui-ux-design",
    "/pay-after-placement",
    "/placements",
    "/internships",
    "/for/school-students",
    "/for/college-students",
    "/for/graduates",
    "/for/professionals",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
