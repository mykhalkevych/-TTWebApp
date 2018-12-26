import { News } from './../../../../models/news.model';
import { selectNews } from './../../../../store/app.states';
import { AddNews, LoadNews, UpdateNews, DeleteNews } from './../../../../store/actions/news.actions';
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
  news: Array<News> = [];
  isNewsEditing = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.newsForm = this.fb.group({
      id: [new Date().getTime().toString(), Validators.required],
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadNews());
    this.store.select(selectNews)
      .subscribe(res => {
        this.news = res;
      });
  }

  publishNews() {
    if (this.newsForm.valid) {
      const newsData = this.newsForm.value;
      if (this.isNewsEditing) {
        this.store.dispatch(new UpdateNews(newsData));
        this.isNewsEditing = false;
      } else {
        this.store.dispatch(new AddNews(newsData));
      }
      this.resetNewsForm();
    }
  }

  resetNewsForm() {
    this.newsForm.reset();
    this.newsForm.controls['id'].setValue(new Date().getTime().toString());
    const formFields = Object.keys(this.newsForm.controls);
    formFields.map(key => {
      this.newsForm.controls[key].updateValueAndValidity();
    });
  }

  setNewsForm(news) {
    this.newsForm.setValue(news);
  }

  editNews(news) {
    this.setNewsForm(news);
    this.isNewsEditing = true;
  }

  deleteNews(news) {
    this.store.dispatch(new DeleteNews(news));
  }

}
