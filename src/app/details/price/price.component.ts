import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  apidata = [{
    type : 'active',
    added : true,
    name : 'Ordinary Room - Suitable for 1 Adult',
    type1 : 'Non AC',
    type2 : 'Single Bed',
    properties : ['200 Sqft Room', '32“ LED TV', 'Forest View', 'Family Friendly', 'Free Toiletries', 'Sofa', 'Cloth Rack', 'Dining Table', 'Computer Table'],
    cap1 : 'Free Breakfast',
    cap2 : 'Free Cancellation',
    cap3 : 'Free Breakfast',
    cap4 : 'Free Cancellation',
    baseprice : 1200,
    addons : [{
      price : 100,
      def : 'Extra One Person'
    },
    {
      price : 200,
      def : 'Extra  Person'
    }]
  },

  {
    type : 'active',
    added : false,
    name : 'Ordinary Room - Suitable for 2 Adult',
    type1 : 'Non AC',
    type2 : 'Single Bed',
    properties : ['200 Sqft Room', '32“ LED TV', 'Forest View', 'Family Friendly', 'Free Toiletries', 'Sofa', 'Cloth Rack', 'Dining Table', 'Computer Table'],
    cap1 : 'Free Breakfast',
    cap2 : 'Free Cancellation',
    cap3 : 'Free Breakfast',
    cap4 : 'Free Cancellation',
    baseprice : 1350,
    addons : null
  },

  {
    type : 'inactive',
    added : false,
    name : 'Ordinary Room - Suitable for 2 Adult',
    type1 : 'Non AC',
    type2 : 'Single Bed',
    properties : ['200 Sqft Room', '32“ LED TV', 'Forest View', 'Family Friendly', 'Free Toiletries', 'Sofa', 'Cloth Rack', 'Dining Table', 'Computer Table'],
    cap1 : 'Free Breakfast',
    cap2 : 'Free Cancellation',
    cap3 : 'Free Breakfast',
    cap4 : 'Free Cancellation',
    baseprice : 1350,
    addons : null
  },

  {
    type : 'inactive',
    added : false,
    name : 'Ordinary Room - Suitable for 1 Adult',
    type1 : 'Non AC',
    type2 : 'Single Bed',
    properties : ['200 Sqft Room', '32“ LED TV', 'Forest View', 'Family Friendly', 'Free Toiletries', 'Sofa', 'Cloth Rack', 'Dining Table', 'Computer Table'],
    cap1 : 'Free Breakfast',
    cap2 : 'Free Cancellation',
    cap3 : 'Free Breakfast',
    cap4 : 'Free Cancellation',
    baseprice : 1200,
    addons : [{
        price : 100,
        def : 'Extra One Person'
      },
      {
        price : 200,
        def : 'Extra  Person'
      }]
    }];

  constructor(private mainData: MainService, private actvatedRoute: ActivatedRoute) { }

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

  cart: any;
  total_price: any = 0;
  calculateCart(data: any){
    if(data){
      this.cart = data;
      this.total_price = 0;
      for (let i = 0; i < this.cart.length; i++) {
        this.total_price += this.calculatePrice(this.cart[i]); 
      }
    }
  }
  calculatePrice(data: any){
    if(data){
      let amount = data.qty * data.price;
      if(data.addon_one){
        amount = amount + (data.qty * data.addon_one.value);
      }
      if(data.addon_two){
        amount = amount + (data.qty * data.addon_two.value);
      }
      return amount;
    }
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
      this.vendor = data;
      console.log(data['vendor_products']);
      this.apidata = this.vendor;
      this.vendor.vendor_products.forEach(vp => {
        vp.highlited_features.split(',').forEach(p => {
          if(this.highlighted_keywords.indexOf(p) === -1) this.highlighted_keywords.push(p);
        })
      })
      this.parseRooms();
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
      // console.log(this.vendor.vendor_products);
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

}
