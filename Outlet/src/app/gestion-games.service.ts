import { Injectable } from '@angular/core';

// import { Observable, of } from 'rxjs';

// import { games } from './games';
// import { VideoGames } from './video-games';

@Injectable({
  providedIn: 'root'
})
export class GestionGamesService {

  constructor() { }

/* Applique un Observable au travers de la classe VideoGames permettant le return des jeux présents dans le
fichier games */
  // getGames(): Observable<VideoGames[]> {
  //   return of(games);
  // }


}
