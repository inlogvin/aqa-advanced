import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer.js";


export default defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
