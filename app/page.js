import { BentoGridThirdDemo } from "@/components/homeBentoGrid";
import React from "react";
import Script from "next/script";

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yash Dani",
    url: "https://yashdani.vercel.app", // TODO: update if your domain changes
    sameAs: [
      "https://github.com/dani-yash",
      "https://www.linkedin.com/in/yashdani-", // TODO: put your exact LinkedIn slug
    ],
    jobTitle: "Software Engineer",
    // removed worksFor to avoid stale employer info
  };

  return (
    <>
      <Script
        id="ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BentoGridThirdDemo />
    </>
  );
};

export default Home;
