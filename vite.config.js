// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// Determine if we are in development mode
var isDevelopment = process.env.NODE_ENV === "development";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
