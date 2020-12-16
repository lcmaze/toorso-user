import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ForgotComponent } from '../forgot/forgot.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  
  close(): void {
    this.dialog.closeAll();
  }

  forgot(): void {
    this.close();
    const dialogRef = this.dialog.open(ForgotComponent, {
      width: '420px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  signup(): void {
    this.close();
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '640px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
