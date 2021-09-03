import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { WritereviewComponent } from 'src/app/components/commons/writereview/writereview.component';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  read_more = false;
  cdnLink: string = environment.cdnLink;

  constructor(public dialog: MatDialog, private actvatedRoute: ActivatedRoute, private mainData: MainService, private sanitizer: DomSanitizer) {
  }

  writereview(): void {
    const dialogRef = this.dialog.open(WritereviewComponent, {
      width: '540px',
      data: {vendor: this.vendor, rating: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  readmore(){
    this.read_more = !this.read_more;
  }

  slug: any;
  user_starting_date: any;
  user_ending_date: any;
  ngOnInit() {
    this.actvatedRoute.paramMap.subscribe(data => {
      this.slug = data['params'].slug;
      this.user_starting_date = new Date();
      this.user_ending_date = new Date();
      this.getVendor();
    })
  }

  vendor: any;
  features_rating: number = 0;
  service_rating: number = 0;
  value_rating: number = 0;
  location_rating: number = 0;
  total_rating: number = 0;
  youtubeLink: any;
  mapLink: any;
  highlighted_keywords: any = [];
  getVendor(){
    this.mainData.get(`api/vendor/single-vendor?vendor_id=${this.slug}`).subscribe(data => {
      // console.log(data);
      this.vendor = data;
      this.vendor.vendor_products.forEach(vp => {
        vp.highlited_features.split(',').forEach(p => {
          if(this.highlighted_keywords.indexOf(p) === -1) this.highlighted_keywords.push(p);
        })
      })
      this.parseRooms();
      this.getRatings();
      if(this.vendor.video_url) {
        let link = `https://www.youtube.com/embed/${this.vendor.video_url}`;
        this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
      }
      if(this.vendor.vendor_latitude && this.vendor.vendor_longitude){
        this.mapLink = this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${this.vendor.vendor_latitude},${this.vendor.vendor_longitude}&z=8&output=embed`);
      }
    })
  }

  parseRooms(){
    if(this.vendor){
      let d = new Date();
      this.vendor.vendor_products.forEach((product, i) => {
        
        product['parsed_highlited_features'] = [];
        product.highlited_features.split(',').forEach((feature) => {
          if(product.parsed_highlited_features.indexOf(feature) === -1) product.parsed_highlited_features.push(feature);
        })

        this.vendor.vendor_products[i]['price'] = 0;
        this.vendor.vendor_products[i]['original_price'] = 0;
        this.vendor.vendor_products[i]['text_price'] = '---';

        this.parseDatePrice(product.product_offseason_price.date_range_one_start, product.product_offseason_price.date_range_one_end, i, product.product_offseason_price.price_one,product.product_offseason_price.text_one);
        this.parseDatePrice(product.product_offseason_price.date_range_two_start, product.product_offseason_price.date_range_two_end, i, product.product_offseason_price.price_two,product.product_offseason_price.text_two);
        this.parseDatePrice(product.product_offseason_price.date_range_three_start, product.product_offseason_price.date_range_three_end, i, product.product_offseason_price.price_three,product.product_offseason_price.text_three);
        this.parseDatePrice(product.product_offseason_price.date_range_four_start, product.product_offseason_price.date_range_four_end, i, product.product_offseason_price.price_four,product.product_offseason_price.text_four);
        this.parseDatePrice(product.product_offseason_price.date_range_five_start, product.product_offseason_price.date_range_five_end, i, product.product_offseason_price.price_five,product.product_offseason_price.text_five);
      })
      console.log(this.vendor.vendor_products);
    }
  }

  parseDatePrice(start, end, index, price, text){
    if(start && end){
      let start_date = new Date(start).setUTCHours(23,59,59,998);
      let end_date = new Date(end).setUTCHours(23,59,59,998);
      let user_start_date = new Date(this.user_starting_date).setUTCHours(23,59,59,998);
      let user_end_date = new Date(this.user_ending_date).setUTCHours(23,59,59,998);
      // console.log(user_start_date + ' | ' + user_end_date + ' | ' + end_date + ' | ' + start_date);
      // console.log(Number(this.user_ending_date.getTime()) <= Number(end_date.getTime()), Number(this.user_starting_date.getTime()) >= Number(start_date.getTime()));
      // if(this.user_ending_date <= end_date && this.user_starting_date >= start_date){
      if(user_end_date <= end_date && user_start_date >= start_date){
        if(this.vendor.vendor_products[index]['price'] < price){
          this.vendor.vendor_products[index]['original_price'] = price;
          this.vendor.vendor_products[index]['price'] = this.getPromotionValue(price);
          this.vendor.vendor_products[index]['text_price'] = text;
        }
      }
    }
  }

  getPromotionValue(value){
    if(this.vendor.product_promotion){
      return value - (this.vendor.product_promotion.discount * (value/100));
    }
    else{
      return value;
    }
  }

  page: any = 1;
  limit: any = 50;
  ratings_count: any = 0;
  getRatings(){
    this.page = 1;
    if(this.vendor){
      this.mainData.get(`api/vendor/rating?id=${this.vendor.branch_id}&page=${this.page}&limit=${this.limit}`).subscribe(data => {
        this.ratings_count = data['count'];
        this.vendor['ratings'] = data['rows'];
        this.vendor.ratings && this.vendor.ratings.forEach(rating => {
          this.features_rating += rating.features;
          this.service_rating += rating.service;
          this.value_rating += rating.value;
          this.location_rating += rating.location;
        });
        this.total_rating = ((this.features_rating/this.ratings_count) + (this.service_rating/this.ratings_count) + (this.value_rating/this.ratings_count) + (this.location_rating/this.ratings_count))/4
      })
    }
  }

}
