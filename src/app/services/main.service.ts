import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  uid: any;
  userDetails: any;
  userDetailsObservable: any = new Subject<any>();
  cities: any;
  states: any;
  countries: any;
  selectedBranch: any;
  selectedVendor: any;

  clientId: any;

  selectedCountry: any = new Subject<any>();
  selectedState: any = new Subject<any>();
  state: any;
  selectedDistrict: any = new Subject<any>();
  selectedMainCategory: any = new Subject<any>();

  filterLink: any;
  changeFilter(link: any){
    this.filterLink = link;
  }

  put(value: any, link: string){
    return this.http.put(environment.apiUrl + link, JSON.stringify(value), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  post(value: any, link: string){
    return this.http.post(environment.apiUrl + link, JSON.stringify(value), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  delete(link: string){
    return this.http.delete(environment.apiUrl + link, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  get(link: string){
    return this.http.get(environment.apiUrl + link);
  }
  private cacheValue: any = [];
  getCache(link: string){
    if(typeof this.cacheValue[link] === 'undefined'){
      this.cacheValue[link] = this.http.get(environment.apiUrl + link)
      .pipe(
        shareReplay(1)
      );
    }
    return this.cacheValue[link];
  }

  async openToast(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

  // show toast 
  showToast(msg: string){
    this._snackBar.open(msg, "close");
  }
  

  // show loading 
  showLoadingFlag = new Subject<boolean>();
  showLoading(){
    // console.log("Showing loading")
    setTimeout(() => {
      this.showLoadingFlag.next(true);
    }, 50);
  }
  hideLoading(){
    // console.log("Hiding loading")
    setTimeout(() => {
      this.showLoadingFlag.next(false);
    }, 50);
  }

  // delete element from array 
  deleteFromArray(array, value){
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

}
