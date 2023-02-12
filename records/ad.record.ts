import { FieldPacket } from "mysql2";
import { AdEntity, NewAdEntity, SimpleAdEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from "uuid";

//typ potrzebny do iokreslenia rezultatu zwracanego z db w getOne
type AdRecordResult = [AdEntity[], FieldPacket[]];

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
    // dodajemy walidację
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError(
        "Nazwa ogłószenia nie może byc pusta i przekraczać 100 znaków"
      );
    }

    if (obj.description.length > 1000) {
      throw new ValidationError(
        " Nazwa ogłoszenia nie może byc pusta, ani przekraczać 1000 znaków"
      );
    }

    if (obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError(
        "Cena nie może byc mniejsza niz 0 lub większa niż 9 999 999"
      );
    }

    // @TOTO: Check if URL is valid
    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError(
        "Link do ogłószenia nie może byc pusta i przekraczać 100 znaków"
      );
    }

    if (typeof obj.lat !== "number" || typeof obj.lon !== "number") {
      throw new ValidationError("Nie mozna zlokalizować ogłoszenia");
    }
    // jak wszystko pójdzie ok to przypisujemy wartości obiektu i klasy
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }

  //statyczna metoda pobierz jeden rekord wg id
  static async getOne(id: string): Promise<AdRecord | null> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE id = :id",
      {
        id,
      }
    )) as AdRecordResult; //musimy tak zrobic zęby ts dal spokój

    return results.length === 0 ? null : new AdRecord(results[0]);
  }

  static async findAll(name: string): Promise<SimpleAdEntity[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE `name` LIKE :search",
      {
        search: `%${name}%`,
      }
    )) as AdRecordResult;

    return results.map((result) => {
      const { id, lat, lon } = result;
      return {
        id,
        lat,
        lon,
      };
    });
  }

  async insert(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error("Cannot insert something that is already inserted!");
    }

    await pool.execute(
      "INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES (:id, :name, :description, :price, :url, :lat, :lon)",
      this
    );
  }
}
