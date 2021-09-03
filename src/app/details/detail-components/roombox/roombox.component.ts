import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-roombox',
  templateUrl: './roombox.component.html',
  styleUrls: ['./roombox.component.scss']
})
export class RoomboxComponent implements OnInit {

  @Input('rooms') rooms : [];
  @Output('data') data: any = new EventEmitter();

  constructor() { }

  products: any;
  ngOnInit() {
    this.products = this.rooms['vendor_products'];
    this.products.forEach((product, i) => {
      this.products[i]['total_qty'] = 1;
    })
  }

  total_products: any = [];
  addProduct(data: any, index: any){
    let obj = {};
    obj['id'] = data['product_id'];
    obj['title'] = data['room_type'];
    obj['price'] = data['price'];
    obj['qty'] = data['total_qty'];
    this.total_products[index] = obj;
    // console.log(this.total_products);
    this.data.emit(this.total_products);
  }

  deleteProduct(id: any, index: any){
    this.total_products.splice(index, 1);
    // console.log(this.total_products);
    this.data.emit(this.total_products);
  }

  addAddon(ev: any, data: any, index: any, number: any){
    if(number === 1){
      if(ev.target.checked){
        this.total_products[index]['addon_one'] = data;
      }
      else{
        this.total_products[index]['addon_one'] = null;
      }
    }
    if(number === 2){
      if(ev.target.checked){
        this.total_products[index]['addon_two'] = data;
      }
      else{
        this.total_products[index]['addon_two'] = null;
      }
    }
    // console.log(this.total_products);
    this.data.emit(this.total_products);
  }

}
