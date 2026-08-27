import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Storefront from "../app/Storefront";
import "../app/globals.css";

if (typeof document !== "undefined") {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Storefront />
    </StrictMode>,
  );
}
