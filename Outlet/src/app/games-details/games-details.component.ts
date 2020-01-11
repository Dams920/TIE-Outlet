import { Component, OnInit } from '@angular/core';
// Fournit un accès aux infos en permettant une redirection à travers les components étant chargés dans le router-outlet
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { games } from '../games';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-games-details',
  templateUrl: './games-details.component.html',
  styleUrls: ['./games-details.component.css']
})
export class GamesDetailsComponent implements OnInit {
  product: any;

  addToCart(product) { // Reprend la fonction dans cart.service afin de créer une alerte d'ajout après avoir cliqué sur Achat
    window.alert(' Your game has been added to your cart ');
    this.cartService.addToCart(product);
  }

  Back(): void { // Permet d'executer un retour vers la page précédente
    this.location.back();
  }


  constructor(
    private route: ActivatedRoute, // Définit la 'Route' ou redirection en tant qu'attribut (Initialisation)
    private cartService: CartService, // Définit la 'Route' ou redirection en tant qu'attribut (Auprès du Service 'Panier')
    private location: Location,
  ) { }

  ngOnInit() {
    // Cette (this) même redirection permet la récupération des données en appellant 'un Observable' = subscribe
    this.route.paramMap.subscribe(params => {
      // Lui passant en observateur un objet : Ce (this) 'product' du tableau 'games' renvoie les paramètres des jeux
      this.product = games[+params.get('productId')];
      // grâce à la récupération de son ID
    });
  }

}
