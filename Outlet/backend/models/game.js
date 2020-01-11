const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  platform: { type: String },
  genre: { type: String },
});

module.exports = mongoose.model('Game', gameSchema);

/* Ajouter une interface à games-list + un service afin de pouvoir créer un table dans la DB
et utiliser les données dans la table pour les faire ré-apparaître à travers le Back */
