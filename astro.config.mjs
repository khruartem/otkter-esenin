import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://esenin-play.otkter.ru/",
  output: "static",
  trailingSlash: "always",

  vite: {
    plugins: [tailwindcss()],
  },
});
