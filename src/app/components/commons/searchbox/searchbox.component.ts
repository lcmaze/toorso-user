import { Component, OnInit, Input } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  keypressed : boolean = false;
  @Input('type') type : string;

  constructor(private mainData: MainService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  suggestionbox(){
    this.keypressed=! this.keypressed;
  }

  // searching 
  searchingTimeout: any;
  search(ev: any){
    if(ev.target.value.length > 2){
      clearTimeout(this.searchingTimeout);
      this.searchingTimeout = setTimeout(() => {
        this.mainData.get(`api/get-search?q=${ev.target.value}`).subscribe(data => {
          console.log(data);
        })
      }, 250);
    }
  }

}
