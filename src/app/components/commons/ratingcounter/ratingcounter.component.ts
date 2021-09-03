import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ratingcounter',
  templateUrl: './ratingcounter.component.html',
  styleUrls: ['./ratingcounter.component.scss']
})
export class RatingcounterComponent implements OnInit {

  @Input('value')value : number = 1;
  @Output('data') data: any = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  add(){
    if(this.value>=0 && this.value<=4){
    this.value++;
    console.log(this.value);
    this.data.emit(this.value);
  }}

  sub(){
    if(this.value>=1 && this.value<=5){
    this.value--;
    this.data.emit(this.value);
  }}

}
