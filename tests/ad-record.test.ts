import { AdRecord } from "../records/ad.record";
import { pool } from "../utils/db";

afterAll(async () => {
  await pool.end();
});

//tworzymy domyslny obiekt z którego będziemy korzystać w każdym tescie
const defaultObj = {
  name: "test name",
  description: "blah",
  url: "https://megak.pl",
  price: 0,
  lat: 9,
  lon: 9,
};

//sprawdzamy obsłóge błędów
test("Can build AdRecord", () => {
  //tworzymy w tej funkcji nasz obiekt
  const ad = new AdRecord(defaultObj);

  expect(ad.name).toBe("test name");
  expect(ad.description).toBe("blah");
});

//testujemy każdą z cześci objektu odzielnie

test("Validates invalid price", () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        price: -3,
      })
  ).toThrow("Cena nie może byc mniejsza niz 0 lub większa niż 9 999 999");
});

//@TODO: Check all the Validations
