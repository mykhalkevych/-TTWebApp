import { awards } from './../../shared/awards';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.states';
import { LoadPlayer } from 'src/app/store/actions/player.actions';
import { selectCurrentPlayer } from './../../store/app.states';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit, OnDestroy {

  playerId: string;
  player: any;
  playerSubscription: Subscription;
  awards = awards;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
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
