const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    from: { type: String, required: true },      // Departure station (e.g., "Astana")
    to: { type: String, required: true },        // Arrival station (e.g., "Almaty")
    category: { type: String, required: true },  // Carriage Class (e.g., "Плацкарт", "Купе", "Люкс")
    price: { type: Number, required: true },     // Cost in KZT
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false } // Passenger reference
});

// We keep the model name as 'Product' so you don't have to change your backend imports!
module.exports = mongoose.model('Product', TicketSchema);