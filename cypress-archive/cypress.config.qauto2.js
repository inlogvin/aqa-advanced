import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: "https://qauto2.forstudy.space",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      config.env = require("./cypress.env.qauto2.json");
      return config;
    },
  },
});
