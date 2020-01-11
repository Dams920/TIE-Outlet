import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// import { Subject } from 'rxjs';
// import { map } from 'rxjs/operators';

import { VideoGames } from '../video-games';
// import { Gamer } from '../games-list/games-list.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  // items: Gamer[];

  addToCart(product: any) {
    this.items.push(product);
  }

  getItems(): VideoGames[] {
    return this.items;
  }

  clearCart(): VideoGames[] {
    this.items = [];
    return this.items;
  }

  constructor() { }
}
