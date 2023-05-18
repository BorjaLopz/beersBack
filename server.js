const express = require("express");

const bodyParser = require("body-parser");

require("dotenv").config();

const chalk = require("chalk");

const { generalError, error404 } = require("./middlewares/handleErrors");
const {
  getAllBeersController,
  getBeerByIDController,
  getBeerByBrandController,
  getBeerByCountryController,
  getBeerByStyleController,
  getBeerByGraduationController,
} = require("./controllers/beers");

const app = new express(); //Cremos instancia de express

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

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


/* HANDLE ERRORS*/

app.use(error404);
app.use(generalError);

/* SERVER */
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, async () => {
  console.log(
    chalk.green(
      `\nApp listening on port ${PORT}\nDB: ${process.env.DB_DATABASE}`
    )
  );
});
