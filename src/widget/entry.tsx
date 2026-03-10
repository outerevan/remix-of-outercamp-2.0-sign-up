import React from "react";
import ReactDOM from "react-dom/client";
import { WaitlistForm } from "../components/WaitlistForm";
import "./widget.css";

/**
 * Widget entry point — mounts the WaitlistForm into any
 * <div id="outercamp-waitlist" data-supabase-url="..." data-supabase-key="..." data-variant="dark">
 */
function mount() {
  const targets = document.querySelectorAll<HTMLElement>(
    "[data-outercamp-waitlist]"
  );

  targets.forEach((el) => {
    // Prevent double-mounting
    if (el.dataset.mounted === "true") return;
    el.dataset.mounted = "true";

    const supabaseUrl = el.dataset.supabaseUrl || "";
    const supabaseAnonKey = el.dataset.supabaseKey || "";
    const variant = (el.dataset.variant as "light" | "dark") || "dark";

    const root = ReactDOM.createRoot(el);
    root.render(
      <React.StrictMode>
        <WaitlistForm
          variant={variant}
          supabaseUrl={supabaseUrl}
          supabaseAnonKey={supabaseAnonKey}
        />
      </React.StrictMode>
    );
  });
}

// Auto-mount on DOMContentLoaded, or immediately if already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}

// Expose mount globally so WP can re-mount after AJAX page loads
(window as any).OutercampWaitlist = { mount };
