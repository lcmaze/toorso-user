import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MainService } from 'src/app/services/main.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  constructor(private mainData: MainService, private firebase: FirebaseService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { }

  regForm: FormGroup;
  submitBtnName: string = 'Register';
  selectedState: any;
  passwordMatch: boolean = true;

  ngOnInit() {
    if(this.data){
      this.selectedState = this.data;
      this.getStates(this.data.country_info.country_id);
      this.getCities(this.data.state_id);
    }
    this.setregForm();
  }

  ngAfterViewInit(){
    
  }

  // states 
  states: any;
  getStates(id: any){
    this.mainData.getCache(`api/get-states?id=${id}`).subscribe(data => {
      this.states = data.rows;
    })
  }

  // cities 
  cities: any;
  getCities(id: any){
    this.mainData.getCache(`api/get-cities?id=${id}`).subscribe(data => {
      this.cities = data.rows;
    })
  }

  setregForm(): void {
    this.regForm = this.fb.group({
      'user_name': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(55)])],
      'user_phone': [null, Validators.compose([Validators.required, Validators.pattern('[- +()0-9]+')])],
      'user_area': [null, Validators.compose([Validators.required])],
      'user_state': [null, Validators.compose([Validators.required])],
      'user_city': [null, Validators.compose([Validators.required])],
      'user_email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.minLength(5), Validators.maxLength(50), Validators.required])],
      'confirm_password': [null, Validators.compose([Validators.minLength(5), Validators.maxLength(50), Validators.required])]
    })
  }

  async register(){
    this.passwordMatch = true;
    if(this.regForm.value && this.regForm.valid){
      this.submitBtnName = 'Please wait...';
      console.log(this.regForm.value);
      if(this.regForm.value['password'] != this.regForm.value['confirm_password']) {
        this.passwordMatch = false;
        this.mainData.showToast("Password not matching!");
        return;
      }
      this.regForm.value['email'] = this.regForm.value['user_email'];
      let result = await this.firebase.register(this.regForm.value);
      if(result && result['status'] === true){
        this.regForm.reset();
        this.dialog.closeAll();
      }else{
        this.mainData.showToast(result['message']);
        this.submitBtnName = 'Register';
      }
    }
    else{
      this.regForm.markAllAsTouched();
    }
  }

}
