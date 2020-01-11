const express = require('express');
const Comment = require('../models/comment');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
  const post = new Comment({
    title: req.body.title,
    content: req.body.content,
    creator: req.dataUser.userId
  });
  post.save().then(createdComment => {
    res.status(201).json({
      message: 'Post Comment has been added successfully',
      postId: createdComment._id,
    });
  }); /* Sauvegarde les données grâce à la déclaration du model comment contenu dans le fichier comment.js
      -- Fonction mongoose */
});

router.put("/:id", checkAuth, (req, res, next) => {
  const post = new Comment({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.dataUser.userId,
  });
  Comment.updateOne({ _id: req.params.id, creator: req.dataUser.userId }, post).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({ message : 'Message Correctly Updated' });
    } else {
      res.status(401).json({ message : 'Unauthorized or Not Authenticated' });
    }
  });
});

router.get('', (req, res, next) => {
  Comment.find() // Retourne l'attribut de l'export du model comment (comment.js)
    .then((documents) => {
      res.status(200).json({
        message: 'Posts Comment fetched successfully',
        posts: documents,
    });
  });
});

router.get('/:id', (req, res, next) => {
  Comment.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Posts Comment not Found !',
      });
    }
  });
});

// Récupère dynamiquement l'ID sélectionner dans la data base pour la suppression de la donnée sélectionnée
router.delete('/:id', checkAuth, (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id, creator: req.dataUser.userId })
  .then(result => {
    if (result.n > 0) {
      res.status(200).json({ message : 'Message Correctly Deleted' });
    } else {
      res.status(401).json({ message : 'Unauthorized or Not Authenticated' });
    }
  });
});

module.exports = router;
