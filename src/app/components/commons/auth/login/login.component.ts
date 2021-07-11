import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MainService } from 'src/app/services/main.service';
import { ForgotComponent } from '../forgot/forgot.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private mainData: MainService, private firebase: FirebaseService, private fb: FormBuilder) { }

  loginForm: FormGroup;
  submitBtnName: string = 'Login';
  
  ngOnInit() {
    this.setLoginForm();
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

  setLoginForm(): void {
    this.loginForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.minLength(5), Validators.maxLength(50), Validators.required])]
    })
  }

  async login(){
    if(this.loginForm.value && this.loginForm.valid){
      this.submitBtnName = 'Please wait...';
      let result = await this.firebase.login(this.loginForm.value);
      if(result && result['status'] === true){
        this.dialog.closeAll();
        this.loginForm.reset();
      }else{
        this.mainData.showToast(result['message']);
        this.submitBtnName = 'Login';
      }
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
