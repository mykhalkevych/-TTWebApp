import { User } from 'src/app/models/user.model';
import { News } from './../../../../models/news.model';
import { selectNews, getCurrentUser } from './../../../../store/app.states';
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
  user: User;
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.newsForm = this.fb.group({
      id: [new Date().getTime().toString(), Validators.required],
      title: ['', Validators.required],
      publisher: [''],
      text: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadNews());
    this.store.select(selectNews)
      .subscribe(res => {
        this.news = res;
      });
    this.store.select(getCurrentUser)
      .subscribe(res => {
        console.log(res);
        this.user = res;
      });
  }

  publishNews() {
    if (this.newsForm.valid) {
      const newsData = this.newsForm.value;
      newsData.published = true;
      if (this.isNewsEditing) {
        this.store.dispatch(new UpdateNews(newsData));
        this.isNewsEditing = false;
      } else {
        newsData.publisher = this.user.email;
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
    console.log(news);
    this.newsForm.controls['title'].setValue(news.title);
    this.newsForm.controls['text'].setValue(news.text);
    this.newsForm.controls['publisher'].setValue(news.publisher);
  }

  editNews(news) {
    this.setNewsForm(news);
    this.isNewsEditing = true;
  }

  deleteNews(news) {
    this.store.dispatch(new DeleteNews(news));
  }

}
