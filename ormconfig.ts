require("dotenv").config();

module.exports = {
   type: process.env.DB_DIALECT,
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   synchronize: false,
   logging: true,
   entities: [
    "src/app/models/entities/**/*.ts",
   ],
   migrations: [
      "src/migration/**/*.ts",
   ],
   cli: {
      entitiesDir: "src/app/models/entities",
      migrationsDir: "src/migration",
   },
};
