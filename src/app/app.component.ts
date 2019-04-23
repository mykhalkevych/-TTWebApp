import { Observable } from 'rxjs';
import { AppState, getIsLoading } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fadeAnimation } from './animations';
import { MessagingService } from './services/messaging/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation], // register the animation
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  isLoading: Observable<boolean>;
  message;

  constructor(
    private store: Store<AppState>,
    private messagingService: MessagingService
  ) {

  }
  ngOnInit() {

    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    const pagePreloader = document.querySelector('.page-preloader');
    setTimeout(() => {
      pagePreloader.classList.remove('loading');
    }, 300);
    this.isLoading = this.store.select(getIsLoading);
  }
}
