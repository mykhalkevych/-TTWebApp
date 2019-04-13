import { User } from './../../models/user.model';
import { AppState, getCurrentUser, selectCurrentPlayer } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { LoadPlayer, UpdatePlayer } from 'src/app/store/actions/player.actions';
import { Player } from 'src/app/models/player.model';
import { UpdateAuthState } from 'src/app/store/actions/auth.action';
import { awards } from 'src/app/shared/awards';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo: User = {};
  playerInfo: Player = {};
  awards = awards;

  constructor(
    private store: Store<AppState>,
    private storage: AngularFireStorage
  ) {
    this.store.select(getCurrentUser)
      .subscribe((user: User) => {
        console.log(user);
        this.userInfo = user;
        this.store.dispatch(new LoadPlayer(user.uid));
      });
    this.store.select(selectCurrentPlayer)
      .subscribe(res => {
        if (res) {
          this.playerInfo = res;
        }
      });
  }

  ngOnInit() {

  }

  fileChangeEvent(e) {
    const file = e.target.files[0];
    if (file) {
      const filePath = `avatars/${this.userInfo.uid}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(res => {
          console.log(res);
          this.userInfo.photoURL = res;
          this.playerInfo.avatar = res;
        }))
      ).subscribe();
    }
  }
  updateProfile() {
    this.store.dispatch(new UpdateAuthState(this.userInfo));
    this.store.dispatch(new UpdatePlayer(this.playerInfo));
  }
}
