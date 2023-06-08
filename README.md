# <p align="center">🍻 Base de datos de Cervezas 🍻</p>

**_<p align="center">Base de datos de cervezas en la cual podras ver todas y cada una de ellas, filtrar por país, estilo, graduación e incluso añadir una nueva entrada a la base de datos.</p>_**

## 📋 Descripción
* Podremos hacer las siguientes operaciones:
  - Obtener TODAS las cervezas
  - Obtener TODAS las cervezas por ID
  - Obtener TODAS las cervezas por MARCA 
  - Obtener TODAS las cervezas por PAIS 
  - Obtener TODAS las cervezas por ESTILO 
  - Obtener TODAS las cervezas de determinada graduación
  - Añadir nueva cerveza. Campos obligatorios **marca**, **nombre**, **estilo**, **graduación** y **país**. También podremos añadir puntuación, comentarios y un fichero [png, jpg o jpeg] para visualizar la cerveza.

## ⚙ Inicialización
### Archivo .env
* El archivo .env no se mostrará ya que está incluido en el .gitignore.
* La información contenida no es sensible ya que se trata de un proyecto de ejemplo, pero por convención lo introducimos de esta forma.
* La información necesaria se puede encontrar en el archivo .env.example.
### NPM necesarios
* Debes instalar primero los módulos necesarios:
```
npm install
```
### Base de datos
* Es necesario tener previamente configurado el archivo .env.
* Para crear la base de datos con las tablas vacías:
```
node db/initDB
```
* Para crear la base de datos con la informacion del fichero .csv:
```
node db/initDB --data
```
### Servidor
* Para iniciar el servidor:
```
npm start
```

## 👩‍💻 Autores
* [@BorjaLopz](https://github.com/BorjaLopz)

## 💻 Tech Stack
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![GIT](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![VSC](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
