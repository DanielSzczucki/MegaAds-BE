import { AdEntity } from "../types";
import { ValidationError } from "../utils/errors";

//tworzymy interface dodawania, w którym zrobimy id na nie wymagane
interface NewAdEntity extends Omit<AdEntity, "id"> {
  id?: string;
}

//robimy sobie typy do tej klasy
//nie musimy pisać public- jest domyslnie
export class AdRecord implements AdEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;

  constructor(obj: NewAdEntity) {
    //dodajemy walidację
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError(
        "Nazwa ogłószenia nie może byc pusta i przekraczać 100 znaków"
      );
    }

    if (obj.description.length > 1000) {
      throw new ValidationError(
        " Nazwa ogłoszenia nie może byc pusta, ani przekraczać 1000 znaki"
      );
    }

    if (obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError(
        "Cena nie może byc mniejsza niz 0 lub większa niż 9 999 999"
      );
    }

    //@TOTO: Check if URL is valid
    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError(
        "Link do ogłószenia nie może byc pusta i przekraczać 100 znaków"
      );
    }

    if (typeof obj.lat !== "number" || typeof obj.lon !== "number") {
      throw new ValidationError("Nie mozna zlokalizować ogłoszenia");
    }
    //jak wszystko pójdzie ok to przypisujemy wartości obiektu i klasy
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }
}
