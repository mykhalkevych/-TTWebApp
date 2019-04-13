import { AddNewsDialogComponent } from '../../shared/components/dialog/add-news-dialog/add-news-dialog.component';
import { Likes } from './../../models/news.model';
import { User } from 'src/app/models/user.model';
import { UpdateNews } from './../../store/actions/news.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppState, selectPlayers, selectNews, getCurrentUser, getIsAuthenticated, selectGames } from 'src/app/store/app.states';
import { Player } from './../../models/player.model';
import { LoadPlayers } from 'src/app/store/actions/player.actions';
import { News } from 'src/app/models/news.model';
import { LoadNews } from 'src/app/store/actions/news.actions';
import { Game } from 'src/app/models/game.model';
import { LoadGames } from 'src/app/store/actions/games.actions';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  players: Array<Player> = [];
  news: Array<News> = [];
  currentUser: User;
  likeObj: Likes;
  isUserLoggedIn = false;
  games: Array<Game> = [];

  playersSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    public sanitizer: DomSanitizer
    ) {
     }

  ngOnInit() {
    this.store.dispatch(new LoadPlayers());
    this.store.dispatch(new LoadNews());
    this.store.dispatch(new LoadGames());

    this.playersSubscription = this.store.select(selectPlayers)
      .subscribe(res => {
        console.log(res);
        this.players = res;
      });
    this.store.select(selectGames)
      .subscribe(res => {
        console.log(res);
        this.games = res;
      });
    this.store.select(selectNews)
      .subscribe(res => {
        console.log(res);
        this.news = res.reverse();
        this.news = this.news.map(el => {
          el.text = this.sanitizer.bypassSecurityTrustHtml(el.text);
          return el;
        });
      });
    this.store.select(getIsAuthenticated)
      .subscribe(res => {
        this.isUserLoggedIn = res;
      });

    this.store.select(getCurrentUser)
      .subscribe(res => {
        this.currentUser = res;
        this.likeObj = {
          uid: res.uid,
          displayName: res.displayName
        };
      });
  }
  ngOnDestroy() {
    this.playersSubscription.unsubscribe();
  }

  private setLikeDislike(newsItem: News, setPropertyName: string, unsetPropertyName: string) {
    // tslint:disable-next-line:no-bitwise
    if (newsItem[unsetPropertyName] && !!~newsItem[unsetPropertyName].findIndex(el => el.uid === this.likeObj.uid)) {
      newsItem[unsetPropertyName] = newsItem[unsetPropertyName].filter(el => el.uid !== this.likeObj.uid);
    }
    if (!newsItem[setPropertyName] || !newsItem[setPropertyName].length) {
      return [this.likeObj];
    }
    // tslint:disable-next-line:no-bitwise
    if (!!~newsItem[setPropertyName].findIndex(el => el.uid === this.likeObj.uid)) {
      return newsItem[setPropertyName].filter(el => el.uid !== this.likeObj.uid);
    } else {
      return [...newsItem[setPropertyName], this.likeObj];
    }
  }

  likeNews(newsItem: News) {
    newsItem.likes = this.setLikeDislike(newsItem, 'likes', 'dislikes');
    this.store.dispatch(new UpdateNews(newsItem));
  }

  dislikeNews(newsItem: News) {
    newsItem.dislikes = this.setLikeDislike(newsItem, 'dislikes', 'likes');
    this.store.dispatch(new UpdateNews(newsItem));
  }

  openAddNewsDialog() {
    this.dialog.open(AddNewsDialogComponent, {
      width: '600px'
    });
  }

}
