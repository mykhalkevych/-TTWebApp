export interface Likes {
  uid: string;
  displayName: string;
}

export interface News {
  id: string;
  title: string;
  text: any;
  published: boolean;
  publisher:  string;
  likes: Array<Likes>;
  dislikes: Array<Likes>;
}
