import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'loading-screen',
  templateUrl: './loadin-screen.component.html',
  styleUrls: ['./loadin-screen.component.scss']
})
export class LoadinScreenComponent implements OnInit {

  constructor(private mainData: MainService) { }

  showLoading: any = this.mainData.showLoadingFlag;
  ngOnInit(): void {

  }

}
