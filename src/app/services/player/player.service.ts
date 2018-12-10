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
    return this.afs.collection('players').snapshotChanges();
  }
  loadPlayer(id) {
    return this.afs.doc<Player>(`players/${id}`).valueChanges();
  }

  addPlayer(player: Player) {
    return this.afs.collection('players').add(player);
  }

  updatePlayer(player: Player) {
    return this.afs.doc<Player>(`players/${player.id}`).update(player);
  }
}
