import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('country') country: boolean = true;
  @Input ('isloggedin') isloggedin : boolean = false;

  constructor(public dialog: MatDialog) { }

  money : string[] =  ['₹ INR', '$ Dollar'];
  locations : any = [
    {name: 'India', flag: 'india.jpg', branch: true, states: ['Kerala', 'Karnataka', 'Tamil Nadu']},
    {name: 'Oman', flag: 'oman.jpg', branch: false, states: null }
  ]
  selectedcurrency :string = this.money[0];
  selectedcountry :string = this.locations[0].name;
  branchvisible : any = true;
  statelist: string[] = this.locations[0].states;
  selectedstate : string = this.locations[0].states[0];
  selectedflag: string = this.locations[0].flag;

  ngOnInit() {
  }


  currencyselect(selectedcurrency :string){
    this.selectedcurrency = selectedcurrency;
  }

  countryselect(selectedcountry :string, branchvisible :string, statelist: any, selectedflag: string){
    this.selectedcountry = selectedcountry;
    this.branchvisible = branchvisible;
    this.statelist = statelist;
    this.selectedflag = selectedflag;
    console.log(this.selectedflag);
  }

  stateselect(selectedstate : string){
    this.selectedstate = selectedstate;
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '420px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  signup(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '640px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
