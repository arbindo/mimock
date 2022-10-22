const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require("cy-verify-downloads");
const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "mimock",
  password: "ironclaw",
  database: "mimock_db",
});

module.exports = defineConfig({
  projectId: "1j76yz",
  e2e: {
    baseUrl: "https://localhost:8080",
    experimentalStudio: true,
    specPattern: "cypress/**/*.cy.{js,ts}",
    setupNodeEvents(on, config) {
      on("task", {
        ...verifyDownloadTasks,
        async queryTestDb(query, args = []) {
          await pool.connect();
          const res = await pool.query(query, [...args]);
          return res;
        },
      });
    },
  },
});
