import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  emailview : boolean = true;
  otpview : boolean = false;
  passwordview : boolean = false;

  constructor(public dialog: MatDialog, private mainData: MainService, private fAuth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit() {
    this.setResetForm();
  }

  resetForm: FormGroup;
  setResetForm(): void {
    this.resetForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])]
    })
  }

  resetPassword(){
    if(this.resetForm.valid){
      this.fAuth.sendPasswordResetEmail(this.resetForm.value.email).then(data => {
        this.mainData.openToast("Reset Email Send!");
        this.dialog.closeAll();
      }).catch(err => {
        this.mainData.openToast(err.message);
      })
    }
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
