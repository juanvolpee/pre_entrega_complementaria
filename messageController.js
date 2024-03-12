const Message = require('../dao/models/messageModel');

// Función para guardar un nuevo mensaje en la base de datos
async function guardarMensaje(user, message) {
  try {
    const nuevoMensaje = new Message({
      user,
      message
    });
    await nuevoMensaje.save();
    return nuevoMensaje;
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    throw error;
  }
}

// Función para obtener todos los mensajes de la base de datos
async function obtenerMensajes() {
  try {
    const mensajes = await Message.find().lean();
    return mensajes;
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    throw error;
  }
}

module.exports = { guardarMensaje, obtenerMensajes };
