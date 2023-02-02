import { NextFunction, Request, Response } from "express";

//klasa walidation error będzie słyżyła do oznaczania błędów walidacji - rozszeżamy ja o klasę Error
export class ValidationError extends Error {}

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  //jeśli to jest VAldationEror to zwracamy 400 albo 500 jak nie wiemy skąd pochodzi błąd - bo to wew błąd serwera
  res
    .status(err instanceof ValidationError ? 400 : 500)
    //zwracamy wiadomość
    .json({
      //jeśli błąd walidacji to dajemy takie info (przekażemy je w poszczegóonych funckjach) a jesli to inny bład to dajemy takie info, ograniczając zawartośc wiadomości z powodów cyberbezpieczeństwa - żeby nam nic nie wyciekło
      message:
        err instanceof ValidationError
          ? err.message
          : "Sory, please try again later",
    });
};
//jeśli to nei jest nasz błą to wypisujemy krótką informację
