"use client";

import { useEffect, useMemo, useState } from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

export const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "pointer",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

// Minimal doc links for the slugs we use.
// If a slug is missing here, we’ll fall back to a Google “docs” search.
const ICON_LINKS = {
  // Languages
  java: "https://www.oracle.com/java/",
  python: "https://www.python.org/",
  c: "https://en.cppreference.com/w/c",
  javascript: "https://developer.mozilla.org/docs/Web/JavaScript",
  kotlin: "https://kotlinlang.org/",
  elixir: "https://elixir-lang.org/",

  // Frontend
  react: "https://react.dev/",
  nextdotjs: "https://nextjs.org/docs",
  html5: "https://developer.mozilla.org/docs/Web/HTML",
  css3: "https://developer.mozilla.org/docs/Web/CSS",
  graphql: "https://graphql.org/",

  // Backend
  nodedotjs: "https://nodejs.org/en/docs",
  express: "https://expressjs.com/",
  springboot: "https://spring.io/projects/spring-boot",

  // QA / Automation
  selenium: "https://www.selenium.dev/",
  appium: "https://appium.io/",
  junit5: "https://junit.org/junit5/",
  cucumber: "https://cucumber.io/",
  postman: "https://www.postman.com/",
  testrail: "https://www.gurock.com/testrail/", // may not render if icon missing
  browserstack: "https://www.browserstack.com/",
  saucelabs: "https://saucelabs.com/",
  randoop: "https://randoop.github.io/randoop/", // may not render if icon missing

  // DevOps / Tools
  jenkins: "https://www.jenkins.io/",
  circleci: "https://circleci.com/",
  git: "https://git-scm.com/",
  github: "https://docs.github.com/",
  docker: "https://docs.docker.com/",
  kubernetes: "https://kubernetes.io/docs/home/",
  apachemaven: "https://maven.apache.org/",
  gradle: "https://gradle.org/",
  linux: "https://www.kernel.org/doc/html/latest/",
  jira: "https://support.atlassian.com/jira-software-cloud/",
  figma: "https://help.figma.com/hc/en-us",

  // Data / ML / DB
  numpy: "https://numpy.org/",
  pandas: "https://pandas.pydata.org/",
  scikitlearn: "https://scikit-learn.org/",
  huggingface: "https://huggingface.co/docs/transformers",
  spacy: "https://spacy.io/",
  seaborn: "https://seaborn.pydata.org/", // may not render if icon missing
  networkx: "https://networkx.org/", // may not render if icon missing
  apachespark: "https://spark.apache.org/",
  mysql: "https://www.mysql.com/",
  mongodb: "https://www.mongodb.com/",
};

function hrefFor(icon) {
  const slug = icon.slug || icon.title?.toLowerCase().replace(/\s+/g, "");
  return (
    ICON_LINKS[slug] ||
    `https://www.google.com/search?q=${encodeURIComponent(icon.title + " docs")}`
  );
}

export const renderCustomIcon = (icon) => {
  const bgHex = "#080510";
  const fallbackHex = "#ffffff";
  const minContrastRatio = 2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: hrefFor(icon),
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": icon.title,
    },
  });
};

export function IconCloud({ iconSlugs }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon));
  }, [data]);

  return <Cloud {...cloudProps}>{renderedIcons}</Cloud>;
}
