import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Gamer } from './games-list.model';
import { GamesListService } from './games-list.service';

// import { VideoGames } from '../video-games';
// import { GestionGamesService } from '../gestion-games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit, OnDestroy {
  gamers: Gamer[] = [];
  private gamersSubscrib: Subscription;
  // games: VideoGames[];
  /* Utilisation des valeurs contenu dans 'games' par la classe VideoGames et renvoi
  sous forme de tableau */

  // constructor(private gestionGamesService: GestionGamesService) { }
  constructor(public gamersService: GamesListService) {} // Définit le ReRoute pour le Service

  ngOnInit() {
    this.gamersService.getGame();
    this.gamersSubscrib = this.gamersService.getGameUpdateListener()
      .subscribe((gamers: Gamer[]) => {
        this.gamers = gamers;
      });
    // this.getGames(); // Initialise la méthode au chargement de la liste de jeux
  }

  ngOnDestroy() {
    this.gamersSubscrib.unsubscribe();
  }

    /* Fait appel à un service afin de pouvoir récupérer les jeux présent dans le fichier games */
  // getGames(): void {
  //   this.gestionGamesService.getGames()
  //   .subscribe(games => this.games = games);
  // }

}
