export interface Likes {
  uid: string;
  displayName: string;
}

export interface News {
  id: string;
  title: string;
  text: string;
  likes: Array<Likes>;
  dislikes: Array<Likes>;
}
