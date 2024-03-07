import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { inject } from '@vercel/analytics';

inject(); // Vercel Web Analytics のスクリプトをページに追加

// Vite の設定を定義
export default defineConfig({
  base: "./",
  css: {
    devSourcemap: true,
  },
  plugins: [vue()],
});
