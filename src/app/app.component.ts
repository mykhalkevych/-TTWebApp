import { Observable } from 'rxjs';
import { AppState, getIsLoading } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'ttwebapp';
  isLoading: Observable<boolean>;
  constructor(
    private store: Store<AppState>
  ) {

  }
  ngOnInit() {
    const pagePreloader = document.querySelector('.page-preloader');
    setTimeout(() => {
      pagePreloader.classList.remove('loading');
    }, 300);
    this.isLoading = this.store.select(getIsLoading);
  }
}
