import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { inject } from '@vercel/analytics';

// Vercel Web Analytics をページに追加する関数を定義
function addWebAnalytics() {
  inject();
}

// Vite の設定を定義
export default defineConfig({
  base: "./",
  css: {
    devSourcemap: true,
  },
  plugins: [vue()],
});

// Web Analytics をページに追加する関数をエクスポート
export { addWebAnalytics };
