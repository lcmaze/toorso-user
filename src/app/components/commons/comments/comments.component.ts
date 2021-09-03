import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MainService } from 'src/app/services/main.service';
import { WritereviewComponent } from '../writereview/writereview.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  likes: boolean = false;
  dislikes: boolean = false;
  readmore: boolean = false;

  @Input('data') data: any;

  constructor(private dialog: MatDialog, private mainData: MainService) { }

  total_rating: any;
  ngOnInit() {
    if(this.data){
      this.total_rating = (this.data.features + this.data.service + this.data.value + this.data.location)/4;
    }
  }

  updateReview(): void {
    const dialogRef = this.dialog.open(WritereviewComponent, {
      width: '540px',
      data: {vendor: null, rating: this.data}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  like() {
    this.likes = !this.likes;
    // console.log(this.likes);
  }

  dislike() {
    this.dislikes = !this.dislikes;
    // console.log(this.dislikes);
  }

  deleteReview(){
    if(this.data){
      let r = confirm('Are you sure to delete?');
      if(r){
        this.mainData.delete(`api/vendor/rating/${this.data.rating_id}`).subscribe(result => {
          if(result) this.mainData.openToast("Deleted!");
          else this.mainData.openToast("Some error occurred!");
        })
      }
    }
  }

}
