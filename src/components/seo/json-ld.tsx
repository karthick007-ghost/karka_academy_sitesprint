import React from "react";
import { siteConfig } from "@/content/site";
import { Course } from "@/content/schema";
import { Faq } from "@/content/schema";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: "https://karka.academy",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Karka Software Academy",
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.state,
      postalCode: "629001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.geo.lat,
      longitude: siteConfig.contact.geo.lng,
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.leadership.founder,
      jobTitle: siteConfig.leadership.role,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CourseJsonLd({ course }: { course: Course }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      sameAs: "https://karka.academy",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["onsite", "online"],
      courseWorkload: course.duration,
      location: {
        "@type": "Place",
        name: "Karka Academy Nagercoil Campus",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nagercoil",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      },
    },
    offers: {
      "@type": "Offer",
      category: course.track === "fullstack" ? "Pay After Placement" : "Tuition",
      price: course.track === "fullstack" ? "0" : "Contact for fees",
      priceCurrency: "INR",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
