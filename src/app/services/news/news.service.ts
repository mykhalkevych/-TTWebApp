import { News } from './../../models/news.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  loadNews() {
    return this.afs.collection('news').valueChanges();
  }

  addNews(news: News) {
    const newsRef = this.afs.collection('news').doc(news.id);
    return newsRef.set(news);
  }

  updateNews(news: News) {
    return this.afs.doc<News>(`news/${news.id}`).update(news);
  }

  deleteNews(news: News) {
    return this.afs.doc<News>(`news/${news.id}`).delete();
  }

}
