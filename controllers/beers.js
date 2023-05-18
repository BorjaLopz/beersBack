const chalk = require("chalk");
const {
  getAllBeers,
  getBeerByID,
  getBeerByBrand,
  getBeerByCountry,
  getBeerByStyle,
  getBeerByGraduation,
} = require("../db/beers.js");
const { generateError } = require("../helpers.js")

const getAllBeersController = async (req, res, next) => {
  try {
    const beers = await getAllBeers();

    if(beers.length === 0) {
      throw generateError("No hay cervezas aún. ", 400)
    }
    res.send({
      status: "ok",
      conteo: beers.length,
      data: beers,
    });
  } catch (e) {
    next(e);
  }
}

const getBeerByIDController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const beers = await getBeerByID(id);

    if (beers.length === 0) {
      throw generateError("No hay cervezas aún con ese id. ", 400);
    }
    res.send({
      status: "ok",
      data: beers,
    });
  } catch (e) {
    next(e);
  }
}

const getBeerByBrandController = async (req, res, next) => {
  try {
    const brand = req.params.brand;
    const beers = await getBeerByBrand(brand);

    if (beers.length === 0) {
      throw generateError("No hay cervezas aún de esa marca. ", 400);
    }
    res.send({
      status: "ok",
      conteo: beers.length,
      data: beers,
    });
  } catch (e) {
    next(e);
  }
};

const getBeerByCountryController = async (req, res, next) => {
  try {
    const country = req.params.country;
    const beers = await getBeerByCountry(country);

    if (beers.length === 0) {
      throw generateError("No hay cervezas aún de ese pais. ", 400);
    }
    res.send({
      status: "ok",
      conteo: beers.length,
      data: beers,
    });
  } catch (e) {
    next(e);
  }
};

const getBeerByStyleController = async (req, res, next) => {
  try {
    const style = req.params.style;
    const beers = await getBeerByStyle(style);

    if (beers.length === 0) {
      throw generateError("No hay cervezas aún de ese estilo. ", 400);
    }
    res.send({
      status: "ok",
      conteo: beers.length,
      data: beers,
    });
  } catch (e) {
    next(e);
  }
};

const getBeerByGraduationController = async (req, res, next) => {
  try {
    const graduation = req.params.graduation;
    const beers = await getBeerByGraduation(graduation);

    if (beers.length === 0) {
      throw generateError("No hay cervezas aún de esa graduacion. ", 400);
    }
    res.send({
      status: "ok",
      conteo: beers.length,
      data: beers,
    });
  } catch (e) {
    next(e);
  }
};





module.exports = {
  getAllBeersController,
  getBeerByIDController,
  getBeerByBrandController,
  getBeerByCountryController,
  getBeerByStyleController,
  getBeerByGraduationController,
};