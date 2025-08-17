// app/projects/page.js
import { AnimatedProjects } from "@/components/ui/animated-projects";
import React from "react";

const Projects = () => {
  const projects = [
    {
    name: "Personal Portfolio Website",
    quote:
      "Responsive Next.js 14 portfolio with modern UI, interactive animations, SEO optimization, and dynamic project showcase.",
    src: "/images/portfolio.webp", // replace with actual screenshot file
    link: "https://yashdani.vercel.app",
    stack: ["Next.js", "React", "Tailwind", "Framer Motion"],
    createdDate: "2025",
    },
    {
      name: "HammerStrike — E-Auction Platform",
      quote:
        "Full-stack auction system with Spring Boot microservices, React UI, secure JDBC, live bidding, and Dockerized deployment.",
      src: "/images/hammerstrike.webp",
      link: "https://github.com/dani-yash/hammer-strike",
      stack: ["Java", "Spring Boot", "React", "MySQL", "Docker"],
      createdDate: "2024",
    },
    {
      name: "Fake News Spread Analysis",
      quote:
        "Graph + content modeling on large Twitter datasets: cascade analysis, sentiment/topic signals, and predictive regressors.",
      src: "/images/fake-news.webp",
      link: "https://github.com/dani-yash/fake-news-analysis",
      stack: ["Python", "NetworkX", "Transformers", "Scikit-learn"],
      createdDate: "2024",
    },
    {
      name: "Mentor–Mentee Matching",
      quote:
        "ML/NLP tool that forms groups for 300+ students with instant clustering, scheduling, and real-time edits.",
      src: "/images/mentor-mentee.webp",
      link: "https://github.com/dani-yash/mentor-mentee-matching",
      stack: ["Python", "Streamlit", "Pandas", "Scikit-learn"],
      createdDate: "2024",
    },
    {
      name: "CurateEd (Koru Hackathon)",
      quote:
        "AI research helper that filters sources and generates summaries, MCQs, and reflection prompts.",
      src: "/images/koru.webp",
      link: "https://github.com/dani-yash/koru-hackathon-PA3",
      stack: ["React", "Node", "Express", "Cohere API"],
      createdDate: "2025",
    },
  ];

  return <AnimatedProjects projects={projects} />;
};

export default Projects;
