import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

  @Input('data') data: any;
  cdnLink: string = environment.cdnLink;
  constructor() { }

  ngOnInit() {
  }

  months: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  parseDate(date: any){
    if(date){
      let d = new Date(date);
      return `${d.getDate()} ${this.months[d.getMonth()]}, ${d.getFullYear()}`
    }
  }

}
