import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-selectedfilter',
  templateUrl: './selectedfilter.component.html',
  styleUrls: ['./selectedfilter.component.scss']
})
export class SelectedfilterComponent implements OnInit {

  @Output('filter') filters: any = new EventEmitter();

  constructor(private mainData: MainService) { }

  ngOnInit() {
  }

  facility_filters: any;
  facility_foods: any;
  facility_transportations: any;
  changeFilter(data: any){
    if(data.type === 'facilities') this.facility_filters = data.filters;
    if(data.type === 'food') this.facility_foods = data.filters;
    if(data.type === 'transportation') this.facility_transportations = data.filters;
  }

  reset(){
    this.facility_filters = [];
    this.facility_foods = [];
    this.facility_transportations = [];
    this.filters.emit({filters: [], type: 'facilities', ids: []});
    this.filters.emit({filters: [], type: 'food', ids: []});
    this.filters.emit({filters: [], type: 'transportation', ids: []});
  }

  deleteFilter(filters: any, type: string){
    if(type === 'facilities'){
      this.mainData.deleteFromArray(this.facility_filters, filters);
      let filter_ids = [];
      this.facility_filters.forEach(data => {
        filter_ids.push(data.facility_id);
      })
      this.filters.emit({filters: this.facility_filters, type: 'facilities', ids: filter_ids});
    }
    if(type === 'food'){
      this.mainData.deleteFromArray(this.facility_foods, filters);
      let filter_ids = [];
      this.facility_foods.forEach(data => {
        filter_ids.push(data.food_id);
      })
      this.filters.emit({filters: this.facility_foods, type: 'food', ids: filter_ids});
    }
    if(type === 'transportation'){
      this.mainData.deleteFromArray(this.facility_transportations, filters);
      let filter_ids = [];
      this.facility_transportations.forEach(data => {
        filter_ids.push(data.transportation_id);
      })
      this.filters.emit({filters: this.facility_transportations, type: 'transportation', ids: filter_ids});
    }
  }

}
