import express, { json } from "express";
import cors from "cors";
//poniżej dla sync errors
import "express-async-errors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(json());

app.listen(3001, "0.0.0.0", () => [
  console.log("listening on 3001 at http://localhost:3001"),
]);
