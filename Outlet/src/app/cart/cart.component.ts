import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { CartService } from './cart.service';
import { VideoGames } from '../video-games';
// import { Gamer } from '../games-list/games-list.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
items: VideoGames[]; // Reprend le tableau générer dans le service 'cart.service' afin de faire apparaître les articles séléctionnées
total: number; // Initialise la variable permettant d'obtenir le total des sommes des articles s'accumulant dans le panier
index: number;

Back(): void { // Execute un retour à la page précédente
  this.location.back();
}

removeToCart(id: number) { // Permet de supprimer un article 1 à 1 et re-calcule le total des articles immédiatement
  let index = 0;

  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].id === id) {
      index = i;
      break;
    }
  }
  this.items.splice(index, 1);
  return this.Somme();
}


  constructor(
    private cartService: CartService, // Assure le ReRoute pour la Méthode 'Back()' et le Panier
    private location: Location,
  ) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.Somme();
  } /* Initialise les méthodes de récupérations des articles au chargement de la page ainsi que
  le calcul des articles cumulées dans le Panier */

  Somme() { // Calcul la somme global des articles présents dans le Panier
    this.total = 0;
    for (const game of this.items) {
      this.total += game.price;
    }
    return this.total;
  }

}
