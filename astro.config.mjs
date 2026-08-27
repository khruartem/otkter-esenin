import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://otkter.ru",
  output: "static",
  trailingSlash: "always",

  vite: {
    plugins: [tailwindcss()],
  },
});
