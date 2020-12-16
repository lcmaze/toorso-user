import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-roombox',
  templateUrl: './roombox.component.html',
  styleUrls: ['./roombox.component.scss']
})
export class RoomboxComponent implements OnInit {

  @Input('rooms') rooms : [];

  constructor() { }

  ngOnInit() {
  }

}
