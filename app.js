const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');



// Configuración de Handlebars
app.engine('.handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const cartsRouter = require('./routes/cartsRouter');
const viewsRouter = require('./routes/viewsRouter');
app.use('/carts', cartsRouter);
app.use('/', viewsRouter(io));



const mongoose = require('mongoose');
const config = require('./config');

// Conectar a MongoDB Atlas
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB Atlas establecida'))
  .catch(err => console.log('Error al conectar a MongoDB Atlas:', err));

  const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const { guardarMensaje } = require('./controllers/messageController'); // Importa la función para guardar mensajes



app.engine('.handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const cartsRouter = require('./routes/cartsRouter');
const viewsRouter = require('./routes/viewsRouter');
app.use('/carts', cartsRouter);
app.use('/', viewsRouter(io));

// Cuando se conecte un cliente
io.on('connection', socket => {
  console.log('Nuevo cliente conectado');

  // Cuando se recibe un mensaje del cliente
  socket.on('chatMessage', async data => {
    try {
      // Guardar el mensaje en la base de datos
      const nuevoMensaje = await guardarMensaje(data.user, data.message);

      // Emitir el mensaje a todos los clientes conectados
      io.emit('message', nuevoMensaje);
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
    }
  });
});




const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const { guardarMensaje, obtenerMensajes } = require('./controllers/messageController'); // Importar funciones de controlador de mensajes

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.engine('.handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const cartsRouter = require('./routes/cartsRouter');
const viewsRouter = require('./routes/viewsRouter');
app.use('/carts', cartsRouter);
app.use('/', viewsRouter(io));

// Escuchar la conexión de un cliente
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');

  // Obtener todos los mensajes y enviarlos al cliente que se ha conectado
  try {
    const mensajes = await obtenerMensajes();
    socket.emit('mensajesAnteriores', mensajes);
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
  }

  // Escuchar el evento 'chatMessage' cuando un cliente envía un mensaje
  socket.on('chatMessage', async (data) => {
    try {
      // Guardar el mensaje en la base de datos
      const nuevoMensaje = await guardarMensaje(data.user, data.message);

      // Emitir el mensaje a todos los clientes conectados, incluido el remitente
      io.emit('message', nuevoMensaje);
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
    }
  });
});




const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const Message = require('./dao/models/messageModel');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/chatapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));



app.engine('.handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const cartsRouter = require('./routes/cartsRouter');
const viewsRouter = require('./routes/viewsRouter');
app.use('/carts', cartsRouter);
app.use('/', viewsRouter(io));

// Manejo de conexiones con Socket.io
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');

  // Obtener y enviar mensajes anteriores
  try {
    const messages = await Message.find().lean();
    socket.emit('messages', messages);
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
  }

  // Manejo de nuevos mensajes
  socket.on('chatMessage', async (data) => {
    try {
      // Guardar el mensaje en MongoDB
      const newMessage = new Message({
        user: data.user,
        message: data.message
      });
      await newMessage.save();

      // Emitir el mensaje a todos los clientes conectados
      io.emit('message', { user: data.user, message: data.message });
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
