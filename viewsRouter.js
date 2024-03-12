const express = require('express');
const router = express.Router();
const Message = require('../dao/models/messageModel'); // Importa el modelo de mensaje

module.exports = function(io) {
  // Ruta para renderizar la vista del chat
  router.get('/chat', async (req, res) => {
    try {
      // Recuperar todos los mensajes de la base de datos
      const messages = await Message.find().lean();
      res.render('chat', { messages }); // Renderizar la vista chat.handlebars y pasar los mensajes recuperados
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al cargar el chat');
    }
  });

  // Otras rutas aquí...

  return router;
};
