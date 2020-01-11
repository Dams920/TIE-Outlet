const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const postRoute = require('./routes/postroute');
const gameRoute = require('./routes/gameroute');
const usersRoutes = require('./routes/usersroute');

const app = express();


mongoose.connect("mongodb+srv://<username>:<password>@cluster0-vatom.mongodb.net/<database>", { useNewUrlParser: true, useCreateIndex: true }) // Connection par Compass
  .then(() => {
    console.log('Connection Successful !');
  })
  .catch(() => {
    console.log('Connection Failed !');
  });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  /* Permet à n'importe quel ressource d'accéder à la page */
  res.setHeader('Access-Control-Allow-Origin', '*');
  /* Permet d'effectuer une requête de pré-vérification vers le serveur pour connaître les entêtes qui seront utilisés */
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  /* Permet de spécifier les méthodes autorisées au moment on l'on accède à la ressource en réponse à une requête de pré-vérification */
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use("/api/posts", postRoute);
app.use("/api/games", gameRoute);
app.use('/api/user', usersRoutes);

module.exports = app;
