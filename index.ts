import express, { Router } from "express";
import cors from "cors";
//poniżej dla sync errors
import "express-async-errors";
import { ValidationError, handleError } from "./utils/errors";
import rateLimit from "express-rate-limit";
import { adRouter } from "./routers/ad.router";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

//zabezpieczenie na ilość pobranych danych w czasie
app.use(
  rateLimit({
    windowMs: 50 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
//Routes
const router = Router();

router.use("/ad", adRouter);
app.use("/api", router);
//globalna obsłóga błędów
app.use(handleError);

app.listen(3001, "0.0.0.0", () => [
  console.log("listening on 3001 at http://localhost:3001"),
]);
