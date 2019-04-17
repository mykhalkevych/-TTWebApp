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
      this.snackBar.open('Дякуємо! Ваша новина буде опублікована після модерації адміном', 'Ok', {
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
