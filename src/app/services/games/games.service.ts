import { Game } from './../../models/game.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private afs: AngularFirestore
  ) { }

  loadGames() {
    return this.afs.collection('games').valueChanges();
  }

  createGame(game: Game) {
    const gamesRef = this.afs.collection('games').doc(game.id);
    return gamesRef.set(game);
  }

  updateGame(game: Game) {
    return this.afs.doc<Game>(`games/${game.id}`).update(game);
  }

  deleteGame(game: Game) {
    return this.afs.doc<Game>(`games/${game.id}`).delete();
  }
}
