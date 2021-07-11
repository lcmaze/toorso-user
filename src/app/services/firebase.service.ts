import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MainService } from './main.service';

@Injectable()
export class FirebaseService {

    constructor(private fAuth: AngularFireAuth, private router: Router, private mainData: MainService) { }

    loginStatus: boolean;
    token: string;
    user: any;

    // registration function 
    async register(user: any){
        try{
            this.mainData.showLoading();
            let promise = new Promise(resolve => {
                this.fAuth.createUserWithEmailAndPassword(user.email, user.password).then(result => {
                    let firebase_user = result.user;
                    if(firebase_user){
                        // get id token 
                        firebase_user.getIdToken(true).then(token => {
                            this.token = token;
                            firebase_user.sendEmailVerification().then(verification => {
                                firebase_user.updateProfile({
                                    displayName: user.name
                                }).then(updatedProfile => {
                                    this.loginStatus = true;
                                    this.user = firebase_user;
                                    user['user_id'] = firebase_user.uid;
                                    this.mainData.post(user, 'api/user/user').subscribe(async data => {
                                        if(data['status']) resolve({message: "Registered!", status: true});
                                        else {
                                            resolve({message: data['message'], status: false});
                                            this.signOut();
                                        }
                                    })
                                }).catch(err => {
                                    resolve({message: err.message, status: false});
                                })
                            }).catch(err => {
                                resolve({message: err.message, status: false});
                            })
                        }).catch(err => {
                            resolve({message: err.message, status: false});
                        })
                    }
                    else{
                        resolve({message: 'Some error occurred!', status: false});
                    }
                }).catch(err => {
                    resolve({message: err.message, status: false});
                })
            });
            let val = await promise;
            this.mainData.hideLoading();
            return val;
        }
        catch(err) {
            this.mainData.hideLoading();
            return err.message;
        }
    }

    // login function 
    async login(user: any){
        this.mainData.showLoading();
        let promise = new Promise(resolve => {
            this.fAuth.signInWithEmailAndPassword(user.email, user.password).then(result => {
                let firebase_user = result.user;
                if(firebase_user){
                    // get id token 
                    // console.log("getting refresh token now!!")
                    firebase_user.getIdToken(true).then(token => {
                        this.token = token;
                        this.user = firebase_user;
                        this.loginStatus = true;
                        resolve({message: "Authenticated!", status: true});
                    }).catch(err => {
                        resolve({message: err.message, status: false});
                    })
                }
                else{
                    resolve({message: 'Some error occurred!', status: false});
                }
            }).catch(err => {
                resolve({message: err.message, status: false});
            })
        });
        let val = await promise;
        this.mainData.hideLoading();
        this.getToorsoUser();
        return val;
    }

    // sign out function
    signOut(){
        this.fAuth.signOut();
        this.mainData.openToast("Logged Out!");
        this.mainData.userDetails = null;
        this.mainData.userDetailsObservable.next(null);
        this.token = null;
        this.loginStatus = false;
        this.user = null;
    }

    // login checking function 
    async loginCheck(){
        await new Promise(resolve => {
            this.fAuth.authState.subscribe((data) => {
                if(data){
                    this.user = data;
                    this.loginStatus = true;
                    // get id token 
                    console.log({uid: data.uid, message: "Logged in!", status: true});
                    this.getToorsoUser();
                    data.getIdToken(true).then(async token => {
                        this.token = token;
                        resolve({message: "Authenticated!", status: true});
                    }).catch(err => {
                        resolve({message: err.message, status: false});
                    })
                }
                else{
                    this.loginStatus = false;
                    this.user = null; 
                    this.toorsoUser = null;
                    console.log({message: "User Expired!", status: false});
                    resolve({message: "User Expired!", status: false});
                }
            })
        })
    }

    // send verification mail 
    sendVerification(){
        this.mainData.showLoading();
        this.fAuth.authState.subscribe((data) => {
            if(data){
                data.sendEmailVerification().then(res => {
                    this.mainData.showToast("Verification Email Send!");
                    this.mainData.hideLoading();
                }).catch(err => {
                    this.mainData.showToast(err['message']);
                    this.mainData.hideLoading();
                })
            }
        })
    }

    // firebase auth guards section 
    checkLogin(){
        if(this.user){
            this.router.navigateByUrl('/profile');
        }
        else{
            this.router.navigateByUrl('/auth');
        }
    }

    // get seraph user details 
    toorsoUser: any;
    getToorsoUser(){
        if(this.user){
            this.mainData.get(`api/user/user?id=${this.user.uid}`).subscribe(data => {
                this.toorsoUser = data;
                this.mainData.userDetails = this.toorsoUser;
                this.mainData.userDetailsObservable.next(this.toorsoUser);
                console.log(this.toorsoUser);
            })
        }
    }
    

}