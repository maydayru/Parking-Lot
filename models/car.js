const mongoose = require('mongoose');

const Car = mongoose.Schema({
	driver_name: {
		type: String,
		required: true
	},
	license_plate: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ['Активный', 'Аннулирован'],
		required: true,
		default: 'Активный'
	},
	date: {
		type: Date,
		default: Date.now()
	},
	lot: {
		type: String
	}
});

module.exports = mongoose.model('Car', Car);