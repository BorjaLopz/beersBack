import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import chalk from "chalk";

//Handle Errors
import { generalError, error404 } from "./middlewares/handleErrors.js";

//Controllers
import {
  getAllBeersController,
  getBeerByIDController,
  getBeerByBrandController,
  getBeerByCountryController,
  getBeerByStyleController,
  getBeerByGraduationController,
  addNewBeerController,
} from "./controllers/beers.js";

//dotEnv config
dotenv.config();

//Server
const app = new express(); //Cremos instancia de express
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Public Folder
app.use(express.static("public"));

//App Routes

/* Obtencion de todas las botellas */
app.get("/beers/all", getAllBeersController);

/* Obtencion de botellas por id */
app.get("/beer/id/:id", getBeerByIDController);

/* Obtencion de botellas por marca */
app.get("/beer/brand/:brand", getBeerByBrandController);

/* Obtencion de botellas por pais */
app.get("/beer/country/:country", getBeerByCountryController);

/* Obtencion de botellas por estilo */
app.get("/beer/style/:style", getBeerByStyleController);

/* Obtencion de botellas por estilo */
app.get("/beer/graduation/:graduation", getBeerByGraduationController);

/* Añadir nueva cerveza */
app.post("/beer/add", addNewBeerController);

/* HANDLE ERRORS*/

app.use(error404);
app.use(generalError);

/* SERVER */
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, async () => {
  console.log(
    chalk.green(
      `\nApp listening on port ${PORT}\nDB: ${process.env.DB_DATABASE}\n`
    )
  );
});

///////////////////////////////////////

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";

// dotenv.config();

// const app = new express();
// // app.use(cors);

// app.use(bodyParser.json());

// app.get("/prueba", (req, res) => {
//   res.send({
//     status: "ok",
//     message: "estamos haciendo una prueba",
//   });
// });

// app.listen(process.env.APP_PORT, async () => {
//   console.log(
//     `\nApp listening on port ${process.env.APP_PORT}\nDB: ${process.env.DB_DATABASE}\n`
//   );
// });
