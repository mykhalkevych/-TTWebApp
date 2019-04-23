import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ttwebapp';
<<<<<<< Updated upstream
=======
  isLoading: Observable<boolean>;
  message;

  constructor(
    private store: Store<AppState>,
    private messagingService: MessagingService
  ) {

  }
  ngOnInit() {
    const userId = 'user002';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    const pagePreloader = document.querySelector('.page-preloader');
    setTimeout(() => {
      pagePreloader.classList.remove('loading');
    }, 300);
    this.isLoading = this.store.select(getIsLoading);
  }
>>>>>>> Stashed changes
}
