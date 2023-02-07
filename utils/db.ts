import { createPool } from "mysql2/promise";

//najlepiej nie przesyłać tego pliku na gita, bo zawiera on hasła itp, dodajemy go do git ignore
export const pool = createPool({
  host: "localhost",
  user: "root",
  database: "megak_ads",
  namedPlaceholders: true,
  decimalNumbers: true,
});
