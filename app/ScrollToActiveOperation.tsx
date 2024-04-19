"use client";

import { useEffect } from "react";

export const ScrollToActiveOperation = () => {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const element = document.getElementById("active-operation");

    if (!element) {
      return;
    }

    console.log("FOUND ELEMENT");

    element.scrollIntoView({ block: "center" });
  }, []);

  return <div />;
};
