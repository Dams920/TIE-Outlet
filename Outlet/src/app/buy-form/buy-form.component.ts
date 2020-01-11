import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

import { CartService } from '../cart/cart.service';
import { VideoGames } from '../video-games';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.css']
})
export class BuyFormComponent implements OnInit {
  items: VideoGames[]; // Définit un Tableau 'items' en se basant sur la classe VideoGames
  checkoutForm: any; // Définit un formulaire ; Formulaire de paiement du panier

  Back() {
    this.location.back();
  }

  constructor(
    private location: Location, // Définit les accès [ReRouter] des différents import pour la liaison des données
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.items = this.cartService.getItems(); /* Reprend l'attribut 'items' afin de leur faire équivaloir à
    la méthode 'getItems' du Service 'cartService' */

    this.checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
    phone: '',
    mail: '', /** Définit la forme du formulaire de paiement du panier */
  });
 }

 onSubmit(customerData: any) { // Méthode prévenant de l'achat des articles et réinitialisant le panier
   console.warn(' Your order has been submitted ', customerData);

   this.items = this.cartService.clearCart();
   this.checkoutForm.reset();
 }

  ngOnInit() {
  }

}
