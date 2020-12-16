import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorybox',
  templateUrl: './categorybox.component.html',
  styleUrls: ['./categorybox.component.scss']
})
export class CategoryboxComponent implements OnInit {

  className: string = "Choose Category";

  classes: string[] = ['Hotels & Resorts','Homestays'];

  constructor() { }

  ngOnInit() {

  }

}
