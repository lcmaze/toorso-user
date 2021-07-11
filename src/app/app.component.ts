import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private mainData: MainService, private firebase: FirebaseService) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  async ngOnInit() {
    this.mainData.showLoading();
    await this.firebase.loginCheck();
    this.mainData.hideLoading();  
  }



}
