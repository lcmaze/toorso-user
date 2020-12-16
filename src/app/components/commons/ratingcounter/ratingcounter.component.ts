import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratingcounter',
  templateUrl: './ratingcounter.component.html',
  styleUrls: ['./ratingcounter.component.scss']
})
export class RatingcounterComponent implements OnInit {

  @Input('value')value : number = 1;

  constructor() { }

  ngOnInit() {
  }

  add(){
    if(this.value>=0 && this.value<=4){
    this.value++;
  }}

  sub(){
    if(this.value>=1 && this.value<=5){
    this.value--;
  }}

}
