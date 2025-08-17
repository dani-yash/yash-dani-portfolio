"use client";
import { Timeline } from "@/components/ui/timeline";
import React from "react";

const Journey = () => {
  const experience = [
    {
      start: "Jun 2024",
      end: "Present",
      role: "Sales Consultant",
      company: "Bell",
      location: "Toronto, Ontario, Canada",
      logo: "/images/logos/bell.webp",
      bullets: [
        "Hit 200% of sales targets via tailored bundles and add-ons.",
        "Built repeat-customer pipeline; drove 20+ five-star Google reviews.",
        "Mentored new hires and resolved escalations to retain trust.",
      ],
    },
    {
      start: "Sep 2023",
      end: "Dec 2023",
      role: "Technology Sales Associate",
      company: "The Source",
      location: "Toronto, Ontario, Canada",
      logo: "/images/logos/thesource.webp",
      bullets: [
        "Matched customers to plans and devices; upsold accessories.",
        "Maintained store readiness with merchandising and inventory tasks.",
        "Coached peers on objection handling to lift close rates.",
      ],
    },
    {
      start: "Jan 2023",
      end: "Aug 2023",
      role: "QA Automation Engineer (Co-op)",
      company: "The Score",
      location: "Toronto, Ontario, Canada",
      logo: "/images/logos/thescore.webp",
      bullets: [
        "Automated end-to-end credit-payment flows with Kotlin, Selenium, Cucumber (100% coverage).",
        "Refactored 50+ tests to fix flakiness and improve maintainability.",
        "Maintained >98% pass rate; regression tested in agile sprints; logged defects in TestRail/Jira; validated cross-browser via BrowserStack.",
        "Integrated Jenkins & CircleCI pipelines across 8+ releases; unblocked failing builds.",
        "Authored IDE setup guide (cut onboarding by ~50%); co-led hackathon features that won “Best Presentation”.",
      ],
    },
    {
      start: "Oct 2022",
      end: "Dec 2022",
      role: "Peer Tutor",
      company: "York University",
      location: "Toronto, Ontario, Canada",
      logo: "/images/logos/york.webp",
      bullets: [
        "Tutored first-year students in Calculus, Linear Algebra, Probability, and Discrete Math.",
        "Helped classmates from diverse majors build problem-solving confidence through visuals and step-by-step practice.",
      ],
    },
    {
      start: "Feb 2022",
      end: "Nov 2022",
      role: "Sales Ambassador",
      company: "Neo Financial",
      location: "Toronto, Ontario, Canada",
      logo: "/images/logos/neo.webp",
      bullets: [
        "Exceeded sales targets by 50%+ through proactive outreach and pitching.",
        "Deployed to underperforming sites to turn sales around; coached teammates.",
        "Delivered consistent results under pressure in fast-paced, target-driven environments.",
      ],
    },
    {
      start: "Jan 2022",
      end: "Mar 2022",
      role: "Finance Coordinator",
      company: "Hemoglobal @ York University",
      location: "Toronto, Ontario, Canada",
      logo: "/images/logos/hemoglobal.webp",
      bullets: [
        "Secured local grants and sponsorships for children’s initiatives.",
        "Assisted budgeting and event planning; tracked spend vs. plan.",
      ],
    },
  ];

  const education = [
    {
      start: "Sep 2020",
      end: "Dec 2024",
      role: "B.Sc. Computer Science (Specialized Honours)",
      company: "Lassonde School of Engineering, York University",
      location: "Toronto, Ontario, Canada",
      logo: "/images/logos/york.webp",
      bullets: [
        "International Scholarship of Merit, awarded for academic excellence.",
        "Relevant coursework: Data Structures & Algorithms, Software Design, OS, Databases, Networks, Big Data, ML, AI.",
      ],
    },
  ];

  return (
    <div className="w-full">
      <Timeline experience={experience} education={education} />
    </div>
  );
};

export default Journey;
