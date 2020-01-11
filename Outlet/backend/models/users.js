const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const usersSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
/** Grâce à ce plugin, une erreur apparaîtra si l'on essaie d'enregistrer un mail déjà existant dans la DB */
usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', usersSchema);
