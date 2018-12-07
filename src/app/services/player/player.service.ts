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

  getAllPlayers() {
    return this.afs.collection('players');
  }

  addNewPlayer(player: Player) {
    this.afs.collection('players').add(player)
      .then(res => {
        console.log(res);
      });
  }
}
