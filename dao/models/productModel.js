const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define la estructura del esquema para la colección products
const productSchema = new Schema({
  name: {
    type: String, // Tipo de dato para almacenar el nombre del producto
    required: true
  },
  description: {
    type: String, // Tipo de dato para almacenar la descripción del producto
    required: true
  },
  price: {
    type: Number, // Tipo de dato para almacenar el precio del producto
    required: true
  },
  createdAt: {
    type: Date, // Tipo de dato para almacenar la fecha de creación del producto
    default: Date.now // Valor por defecto (fecha actual)
  }
});

// Exportar el modelo de producto
module.exports = mongoose.model('Product', productSchema);
