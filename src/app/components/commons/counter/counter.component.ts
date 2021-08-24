import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input('value')value : number = 1;
  @Input('btn')btn : any = "fab";
  @Input('max')max : any = 1;
  @Output('data')data : any = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  add(){
    if(this.value>=0 && this.value <= this.max){
      this.value++;
      this.data.emit(this.value);
    }
  }

  sub(){
    if(this.value>=1){
    this.value--;
    this.data.emit(this.value);
  }}
}
