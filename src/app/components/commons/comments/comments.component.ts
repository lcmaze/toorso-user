import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  likes: boolean = false;
  dislikes: boolean = false;
  readmore: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  like() {
    this.likes = !this.likes;
    console.log(this.likes);
  }

  dislike() {
    this.dislikes = !this.dislikes;
    console.log(this.dislikes);
  }

}
