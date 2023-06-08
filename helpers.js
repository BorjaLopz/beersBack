import fs from "fs/promises";

// EXTENSIÓN DE ARCHIVOS PERMITIDOS //
const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg"];

//Generar errores personalizados en respuesta a una solicitud HTTP en caso de error en el server
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

//Comprobar si un directorio existe en el sistema de archivos y lo crea si no
const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

function getExtensionFile(filename) {
  return filename.split(".").slice(-1);
}

function checkIfExtensionIsAllowed(fileExtension) {
  const [ext] = fileExtension;
  return ALLOWED_EXTENSIONS.includes(ext);
}

export {
  generateError,
  createPathIfNotExists,
  getExtensionFile,
  checkIfExtensionIsAllowed,
  ALLOWED_EXTENSIONS,
};
