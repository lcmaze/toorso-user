import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.scss']
})
export class PercentageComponent implements OnInit {

  @Input('percentage') percentage: number;
  @Input('value') value: number;

  constructor() { }

  ngOnInit() {
    if(this.percentage) this.percentage = Math.round(this.percentage * 10) / 10;
    if(this.value) this.value = Math.round(this.value * 10) / 10;
  }

}
