import express, { json } from "express";
import cors from "cors";
//poniżej dla sync errors
import "express-async-errors";
import { ValidationError, handleError } from "./utils/errors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(json());

//Routes

app.get("/", async (req, res) => {
  throw new Error("Daamn!");
});

//globalna obsłóga błędów
app.use(handleError);

app.listen(3001, "0.0.0.0", () => [
  console.log("listening on 3001 at http://localhost:3001"),
]);
