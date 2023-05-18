const express = require("express");

const bodyParser = require("body-parser");

require("dotenv").config();

const chalk = require("chalk");

const { generalError, error404 } = require("./middlewares/handleErrors")

const app = new express();  //Cremos instancia de express

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", async(req, res) => {
  res.send("Hello World");
})


/* HANDLE ERRORS*/

app.use(error404);
app.use(generalError);


/* SERVER */
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, async () => {
  console.log(
    chalk.green(`\nApp listening on port ${PORT}\nDB: ${process.env.DB_DATABASE}`)
  );
});
