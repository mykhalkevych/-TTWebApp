import { Player } from './../../models/player.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private afs: AngularFirestore
  ) { }

  loadPlayers() {
    return this.afs.collection('players').valueChanges();
  }

  addPlayer(player: Player) {
    return this.afs.collection('players').add(player);
  }
}
