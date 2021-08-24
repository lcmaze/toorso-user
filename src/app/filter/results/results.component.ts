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
  user_starting_date: any;
  user_ending_date: any;
  ngOnInit() {
    if(this.data){
      this.user_starting_date = new Date();
      this.user_ending_date = new Date();
      if(this.data.vendor_branches && this.data.vendor_branches.length > 0){
        if(this.data.vendor_branches[0].branch_images && this.data.vendor_branches[0].branch_images.length > 0){
          this.galleryImages = this.data.vendor_branches[0].branch_images;
        }
        this.data.vendor_branches.forEach(vb => {
          vb.vendor_products.forEach(vp => {
            vp.highlited_features.split(',').forEach(p => {
              if(this.highlighted_keywords.indexOf(p) === -1) this.highlighted_keywords.push(p);
            })
          })
        })
      }
      this.parseRooms();
    }
  }

  getRatingWidth(data: any){
    if(data && data.total_ratings != 0){
      let total_rating = ((data.total_features_sum/data.total_ratings) +     
      (data.total_services_sum/data.total_ratings) +     
      (data.total_value_sum/data.total_ratings) +     
      (data.total_location_sum/data.total_ratings))/4
      return (total_rating/5)*100 + '%';
    }
    else{
      return 0 + '%';
    }
  }

  vendor_product_main_price: any = 0;
  vendor_product_original_price: any = 0;
  getLowestPrice(data){
    if((data.length > 0)){
      let main_price;
      data.forEach(p => {
        let price;
        if(!price || price > p.product_offseason_price.price_one) price = p.product_offseason_price.price_one;
        if(!price || price > p.product_offseason_price.price_two) price = p.product_offseason_price.price_two;
        if(!price || price > p.product_offseason_price.price_three) price = p.product_offseason_price.price_three;
        if(!price || price > p.product_offseason_price.price_four) price = p.product_offseason_price.price_four;
        if(!price || price > p.product_offseason_price.price_five) price = p.product_offseason_price.price_five;
        if(!main_price || main_price > price) main_price = price;
      })
      return main_price;
    }
    else return "---";
  }

  parseRooms(){
    if(this.data){
      // console.log(this.data);
      let d = new Date();
      this.data.vendor_branches[0].vendor_products.forEach((product, i) => {
        // console.log(product.product_offseason_price);
        
        this.data.vendor_branches[0].vendor_products[i]['price'] = 0;
        this.data.vendor_branches[0].vendor_products[i]['original_price'] = 0;
        this.data.vendor_branches[0].vendor_products[i]['text_price'] = '---';

        this.parseDatePrice(product.product_offseason_price.date_range_one_start, product.product_offseason_price.date_range_one_end, i, product.product_offseason_price.price_one,product.product_offseason_price.text_one);
        this.parseDatePrice(product.product_offseason_price.date_range_two_start, product.product_offseason_price.date_range_two_end, i, product.product_offseason_price.price_two,product.product_offseason_price.text_two);
        this.parseDatePrice(product.product_offseason_price.date_range_three_start, product.product_offseason_price.date_range_three_end, i, product.product_offseason_price.price_three,product.product_offseason_price.text_three);
        this.parseDatePrice(product.product_offseason_price.date_range_four_start, product.product_offseason_price.date_range_four_end, i, product.product_offseason_price.price_four,product.product_offseason_price.text_four);
        this.parseDatePrice(product.product_offseason_price.date_range_five_start, product.product_offseason_price.date_range_five_end, i, product.product_offseason_price.price_five,product.product_offseason_price.text_five);
      })
    }
  }

  parseDatePrice(start, end, index, price, text){
    let start_date = new Date(start).setUTCHours(23,59,59,998);
    let end_date = new Date(end).setUTCHours(23,59,59,998);
    let user_start_date = new Date(this.user_starting_date).setUTCHours(23,59,59,998);
    let user_end_date = new Date(this.user_ending_date).setUTCHours(23,59,59,998);
    if(user_end_date <= end_date && user_start_date >= start_date){
      if(this.data.vendor_branches[0].vendor_products[index]['price'] < price){
        let m_price = this.getPromotionValue(price);
        this.data.vendor_branches[0].vendor_products[index]['original_price'] = price;
        this.data.vendor_branches[0].vendor_products[index]['price'] = this.getPromotionValue(price);
        this.data.vendor_branches[0].vendor_products[index]['text_price'] = text;
        // console.log(this.vendor_product_main_price, m_price)
        if(this.vendor_product_main_price < m_price){
          this.vendor_product_main_price = m_price;
          this.vendor_product_original_price = price;
        }
      }
    }
  }

  getPromotionValue(value){
    if(this.data.vendor_branches[0].product_promotion){
      return value - (this.data.vendor_branches[0].product_promotion.discount * (value/100));
    }
    else{
      return value;
    }
  }

  navigate(){
    if(this.data && this.data.membership){
      // console.log(this.data);
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
