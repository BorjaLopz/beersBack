"use strict";

import dotenv from "dotenv";
dotenv.config();

import { getConnection } from "./db.js";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";
import { createPathIfNotExists } from "../helpers.js";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Leer el fichero */
import fs from "fs";
import { StringDecoder } from "string_decoder";
StringDecoder.StringDecoder;
const decoder = new StringDecoder("utf-8");

const filename = "Cervezas - Listado Cervezas.csv";

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
      uuid VARCHAR(40) NOT NULL,
      score VARCHAR(5),
      comments VARCHAR(50),
      img_file VARCHAR(100)
    );
    `);

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
          imagen,
        ] = lines[i].split(",");

        // console.log(
        //   `${marca}, ${nombre}, ${estilo}, ${graduacion}, ${nacionalidad}, ${nota}, ${comentarios}, ${imagen}`
        // );

        // if (imagen !== "") {
        //   uploadDataFiles(imagen);
        // }

        const currentUuid = `${nanoid(24)}`;

        await connection.query(
          `INSERT INTO cervezas(brand, name, style, graduation, country, uuid, score, comments, img_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            marca,
            nombre,
            estilo,
            graduacion,
            nacionalidad,
            currentUuid,
            nota,
            comentarios,
            imagen,
          ]
        );
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
