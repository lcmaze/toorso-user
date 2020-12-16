import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  emailview : boolean = true;
  otpview : boolean = false;
  passwordview : boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  send(){
    this.emailview = false;
    this.otpview = true;
    this.passwordview = false;
  }

  submitotp(){
    this.emailview = false;
    this.otpview = false;
    this.passwordview = true;
  }

}
