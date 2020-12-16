import { Component, OnInit } from '@angular/core';

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
    }]

  constructor() { }

  ngOnInit() {
  }

}
