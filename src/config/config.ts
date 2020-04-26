const config = {
  development: {
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
  }
};
export { config };
