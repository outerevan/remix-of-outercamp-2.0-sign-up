import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: "./postcss.widget.config.js",
  },
  build: {
    outDir: "dist-widget",
    lib: {
      entry: path.resolve(__dirname, "src/widget/entry.tsx"),
      name: "OutercampWaitlist",
      formats: ["iife"],
      fileName: () => "outercamp-waitlist.js",
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: "outercamp-waitlist.[ext]",
      },
    },
  },
});
