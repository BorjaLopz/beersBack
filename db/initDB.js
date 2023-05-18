"use strict";

require("dotenv").config();
const { getConnection } = require("./db");
const chalk = require("chalk");

/* Leer el fichero */
const fs = require("fs");
const { readByLine } = require("../readFiles");
const StringDecoder = require("string_decoder").StringDecoder;
const decoder = new StringDecoder("utf-8");

const filename = "Cervezas - Listado Cervezas.csv";

// const { faker } = require("@faker-js/faker/locale/es");
// const bcrypt = require("bcrypt");

const addData = process.argv[2] === "--data";

async function main() {
  let connection;
  try {
    connection = await getConnection();
    console.log(chalk.green("Connection established"));

    //Crear BBDD
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`
    );
    await connection.query(`USE ${process.env.DB_DATABASE}`);
    console.log(chalk.green("Database created"));

    //Borrar tablas
    console.log(chalk.yellow("Deleting old tables..."));
    // await connection.query("DROP TABLE IF EXISTS comments;");
    // await connection.query("DROP TABLE IF EXISTS requiredS;");
    await connection.query("DROP TABLE IF EXISTS cervezas;");

    //Crear tablas
    console.log(chalk.yellow("Creating new tables..."));

    await connection.query(`
    CREATE TABLE cervezas(
      id INT AUTO_INCREMENT PRIMARY KEY,
      brand VARCHAR(25) NOT NULL, 
      name VARCHAR(35) NOT NULL,
      style VARCHAR(45) NOT NULL,
      graduation VARCHAR(5) NOT NULL,
      country VARCHAR(20) NOT NULL,
      score VARCHAR(5),
      comments VARCHAR(50),
      img_file VARCHAR(100)
    );
    `);

    // await connection.query(`
    // CREATE TABLE requiredS(
    //   id INT AUTO_INCREMENT PRIMARY KEY,
    //   title VARCHAR(50) NOT NULL CHECK (LENGTH(title) >= 15),
    //   request_body VARCHAR(500) NOT NULL CHECK (LENGTH(request_body) >= 15),
    //   user_id INT NOT NULL,
    //   file_name VARCHAR(30),
    //   creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    //   required_type VARCHAR(20) NOT NULL,
    //   done BOOLEAN DEFAULT FALSE,
    //   hide BOOLEAN DEFAULT FALSE,
    //   FOREIGN KEY (user_id) REFERENCES users (id)
    // );
    // `);

    // await connection.query(`
    // CREATE TABLE comments(
    //   id INT AUTO_INCREMENT PRIMARY KEY,
    //   user_id INT NOT NULL,
    //   requiredS_id INT NOT NULL,
    //   creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    //   comment VARCHAR(500) NOT NULL,
    //   serviceFile VARCHAR(30),
    //   hide BOOLEAN DEFAULT FALSE,
    //   solution BOOLEAN DEFAULT FALSE,
    //   FOREIGN KEY (user_id) REFERENCES users (id),
    //   FOREIGN KEY (requiredS_id) REFERENCES requiredS (id)

    // );
    // `);

    if (addData) {
      console.log(chalk.blue(filename));
      const data = fs.readFileSync(filename);
      const decodeText = decoder.write(data);
      const lines = decodeText.split("\n");
      for (let i = 1; i < lines.length; i++) {
        const [
          marca,
          nombre,
          estilo,
          graduacion,
          nacionalidad,
          nota,
          comentarios,
        ] = lines[i].split(",");
        console.log(
          `${marca}, ${nombre}, ${estilo}, ${graduacion}, ${nacionalidad}, ${nota}, ${comentarios}`
        );
        await connection.query(`INSERT INTO cervezas(brand, name, style, graduation, country, score, comments, img_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [marca, nombre, estilo, graduacion, nacionalidad, nota, comentarios, ""]);
      }
    }

    console.log(chalk.green("Tables created"));
  } catch (error) {
    console.error(chalk.red("An error has occurred " + error.message));
  } finally {
    let connection;
    try {
      connection = await getConnection();
      console.log(chalk.yellow("Releasing connection..."));
      connection.release();
      console.log(chalk.green("Connection released"));
    } catch (error) {
      console.error(
        chalk.red(
          "An error has occurred while releasing the connection " +
            error.message
        )
      );
    }
    process.exit();
  }
}
main();

// console.log("hola");
