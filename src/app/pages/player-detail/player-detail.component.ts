import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Player } from 'src/app/models/player.model';
import { AppState } from 'src/app/store/app.states';
import { LoadPlayer } from 'src/app/store/actions/player.actions';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  playerId: string;
  player: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private afs: AngularFirestore
  ) { }


  ngOnInit() {
    this.playerId = this.route.snapshot.params['id'];
    this.player = this.afs.doc(`players/${this.playerId}`).valueChanges();
    console.log(this.playerId);
    if (this.playerId) {
      this.store.dispatch(new LoadPlayer(this.playerId));
    }
  }

}
