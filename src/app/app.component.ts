import {fetch as fetchPolyfill} from 'whatwg-fetch';
window.fetch = fetchPolyfill;

import { Component, NgZone} from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import {SubmissionService} from './services/submission/submission.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { Storage } from '@ionic/storage';
import * as moment from 'moment';

declare const cordova: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    
    public user:any;
    
    constructor(public platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, 
        private authenticationService: AuthenticationService, private router: Router, public storage: Storage, 
        private ngZone:NgZone, private submissionService:SubmissionService,
        private oneSignal: OneSignal, private navCtrl: NavController){

        this.initializeApp();
        
        this.authenticationService.getUserData().subscribe(value => {  
            
            this.user = {};
            
            this.ngZone.run(() => {  
                
                this.user = value;
                //this.savePushId();
            
            });
            
        });    
        
        this.platform.resume.subscribe(() => {      
            
        });   
        
        
        
    }


    savePushId(){
        
        
        this.oneSignal.getIds().then((data) => {
            if (data.userId){
                //save
                this.authenticationService.savePushId(data.userId).then(() => {});
            }
        }).catch((e) => {
            //console.log(e);
        });        
    }     
    

    initializeApp() {
        this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        if (this.platform.is("android")) {
            this.statusBar.backgroundColorByHexString("#cb3d00");
            this.statusBar.styleLightContent();
        }
        else{
            this.statusBar.styleLightContent();
        }

        
        
        
        
        if (this.platform.is('cordova')){


/*
            this.oneSignal.startInit("53084869-27f7-4c98-9515-84d0bb53b0b7", "141211880690");
            
            
			this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

			this.oneSignal.handleNotificationReceived().subscribe(() => {
			 // do something when notification is received
                            
                            
                            
			});

			this.oneSignal.handleNotificationOpened().subscribe(() => {
			  // do something when a notification is opened
			});

            this.oneSignal.endInit();      
            
            */        
            
            

        }
		

		
   
                
        
        this.authenticationService.retreiveUserData().then(() => {}).catch(() => {});        
   
   
        
        this.authenticationService.authState.subscribe((state:any) => {
            if (state && state.data && state.data.authenticated) { 

                this.navCtrl.navigateRoot('');

            } else if (state && state.data && !state.data.authenticated) {
                this.router.navigate(['login']);
            }
        }); 
            
                    

        setTimeout(() => {this.splashScreen.hide(); },500);
        
        
        //this.uploadSubmissions();
        
        })
    }
    
    
  
}
