import React from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { EmbedEditor } from "./embed-editor";
import { LocaleProvider } from "@/i18n";
import { ThemeProvider } from "@/theme";
import "@/app-globals.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element #root not found");
}

// Theme + locale are resolved inside their providers. ThemeProvider
// owns the `<html class="dark">` toggle and (when running embedded)
// subscribes to `hub.app.theme`; LocaleProvider mirrors `hub.app.locale`
// onto the React tree. No bootstrap-time class flipping needed.
createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <TooltipProvider>
          <Toaster />
          <EmbedEditor />
        </TooltipProvider>
      </LocaleProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
