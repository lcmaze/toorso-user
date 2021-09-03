import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-writereview',
  templateUrl: './writereview.component.html',
  styleUrls: ['./writereview.component.scss']
})
export class WritereviewComponent implements OnInit {

  constructor(private mainData: MainService, private firebase: FirebaseService, public dialogRef: MatDialogRef<WritereviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  features_rating: number = 1;
  services_rating: number = 1;
  value_rating: number = 1;
  location_rating: number = 1;

  ngOnInit() {
    // console.log(this.data);
    if(this.data.rating){
      this.features_rating = this.data.rating.features;
      this.services_rating = this.data.rating.service;
      this.value_rating = this.data.rating.value;
      this.location_rating = this.data.rating.location;
    }
  }

  addReview(form: NgForm) {
    if(!this.firebase.user) {
      this.mainData.openToast("Login to add review!");
      return;
    }
    if(form.valid && this.features_rating && this.services_rating && this.value_rating && this.location_rating){
      form.value['features'] = this.features_rating;
      form.value['service'] = this.services_rating;
      form.value['value'] = this.value_rating;
      form.value['location'] = this.location_rating;
      form.value['user_id'] = this.firebase.user.uid;
      form.value['branch_id'] = this.data.vendor.branch_id;
      this.mainData.post(form.value, `api/vendor/rating`).subscribe(data => {
        if(data) {
          this.mainData.openToast("Review Added!");
          form.reset();
          this.dialogRef.close();
        }
        else this.mainData.openToast("Some error occurred!");
      })
    }
  }
  

  updateReview(form: NgForm) {
    if(!this.firebase.user) {
      this.mainData.openToast("Login to update review!");
      return;
    }
    if(form.valid && this.features_rating && this.services_rating && this.value_rating && this.location_rating){
      form.value['features'] = this.features_rating;
      form.value['service'] = this.services_rating;
      form.value['value'] = this.value_rating;
      form.value['location'] = this.location_rating;
      form.value['user_id'] = this.data.rating.user_id;
      form.value['branch_id'] = this.data.rating.branch_id;
      form.value['rating_id'] = this.data.rating.rating_id;
      this.mainData.put(form.value, `api/vendor/rating`).subscribe(data => {
        if(data) {
          this.mainData.openToast("Review Updated!");
          form.reset();
          this.dialogRef.close();
        }
        else this.mainData.openToast("Some error occurred!");
      })
    }
  }

}
