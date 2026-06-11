import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
