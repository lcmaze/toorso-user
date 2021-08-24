import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { AsideComponent } from './aside/aside.component';
import { SelectedfilterComponent } from './selectedfilter/selectedfilter.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(private mainData: MainService, private activatedRoute: ActivatedRoute, private router: Router) { }

  @ViewChild('selected_filter', { static: false}) selectedFilterComponent: SelectedfilterComponent;
  @ViewChild('aside_filter', { static: false}) asideFilterComponent: AsideComponent;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.page = Number(params.get('link'));
      if(!this.page) this.page = 1;
      this.getDetails();
    })
  }

  page: any = 1;
  limit: any = 10;
  filters: any;
  vendors: any;
  getDetails(){
    this.mainData.get(`api/get-filter-results?page=${this.page}&limit=${this.limit}&${this.filterLink}${this.category_link}`).subscribe(data => {
      this.vendors = data;
    })
  }

  loadMore(ev: any) {
    // console.log(ev);
    window.scrollTo(0, 0);
    this.page = ev.pageIndex + 1;
    this.limit = ev.pageSize;
    if(this.page - 1 === ev.pageIndex) this.getDetails();
    else this.router.navigateByUrl('/filter/' + this.page);
    // this.limit = ev.pageSize;
    // this.mainData.get(`api/get-filter-results?page=${this.page}&limit=${this.limit}&${this.filterLink}${this.category_link}`).subscribe(data => {
    //   this.vendors = data;
    //   window.scrollTo(0, 0);
    // })
  }


  // ********* FILTERS CHANGE *********** 
  category_link: any = ''; 
  categoryChange(ev: any){
    this.category_link = '';
    if(ev.category_id != 0){
      this.category_link = `&category=${ev.category_id}`;
    }
    this.getDetails();
  }

  fullFilterChange(ev: any){
    this.selectedFilterComponent.changeFilter(ev);
  }

  filterLink: any = ``;
  filterChange(ev: any){
    this.filterLink = ev;
    this.getDetails();
  }

  deleteSelectedFilters(ev: any){
    if(ev.type === 'facilities'){
      let m_filters = this.asideFilterComponent.facilities;
      this.asideFilterComponent.selectedFacilities = ev.ids;
      this.asideFilterComponent.selectedFilter_Facilities = ev.filters;
      this.asideFilterComponent.createFilterLink(ev.ids, 'facilities');
      for(let i = 0; i < m_filters.length; i++){
        if(ev.ids.includes(m_filters[i].facility_id)) this.asideFilterComponent.facilities[i].checked = true;
        else{
          this.asideFilterComponent.facilities[i].checked = false;
        }
      }
    }
    if(ev.type === 'food'){
      let m_filters = this.asideFilterComponent.foods;
      this.asideFilterComponent.selectedFoods = ev.ids;
      this.asideFilterComponent.selectedFilter_Foods = ev.filters;
      this.asideFilterComponent.createFilterLink(ev.ids, 'food');
      for(let i = 0; i < m_filters.length; i++){
        if(ev.ids.includes(m_filters[i].food_id)) this.asideFilterComponent.foods[i].checked = true;
        else{
          this.asideFilterComponent.foods[i].checked = false;
        }
      }
    }
    if(ev.type === 'transportation'){
      let m_filters = this.asideFilterComponent.transportations;
      this.asideFilterComponent.selectedTransportations = ev.ids;
      this.asideFilterComponent.selectedFilter_Transportation = ev.filters;
      this.asideFilterComponent.createFilterLink(ev.ids, 'transportation');
      for(let i = 0; i < m_filters.length; i++){
        if(ev.ids.includes(m_filters[i].transportation_id)) this.asideFilterComponent.transportations[i].checked = true;
        else{
          this.asideFilterComponent.transportations[i].checked = false;
        }
      }
    }
  }

}
