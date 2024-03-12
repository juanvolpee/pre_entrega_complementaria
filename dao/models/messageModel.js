const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define la estructura del esquema para la colección messages
const messageSchema = new Schema({
  user: {
    type: String, // Tipo de dato para almacenar el correo electrónico del usuario
    required: true
  },
  message: {
    type: String, // Tipo de dato para almacenar el mensaje del usuario
    required: true
  },
  createdAt: {
    type: Date, // Tipo de dato para almacenar la fecha de creación del mensaje
    default: Date.now // Valor por defecto (fecha actual)
  }
});

// Exportar el modelo de mensaje
module.exports = mongoose.model('Message', messageSchema);
