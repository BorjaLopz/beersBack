import {
  getAllBeers,
  getBeerByID,
  getBeerByBrand,
  getBeerByCountry,
  getBeerByStyle,
  getBeerByGraduation,
  addNewBeer,
} from "../db/beers.js";
import {
  generateError,
  createPathIfNotExists,
  getExtensionFile,
  checkIfExtensionIsAllowed,
  ALLOWED_EXTENSIONS,
} from "../helpers.js";
import { nanoid } from "nanoid";
import path from "path";

const getAllBeersController = async (req, res, next) => {
  try {
    const beers = await getAllBeers();

    if (beers.length === 0) {
      throw generateError("No hay cervezas aún. ", 400);
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
};

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

const addNewBeerController = async (req, res, next) => {
  try {
    const { brand, name, style, graduation, country, score, comments } =
      req.body;

    let obj = {}; //Objeto vacio para luego iterar
    obj.brand = brand;
    obj.name = name;
    obj.style = style;
    obj.graduation = graduation;
    obj.country = country;
    obj.score = score;
    obj.comments = comments;

    //Mostramos cual es el dato que falta
    for (const it in obj) {
      if (!obj[it]) {
        throw generateError(`Tienes que introducir el ${it}`, 400);
      }
    }

    //FICHERO
    let filename;
    let uploadPath;

    if (req.files && req.files.file) {
      let sampleFile = req.files.file;

      //Creamos el path
      const uploadDir = path.join(__dirname, "../uploads");

      //Creamos directorio si no existe
      await createPathIfNotExists(uploadDir);

      //Comprobamos si el fichero es valido
      if (!checkIfExtensionIsAllowed(getExtensionFile(sampleFile.name))) {
        throw generateError(
          `Fichero no valido. Tipos de formato permitidos ${ALLOWED_EXTENSIONS}`,
          415
        );
      }

      //Generamos un nombre aleatorio
      filename = `${nanoid(24)}.${getExtensionFile(sampleFile.name)}`;

      uploadPath = uploadDir + "\\" + filename;

      //Subimos el fichero
      sampleFile.mv(uploadPath, function (e) {
        if (e) {
          throw generateError("No se pudo enviar el archivo.", 400);
        }
      });
    }

    const id_beer = await addNewBeer(
      brand,
      name,
      style,
      graduation,
      country,
      score,
      comments,
      filename
    );

    res.send({
      status: "ok",
      data: `Cerveza añadida con id ${id_beer}`,
    });
  } catch (e) {
    next(e);
  }
};

export {
  getAllBeersController,
  getBeerByIDController,
  getBeerByBrandController,
  getBeerByCountryController,
  getBeerByStyleController,
  getBeerByGraduationController,
  addNewBeerController,
};
