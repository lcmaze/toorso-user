import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-placedetails',
  templateUrl: './placedetails.component.html',
  styleUrls: ['./placedetails.component.scss']
})
export class PlacedetailsComponent implements OnInit {

  read_more = false;

  constructor() { }

  ngOnInit() {
  }

  readmore() {
    this.read_more = !this.read_more;
  }

}
