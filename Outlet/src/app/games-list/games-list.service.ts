import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Gamer } from './games-list.model';

@Injectable({
  providedIn: 'root'
})
export class GamesListService {

  private games: Gamer[] = [];

  private gamesUpdated = new Subject<Gamer[]>();

  constructor(private http: HttpClient) { }

  getGame() {
    return this.http.get<{ games: any }>('http://localhost:3000/api/games')
    .pipe(map((gameData) => {
      return gameData.games.map((game:
        { name: string; price: number; description: string; platform: string; genre: string; _id: string; }) => {
        return {
          name: game.name,
          price: game.price,
          description: game.description,
          platform: game.platform,
          genre: game.genre,
          id: game._id
        };
      });
    }))
    .subscribe((BackEndGames) => {
      this.games = BackEndGames;
      this.gamesUpdated.next([...this.games]);
    });
  }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

}
