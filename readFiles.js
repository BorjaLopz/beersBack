const fs = require("fs");
const StringDecoder = require("string_decoder").StringDecoder;
const decoder = new StringDecoder("utf-8");
const chalk = require("chalk");

const readByLine = (filename) => {
  console.log(chalk.blue(filename));
  const data = fs.readFileSync(filename);
  const decodeText = decoder.write(data);
  const lines = decodeText.split("\n");
  for (let i = 1; i < 5; i++) {
    const [marca, nombre, estilo, graduacion, nacionalidad, nota, comentarios] =
      lines[i].split(",");
    console.log(
      `${marca}, ${nombre}, ${estilo}, ${graduacion}, ${nacionalidad}, ${nota}, ${comentarios}`
    );
  }
};

module.exports = { readByLine }
