import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {

  newsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private srote: Store<AppState>
  ) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      likes: [0, Validators.required]
    });
  }

  ngOnInit() {
  }

  publishNews() {
    if (this.newsForm.valid) {
      const newsData = this.newsForm.value;
      console.log(newsData);
    }
  }

}
