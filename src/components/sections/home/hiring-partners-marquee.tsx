"use client";

import React from "react";

export interface HiringPartner {
  name: string;
  sector: string;
  gradient: string;
  badgeBg: string;
  logo: React.ReactNode;
}

const HIRING_PARTNERS: HiringPartner[] = [
  {
    name: "Amazon",
    sector: "Cloud & E-Commerce",
    gradient: "from-amber-500/20 to-orange-500/10",
    badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 15C10 18 15 18 19 14.5"
          stroke="#F59E0B"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M17.5 12.5L20 14L18.5 16.5"
          stroke="#F59E0B"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 7L12 13M12 7L15 13"
          stroke="#EB5E28"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Tata Consultancy Services",
    sector: "Global IT Services",
    gradient: "from-sky-500/20 to-blue-600/10",
    badgeBg: "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
          stroke="#0284C7"
          strokeWidth="1.8"
          fill="#0284C7"
          fillOpacity="0.15"
        />
        <path
          d="M12 7V17M8 10L16 14M8 14L16 10"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "HCL Technologies",
    sector: "Enterprise Cloud & AI",
    gradient: "from-indigo-500/20 to-purple-600/10",
    badgeBg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="#6366F1"
          strokeWidth="1.8"
          fill="#6366F1"
          fillOpacity="0.12"
        />
        <path
          d="M8 8V16M16 8V16M8 12H16"
          stroke="#818CF8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Matrimony.com",
    sector: "Consumer Internet Tech",
    gradient: "from-rose-500/20 to-burgundy/15",
    badgeBg: "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 19S5 14 5 9.5C5 6.5 7.5 4.5 10 5.5C11 6 12 7 12 7C12 7 13 6 14 5.5C16.5 4.5 19 6.5 19 9.5C19 14 12 19 12 19Z"
          fill="#E11D48"
          fillOpacity="0.25"
          stroke="#E11D48"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="11" r="2" fill="#722030" />
      </svg>
    ),
  },
  {
    name: "Novac Technology Solutions",
    sector: "FinTech & Cloud Platforms",
    gradient: "from-emerald-500/20 to-teal-600/10",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-positive-text",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 18L10 6L14 18L18 6"
          stroke="#15803D"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="6" r="1.5" fill="#4ADE80" />
        <circle cx="14" cy="18" r="1.5" fill="#4ADE80" />
      </svg>
    ),
  },
  {
    name: "Capecom Solutions",
    sector: "Maritime & Enterprise Software",
    gradient: "from-cyan-500/20 to-blue-500/10",
    badgeBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="#0891B2" strokeWidth="1.8" fill="#0891B2" fillOpacity="0.1" />
        <path
          d="M12 7L14 12L12 17L10 12L12 7Z"
          fill="#06B6D4"
          stroke="#0891B2"
          strokeWidth="1.2"
        />
        <circle cx="12" cy="12" r="1.5" fill="#FBF8F1" />
      </svg>
    ),
  },
  {
    name: "Flow Global",
    sector: "UK FinTech Lending Engine",
    gradient: "from-purple-500/20 to-violet-600/10",
    badgeBg: "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 8C5 8 4 10 4 12C4 14 5 16 8 16C12 16 12 8 16 8C19 8 20 10 20 12C20 14 19 16 16 16C12 16 12 8 8 8Z"
          stroke="#9333EA"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Sodisys",
    sector: "Core Software & Automation",
    gradient: "from-amber-500/20 to-saffron/15",
    badgeBg: "bg-saffron/10 border-saffron/30 text-saffron-ink dark:text-saffron",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 4L19 8V16L12 20L5 16V8L12 4Z"
          stroke="#EB5E28"
          strokeWidth="1.8"
          fill="#EB5E28"
          fillOpacity="0.15"
        />
        <path d="M12 4V12M12 12L19 16M12 12L5 16" stroke="#EB5E28" strokeWidth="1.8" />
      </svg>
    ),
  },
];

export function HiringPartnersMarquee() {
  // Concatenate array for a seamless infinite loop
  const duplicated = [...HIRING_PARTNERS, ...HIRING_PARTNERS];

  return (
    <div
      role="region"
      aria-label="Alumni Hiring Partners Marquee"
      className="group relative w-full overflow-hidden select-none py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      {/* Moving track gliding smoothly from LEFT TO RIGHT */}
      <div className="flex w-max shrink-0 items-center gap-4 sm:gap-6 animate-marquee-reverse group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] py-2">
        {duplicated.map((partner, idx) => (
          <div
            key={`${partner.name}-${idx}`}
            className="inline-flex items-center gap-3.5 rounded-2xl border border-ui/20 bg-elev/90 hover:bg-elev px-4 py-2.5 shadow-subtle backdrop-blur-md hover:border-accent/50 hover:shadow-md transition-all duration-200"
          >
            {/* Logo Emblem Icon */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${partner.badgeBg} shadow-inner transition-transform duration-200 group-hover:scale-105`}
            >
              {partner.logo}
            </div>

            {/* Partner Meta */}
            <div className="flex flex-col text-left">
              <span className="text-sm sm:text-base font-bold text-primary tracking-tight whitespace-nowrap">
                {partner.name}
              </span>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-positive-text animate-pulse" />
                <span className="text-[11px] font-medium text-muted whitespace-nowrap">
                  {partner.sector}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HiringPartnersMarquee;
