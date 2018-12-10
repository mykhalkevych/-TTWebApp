import { Subscription } from 'rxjs';
import { selectCurrentPlayer } from './../../store/app.states';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class PlayerDetailComponent implements OnInit, OnDestroy {

  playerId: string;
  player: any;
  playerSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private afs: AngularFirestore
  ) { }


  ngOnInit() {
    this.playerId = this.route.snapshot.params['id'];
    if (this.playerId) {
      this.store.dispatch(new LoadPlayer(this.playerId));
    }
    this.playerSubscription = this.store.select(selectCurrentPlayer)
      .subscribe(res => {
        console.log(res);
        this.player = res;
      });
  }

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }

}
