import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    
    
    public user:any;
    
    constructor(public authService: AuthenticationService, public platform: Platform, private statusBar: StatusBar, private router: Router) { 
        this.user = {email:"", password:"", error:"", loading:false};
    }

    ngOnInit() {
    }
	
	
	ionViewWillEnter(){
	
			if (this.authService.isAuthenticated()) { 
				this.router.navigate(['']);
			}
	}

    ionViewDidEnter(){
        document.documentElement.style.setProperty('--ion-color-primary', '#f36500');
        document.documentElement.style.setProperty('--ion-color-primary-shade', '#f36500');
        document.documentElement.style.setProperty('--ion-color-primary-tint', '#f36500');   
            
            
        if (this.platform.is('android')){
            this.statusBar.backgroundColorByHexString("#cb3d00");
        }
    }
  
    public login(){
        this.user.loading = true;
        this.user.error = "";
        this.user.email = this.user.email.trim();
        this.authService.login(this.user).then((token) => {
            this.user.loading = false;
             this.user.email = "";
             this.user.password = "";
            this.authService.retreiveUserData().then(() => {});
        }).catch((e) => {
            this.user.loading = false;
            if (e && (e.status === 401 || e.status === 403)){
                this.user.error = "Incorrect email or password";
            }
            else if (e && e.status === 422){
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
    
    public signup(){
        //this.navCtrl.push(SignupPage);
    }
    
  
    

}
