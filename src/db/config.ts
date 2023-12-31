import { config } from "dotenv";

//leemos las variables de entorno
config();

//en caso de que las utilizamos para conectarnos a la base de datos, osino utilizamos la nuestra

export const dbUser = process.env.DB_USER || "luis";
export const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
export const dbPassword = process.env.DB_PASSWORD || "villalba1password";
export const dbHost = process.env.DB_HOST || "localhost";
export const dbName = process.env.DB_NAME || "barcelona_liga";