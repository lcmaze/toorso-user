import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-categorybox',
  templateUrl: './categorybox.component.html',
  styleUrls: ['./categorybox.component.scss']
})
export class CategoryboxComponent implements OnInit {

  @Output('category') categoryEmitter: any = new EventEmitter();
  constructor(private mainData: MainService) { }
  
  className: any = {m_category_id: 0, m_category_name: "Choose Category"};
  selectedMainCategory: any;
  ngOnInit() {
    if(localStorage.getItem('main_category')){
      this.selectedMainCategory = JSON.parse(localStorage.getItem('main_category'));
      this.mainData.selectedMainCategory.next(this.selectedMainCategory);
    }
    else{
      this.selectedMainCategory = {m_category_id: 2, m_category_name: "Hotels, Resorts & Homestays"};
      localStorage.setItem('main_category', JSON.stringify({m_category_id: 2, m_category_name: "Hotels, Resorts & Homestays"}));
      this.mainData.selectedMainCategory.next(this.selectedMainCategory);
    }
    this.className = this.selectedMainCategory;
    this.getCategory();
  }

  categories: any;
  getCategory() {
    this.mainData.get(`api/get-main-category`).subscribe(data => {
      this.categories = data;
    })
  }

  selectCategory(ev: any){
    // this.categoryEmitter.emit(ev.value);
    console.log(ev.value);
    this.selectedMainCategory = ev.value;
    this.mainData.selectedMainCategory.next(this.selectedMainCategory);
  }

}
