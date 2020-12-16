import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  keypressed : boolean = false;
  @Input('type') type : string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  suggestionbox(){
    this.keypressed=! this.keypressed;
  }
}
