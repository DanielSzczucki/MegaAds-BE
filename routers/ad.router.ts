// import { Router } from "express";
// import { AdRecord } from "../records/ad.record";

// export const adRouter = Router()
//   //:name? to zapis parametru opcjonalnego
//   //dodaliśmy róeniez zapis któy sprawi że jak wejdziemy na sam search to, jęlsi nić tam nie będzie to zwróci pósty string

//   .get("/search/:name?", async (req, res) => {
//     const ads = await AdRecord.findAll(req.params.name ?? "");
//     res.json(ads);
//   })

//   //endpoint dla szczegółowych INFORMACJI DOTYCZĄCYCH Pinezki
//   .get("/:id", async (req, res) => {
//     const ad = await AdRecord.getOne(req.params.id);
//     res.json(ad);
//   })

//   //dodanie pojedyńczego ogłoszenia, dane są pzrezyłane z frontu za pomoca jsona, znajdziemy je w req.boy
//   .post("/", async (req, res) => {
//     const ad = new AdRecord(req.body);

//     await ad.insert();
//     res.json(ad);
//   });
// //statyczne metody dotycza ogółu zbioru, niestatyczne dotyczą pojedynczego elementu, są wykonywane na obiekcie

import { Router } from "express";
import { AdRecord } from "../records/ad.record";

export const adRouter = Router()
  .get("/search/:name?", async (req, res) => {
    const ads = await AdRecord.findAll(req.params.name ?? "");
    res.json(ads);
  })

  .get("/:id", async (req, res) => {
    const ad = await AdRecord.getOne(req.params.id);
    res.json(ad);
  })

  .post("/", async (req, res) => {
    console.log(req.body);

    const ad = new AdRecord(req.body);

    await ad.insert();
    res.json(ad);
  });
