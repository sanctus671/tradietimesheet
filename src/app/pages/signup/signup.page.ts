import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingController,AlertController } from '@ionic/angular';
import {environment} from '../../../environments/environment';
import * as moment from 'moment';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    public user:any;
    constructor(public authService: AuthenticationService, private iab: InAppBrowser, public loadingController: LoadingController, public alertController: AlertController) {
        this.user = {email:"", password:"", error:"",loading:false};

        
    }

    ngOnInit() {
    }
    
  
    
    
    public signup(){
        this.user.loading = true;
        this.user.error = "";
        
        if (!this.user.email ){
            this.user.loading = false;
            this.user.error = "Required fields not filled in. ";            
        }      
        
        //alert("Registering... Press ok to continue");
        this.authService.register(this.user).then(() => {
            //alert("Registration successful");
                this.user.loading = false;
                //this.authService.getUserData();
                this.authService.retreiveUserData().then(() => {
                    //alert("Retreived user data");
                }).catch(() => {
                    //alert("Failed to retreive user data");
                });
        }).catch((e) => {
        //alert("Registration failed. Press ok to see error. Screenshot this screen and send to me please.");
            //alert(JSON.stringify(e));
            this.user.loading = false;
            if (e && e.error){
                for (var index in e.error.error.errors){
                    let error = e.error.error.errors[index];
                    this.user.error = this.user.error + error + " ";
                }                
            }
            else{
                this.user.error = e.message;
            }

            
        })
  
    } 



}
