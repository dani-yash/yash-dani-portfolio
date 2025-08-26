"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import React, { useEffect, useState } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { FooterDock } from "./footerDock";
import { usePathname } from "next/navigation";
const loadingStates = [
  { text: "Spinning up the build pipeline" },
  { text: "Linting & checking types" },
  { text: "Compiling client + server" },
  { text: "Optimizing images & fonts" },
  { text: "Priming cache & prefetching routes" },
  { text: "Running quick smoke tests" },
  { text: "Pushing the deployment live" },
  { text: "All set — welcome!" },
];

const BaseLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const loadData = async () => {
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader loadingStates={loadingStates} loading={loading} duration={200} loop={false} />
      ) : (
        <>
          {pathname === "/journey" ? (
            <>
              <BackgroundBeamsWithCollision>
                {children}
                <FooterDock />
              </BackgroundBeamsWithCollision>
            </>
          ) : (
            <>
              <BackgroundBeamsWithCollision>
                {children}
                <FooterDock />
              </BackgroundBeamsWithCollision>
            </>
          )}
        </>
      )}
    </>
  );
};

export default BaseLayout;
