const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define la estructura del esquema para la colección carts
const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // Tipo de dato para almacenar el ID del usuario relacionado con el carrito
    ref: 'User', // Hace referencia al modelo de usuario para establecer una relación
    required: true
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId, // Tipo de dato para almacenar el ID del producto
        ref: 'Product', // Hace referencia al modelo de producto para establecer una relación
        required: true
      },
      quantity: {
        type: Number, // Tipo de dato para almacenar la cantidad del producto en el carrito
        required: true,
        default: 1 // Valor por defecto
      }
    }
  ],
  createdAt: {
    type: Date, // Tipo de dato para almacenar la fecha de creación del carrito
    default: Date.now // Valor por defecto (fecha actual)
  }
});

// Exportar el modelo de carrito
module.exports = mongoose.model('Cart', cartSchema);
