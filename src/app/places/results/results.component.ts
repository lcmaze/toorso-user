import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input('hotel') hotel: any;
  @Input('link') link: any;

  constructor() { }

  ngOnInit() {
  }

}
