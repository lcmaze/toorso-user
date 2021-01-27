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
    this.getDetails();
  }

  page: any = 1;
  limit: any;
  filters: any;
  vendors: any;
  getDetails(){
    this.mainData.get(`api/get-filter-results`).subscribe(data => {
      this.vendors = data;
    })
  }

}
