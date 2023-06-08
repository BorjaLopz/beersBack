import { getConnection } from "./db.js";
import { generateError } from "../helpers.js";
import chalk from "chalk";

const getAllBeers = async () => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(`SELECT * FROM cervezas`);
    // console.log(rows)

    if (rows.length === 0) {
      throw generateError("No hay cervezas", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const getBeerByID = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM cervezas WHERE id = ?`,
      id
    );

    if (rows.length === 0) {
      throw generateError("No hay ninguna cerveza con ese id", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const getBeerByBrand = async (brand) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM cervezas WHERE brand = ?`,
      brand
    );

    if (rows.length === 0) {
      throw generateError("No hay ninguna cerveza de esa marca", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const getBeerByCountry = async (country) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM cervezas WHERE country = ?`,
      country
    );

    if (rows.length === 0) {
      throw generateError("No hay ninguna cerveza de ese pais", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const getBeerByStyle = async (style) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM cervezas WHERE style = ?`,
      style
    );

    if (rows.length === 0) {
      throw generateError("No hay ninguna cerveza de ese estilo", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const getBeerByGraduation = async (graduation) => {
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM cervezas WHERE graduation LIKE ?`,
      [`${graduation}%`]
    );

    if (rows.length === 0) {
      throw generateError("No hay ninguna cerveza de esa graduacion", 400);
    }

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const addNewBeer = async (
  brand,
  name,
  style,
  graduation,
  country,
  score = "",
  comments = "",
  filename = ""
) => {
  let connection;

  try {
    connection = await getConnection();
    const [newBeer] = await connection.query(
      `INSERT INTO cervezas (brand, name, style, graduation, country, score, comments, img_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [brand, name, style, graduation, country, score, comments, filename]
    );

    console.log(chalk.green("Cerveza añadida con exito!"));

    return newBeer.insertId;
  } finally {
    if (connection) connection.release();
  }
};

export {
  getAllBeers,
  getBeerByID,
  getBeerByBrand,
  getBeerByCountry,
  getBeerByStyle,
  getBeerByGraduation,
  addNewBeer,
};
