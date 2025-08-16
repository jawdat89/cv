// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

const isDevelopment = process.env.NODE_ENV === "development";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      ...(isDevelopment && {
        devOptions: {
          enabled: true, // Enable PWA in development mode only
        },
      }),
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp("^https://api.github.com"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 300,
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    hmr: {},
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/store": path.resolve(__dirname, "./src/store"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/test": path.resolve(__dirname, "./src/test"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: isDevelopment, // Disable source maps in production for security
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    chunkSizeWarningLimit: 750, // Adjust the limit as needed
  },
});
