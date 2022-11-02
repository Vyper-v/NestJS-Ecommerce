export default function configuration() {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
      uri: process.env.DATABASE_URI,
    },
    session: {
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    },
    auth: {
      jwt: {
        secret: process.env.JWT_SECRET,
      },
    },
  };
}
