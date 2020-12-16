import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input('value')value : number = 1;
  @Input('btn')btn : any = "fab";

  constructor() { }

  ngOnInit() {
  }

  add(){
    if(this.value>=0){
    this.value++;
  }}

  sub(){
    if(this.value>=1){
    this.value--;
  }}
}
