import { User } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddNews } from 'src/app/store/actions/news.actions';
import { Store } from '@ngrx/store';
import { AppState, getCurrentUser } from 'src/app/store/app.states';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-news-dialog',
  templateUrl: './add-news-dialog.component.html',
  styleUrls: ['./add-news-dialog.component.scss']
})
export class AddNewsDialogComponent implements OnInit {

  newsForm: FormGroup;
  user: User;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AddNewsDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.newsForm = this.fb.group({
      id: [new Date().getTime().toString(), Validators.required],
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.store.select(getCurrentUser)
      .subscribe(res => {
        this.user = res;
      });
  }

  addNews() {
    if (this.newsForm.valid) {
      const newsData = this.newsForm.value;
      newsData.publisher = this.user.email;
      this.store.dispatch(new AddNews(newsData));
      this.snackBar.open('У вас немає відповідних прав', 'Ok', {
        duration: 8000
      });
      this.dialogRef.close();
    }
  }

  closeDialog(e): void {
    e.preventDefault();
    this.dialogRef.close();
  }

}
