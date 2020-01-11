import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Gamer } from '../games-list/games-list.model';
import { GamesListService } from '../games-list/games-list.service';

// import { VideoGames } from '../video-games';
// import { GestionGamesService } from '../gestion-games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  games: Gamer[] = [];
  private gamesSubscrib: Subscription;
  // games: VideoGames[] = [];
  /* Utilisation des valeurs contenu dans 'games' par la classe VideoGames et renvoi
  sous forme de tableau */

  // constructor(
  //   private gestionGamesService: GestionGamesService, // Définit le ReRoute pour le Service
  // ) { }

  constructor(private gamesListService: GamesListService) {}

  ngOnInit() { // Initialise la méthode au chargement de la liste de jeux
    // this.getGames();
    this.gamesListService.getGame();
    this.gamesSubscrib = this.gamesListService.getGameUpdateListener()
    .subscribe(games => this.games = games.slice(0, 5));
  }

  // getGames() {
  //   this.gamesListService.getGame()
  //   .subscribe(games => this.games = games.slice(0, 5));
  // }
  /** Fait appel à un service afin de pouvoir récupérer les jeux présent dans le fichier games
   * et affiche les données en récupérant les 5 premiers jeux de la liste
   */

   ngOnDestroy() {
     this.gamesSubscrib.unsubscribe();
   }

}
