import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ResultsComponent implements OnInit {

  @Input('data') data : any;
  @Input('link') link : any;
  cdnLink: string = environment.cdnLink;
  // mySlideImages = ['assets/images/resort2.jpg', 'assets/images/resort2.jpg'];
  // mySlideOptions = { items: 1, dots: false, nav: false };

  constructor(private mainData: MainService, private router: Router) { }
  
  showRailwayAirport: any = "vendor_airport_select";
  selectAirportRailway(ev: any){
    this.showRailwayAirport = ev.target.value;
  }

  highlighted_keywords: any = [];
  galleryImages: any;
  ngOnInit() {
    if(this.data){
      if(this.data.vendor_branches && this.data.vendor_branches.length > 0){
        if(this.data.vendor_branches[0].branch_images && this.data.vendor_branches[0].branch_images.length > 0){
          this.galleryImages = this.data.vendor_branches[0].branch_images;
        }
        this.data.vendor_branches.forEach(vb => {
          vb.vendor_products.forEach(vp => {
            vp.highlited_features.split(',').forEach(p => {
              this.highlighted_keywords.push(p);
            })
          })
        })
      }
    }
  }

  navigate(){
    if(this.data){
      if(this.data.vendor_branches && this.data.vendor_branches.length > 0){
        for(let branch of this.data.vendor_branches){
          if(branch.is_main_branch === 1){
            this.router.navigateByUrl("/vendor/" + branch.meta_slug);
          }
        }
      }
    }
  }

}
