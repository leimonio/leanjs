import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: false,
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
  build: {
    transpile: ["@leanjs/e2e-test-subjects-package-runtime-shared"],
  },
});
