//Generar errores personalizados en respuesta a una solicitud HTTP en caso de error en el server
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

module.exports = { generateError };
