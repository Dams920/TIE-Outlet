const express = require('express');
const Gamer = require('../models/game');

const router = express.Router();

router.post('', (req, res, next) => {
  const game = new Gamer({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    platform: req.body.platform,
    genre: req.body.genre,
  });
  game.save().then(createdGame => {
    res.status(201).json({
      message: 'Games has been added successfully',
      gameId: createdGame._id,
    });
  }); /* Sauvegarde les données grâce à la déclaration du model game contenu dans le fichier game.js
      -- Fonction mongoose */
});

router.get('', (req, res, next) => {
  Gamer.find() // Retourne l'attribut de l'export du model Gamer (game.js)
    .then((documents) => {
      res.status(200).json({
        message: 'Games fetched successfully',
        games: documents,
    });
  });
});

module.exports = router;
