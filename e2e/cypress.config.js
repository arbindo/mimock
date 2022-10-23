const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require("cy-verify-downloads");
const { Pool } = require("pg");

module.exports = defineConfig({
  projectId: "1j76yz",
  viewportWidth: 1280,
  viewportHeight: 1000,
  e2e: {
    retries: 1,
    baseUrl: "https://localhost:8080",
    experimentalStudio: true,
    defaultCommandTimeout: 15000,
    specPattern: "cypress/**/*.cy.{js,ts}",
    setupNodeEvents(on, config) {
      on("task", {
        ...verifyDownloadTasks,
        async queryTestDb(query, args = []) {
          const pool = new Pool({
            host: "localhost",
            port: 5432,
            user: "mimock",
            password: "ironclaw",
            database: "mimock_db",
          });

          const client = await pool.connect();
          let res = "";

          try {
            await client.query("BEGIN");
            res = await client.query(query, [...args]);
            await client.query("COMMIT");
            console.info(`Query ${query} executed successfully`);
          } catch (e) {
            console.error(e);
            await client.query("ROLLBACK");
            return Promise.reject(e);
          } finally {
            client.release();
          }

          return Promise.resolve(res);
        },
      });
    },
  },
});
