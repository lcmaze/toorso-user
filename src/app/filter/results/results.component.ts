import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ResultsComponent implements OnInit {

  @Input('ids') ids : any;

  // mySlideImages = ['assets/images/resort2.jpg', 'assets/images/resort2.jpg'];
  // mySlideOptions = { items: 1, dots: false, nav: false };

  constructor() { }

  ngOnInit() {
  }

}
