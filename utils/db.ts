import mysql2 from "mysql2/promise";
import { config } from "../config/config";

//najlepiej nie przesyłać tego pliku na gita, bo zawiera on hasła itp, dodajemy go do git ignore
export const pool = mysql2.createPool({
  host: config.dbHost,
  user: config.dbUser,
  database: config.dbDatabase,
  password: config.dbPassword,
  namedPlaceholders: true,
  decimalNumbers: true,
});
