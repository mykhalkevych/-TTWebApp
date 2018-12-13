import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {

  newsForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
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
