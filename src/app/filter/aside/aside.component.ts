import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Options } from 'ng5-slider';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  @Output('filter') filterLink: any = new EventEmitter();
  @Output('selected') selectedFilterChange: any = new EventEmitter();

  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  constructor(private mainData: MainService) { }

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
    this.mainData.selectedMainCategory.subscribe(data => {
      this.selectedMainCategory = data;
      this.getSubCategory();
    })
    this.getFoods();
    this.getFacilities();
    this.getTransportation();
    this.getSubCategory();
  }

  facilities: any;
  foods: any;
  transportations: any;
  sub_categories: any;
  getFacilities() {
    this.mainData.get(`api/get-filter-facilities`).subscribe(data => {
      this.facilities = data;
      this.facilities.forEach(data => {data['checked'] = false});
    })
  }
  getTransportation() {
    this.mainData.get(`api/get-filter-transportation`).subscribe(data => {
      this.transportations = data;
      this.transportations.forEach(data => {data['checked'] = false});
    })
  }
  getFoods() {
    this.mainData.get(`api/get-filter-foods`).subscribe(data => {
      this.foods = data;
      this.foods.forEach(data => {data['checked'] = false});
    })
  }
  getSubCategory() {
    this.mainData.get(`api/get-categories?m_id=${this.selectedMainCategory['m_category_id']}`).subscribe(data => {
      this.sub_categories = data;
      this.sub_categories.forEach(data => {data['checked'] = false});
    })
  }

  // ************** filter selection ***************
  selectedFacilities: any = [];
  selectedFilter_Facilities: any = [];
  selectFacility(ev: any, index: any){
    if(ev){
      let value = Number(ev.target.value);
      this.facilities[index].checked = ev.target.checked;
      if(ev.target.checked){
        this.selectedFacilities.push(value);
        this.selectedFilter_Facilities.push(this.facilities[index]);
      }
      else if(!ev.target.checked){
        this.mainData.deleteFromArray(this.selectedFacilities, value);
        this.mainData.deleteFromArray(this.selectedFilter_Facilities, this.facilities[index]);
      }
      this.createFilterLink(this.selectedFacilities, 'facilities');
      this.selectedFilterChange.emit({filters: this.selectedFilter_Facilities, type: 'facilities'});
    }
  }

  selectedFoods: any = [];
  selectedFilter_Foods: any = [];
  selectFood(ev: any, index: any){
    if(ev){
      let value = Number(ev.target.value);
      this.foods[index].checked = ev.target.checked;
      if(ev.target.checked){
        this.selectedFoods.push(value);
        this.selectedFilter_Foods.push(this.foods[index]);
      }
      else if(!ev.target.checked){
        this.mainData.deleteFromArray(this.selectedFoods, value);
        this.mainData.deleteFromArray(this.selectedFilter_Foods, this.foods[index]);
      }
      this.createFilterLink(this.selectedFoods, 'food');
      this.selectedFilterChange.emit({filters: this.selectedFilter_Foods, type: 'food'});
    }
  }

  selectedTransportations: any = [];
  selectedFilter_Transportation: any = [];
  selectTransportation(ev: any, index: any){
    if(ev){
      let value = Number(ev.target.value);
      this.transportations[index].checked = ev.target.checked;
      if(ev.target.checked){
        this.selectedTransportations.push(value);
        this.selectedFilter_Transportation.push(this.transportations[index]);
      }
      else if(!ev.target.checked){
        this.mainData.deleteFromArray(this.selectedTransportations, value);
        this.mainData.deleteFromArray(this.selectedFilter_Transportation, this.transportations[index]);
      }
      this.createFilterLink(this.selectedTransportations, 'transportation');
      this.selectedFilterChange.emit({filters: this.selectedFilter_Transportation, type: 'transportation'});
    }
  }

  selectedCategories: any = [];
  selectedFilter_category: any = [];
  selectCategory(ev: any, index: any){
    // console.log(ev.target.value);
    if(ev){
      let value = ev.target.value;
      this.sub_categories[index].checked = ev.target.checked;
      if(ev.target.checked){
        this.selectedCategories.push(value);
        this.selectedFilter_category.push(this.sub_categories[index]);
      }
      else if(!ev.target.checked){
        this.mainData.deleteFromArray(this.selectedCategories, value);
        this.mainData.deleteFromArray(this.selectedFilter_category, this.sub_categories[index]);
      }
      this.createFilterLink(this.selectedCategories, 'category');
      this.selectedFilterChange.emit({filters: this.selectedFilter_category, type: 'category'});
    }
  }

  createFilterLink(selected_facilities: any, type: string){
    let link = '';
    let facility_link = '';let food_link = '';let transportation_link = '';let category_link = '';
    if(selected_facilities && selected_facilities.length > 0 && type === 'facilities') facility_link = `&facility=${selected_facilities}`;
    if(selected_facilities && selected_facilities.length > 0 && type === 'food') food_link = `&food=${selected_facilities}`;
    if(selected_facilities && selected_facilities.length > 0 && type === 'transportation') transportation_link = `&transportation=${selected_facilities}`;
    if(selected_facilities && selected_facilities.length > 0 && type === 'category') category_link = `&category=${selected_facilities}`;
    link = `${facility_link}${food_link}${transportation_link}${category_link}`;
    this.filterLink.emit(link);
  }

}
