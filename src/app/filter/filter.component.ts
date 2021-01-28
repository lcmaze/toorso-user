import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private mainData: MainService) { }

  ngOnInit() {
    this.getDetails(1,3);
  }

  page: any = 1;
  limit: any;
  filters: any;
  vendors: any;
  getDetails(page: number, limit: number){
    this.mainData.get(`api/get-filter-results?page=` + page + `&limit=` + limit).subscribe(data => {
      this.vendors = data;
    })
  }

}
