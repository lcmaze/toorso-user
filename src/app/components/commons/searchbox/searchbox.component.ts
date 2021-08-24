import { Component, OnInit, Input, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  keypressed : boolean = false;
  @Input('type') type : string;

  @ViewChild('suggestionsBox', { static: false}) suggestionsBox: any = ElementRef;
  @ViewChild('searchInput', { static: false}) searchInput: any = ElementRef;

  constructor(private mainData: MainService, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.listen('window', 'click',(e:Event)=>{
     if(this.suggestionsBox && e.target !== this.suggestionsBox.nativeElement && e.target!==this.searchInput.nativeElement){
         this.suggestions = [];
     }
 });
  }

  ngAfterViewInit() {
  }

  suggestionbox(){
    this.keypressed=! this.keypressed;
  }

  // searching 
  searchingTimeout: any;
  suggestions: any;
  search(ev: any){
    if(ev.target.value.length > 0){
      clearTimeout(this.searchingTimeout);
      this.searchingTimeout = setTimeout(() => {
        this.mainData.get(`api/get-search?q=${ev.target.value}`).subscribe(data => {
          // console.log(data);
          this.suggestions = data['rows'];
        })
      }, 250);
    }
    else{
      this.suggestions = [];
    }
  }

}
