import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ttwebapp';

  ngOnInit() {
    const pagePreloader = document.querySelector('.page-preloader');
    setTimeout(() => {
      pagePreloader.classList.remove('loading');
    }, 300);
  }
}
