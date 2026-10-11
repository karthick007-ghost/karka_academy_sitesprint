import type { MetadataRoute } from "next";
import { courses } from "@/content/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://karka.academy";

  const staticRoutes = [
    "",
    "/courses",
    "/pay-after-placement",
    "/placements",
    "/internships",
    "/for/college",
    "/for/graduates",
    "/for/switchers",
    "/for/professionals",
    "/for/school",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
  ];

  const courseRoutes = courses.map((c) => `/courses/${c.slug}`);

  const allRoutes = [...staticRoutes, ...courseRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : route.startsWith("/courses/") ? 0.8 : 0.7,
  }));
}
