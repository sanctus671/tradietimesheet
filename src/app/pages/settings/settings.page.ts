import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { LoadingController,AlertController,ModalController,NavController, Platform } from '@ionic/angular';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {SubmissionService} from '../../services/submission/submission.service';
import * as moment from 'moment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    public user:any;
    public loading:any;
    
    constructor(public plt: Platform, private authenticationService: AuthenticationService, private alertCtrl: AlertController, private iab: InAppBrowser, 
        private submissionService:SubmissionService, private loadingController: LoadingController) {
        
        this.user = {};
        this.authenticationService.getUserData().subscribe((value) => {
            this.user = value;
            
        });
        
   
        
    }
    
    ngOnInit() {
    }  
    
    ionViewDidEnter(){
    }
    
    public openChangeName(){
        let alert = this.alertCtrl.create({
            header: 'Change Name',
            inputs: [           
                {
                    name: 'name',
                    placeholder: 'Name',
                    type: 'text',
                    value:this.user.name
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Change',
                    handler: data => {
                        
                        if (data.name){

                            
                            this.authenticationService.changeName(data.name).then(() => {
                                
                                this.authenticationService.retreiveUserData().then(() => {});
                                
                                let alert = this.alertCtrl.create({
                                    header: 'Success',
                                    message: 'Your name has been updated',
                                    buttons: [
                                        {
                                            text: 'Dismiss',
                                            role: 'cancel',
                                            handler: data => {
                                            }
                                        }                              
                                    ]           
                                }).then((el) => {
                                    el.present();
                                });                                 
                            }).catch(() => {
                                let alert = this.alertCtrl.create({
                                    header: 'Error',
                                    message: 'There was an error while changing your name.',
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: data => {
                                            }
                                        },
                                         {
                                            text: 'Try Again',
                                            handler: data => {
                                                setTimeout(() => {this.openChangeName()},200);
                                            }
                                        }                               
                                    ]            
                                }).then((el) => {
                                    el.present();
                                });                                
                            });
                        }
                        
                }
            }
                
            ]
        }).then((el) => {
            el.present();
        });          
    }       
    
    
    
   
    public openChangeEmail(){
        let alert = this.alertCtrl.create({
            header: 'Change Email',
            inputs: [           
                {
                    name: 'email',
                    placeholder: 'Email',
                    type: 'text',
                    value:this.user.email
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Change',
                    handler: data => {
                        
                        if (data.email){

                            
                            this.authenticationService.changeEmail(data.email).then(() => {
                                this.authenticationService.retreiveUserData().then(() => {});
                                let alert = this.alertCtrl.create({
                                    header: 'Success',
                                    message: 'Your email has been updated',
                                    buttons: [
                                        {
                                            text: 'Dismiss',
                                            role: 'cancel',
                                            handler: data => {
                                            }
                                        }                              
                                    ]           
                                }).then((el) => {
                                    el.present();
                                });                                 
                            }).catch(() => {
                                let alert = this.alertCtrl.create({
                                    header: 'Error',
                                    message: 'There was an error while changing your email.',
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: data => {
                                            }
                                        },
                                         {
                                            text: 'Try Again',
                                            handler: data => {
                                                setTimeout(() => {this.openChangeEmail()},200);
                                            }
                                        }                               
                                    ]            
                                }).then((el) => {
                                    el.present();
                                });                                
                            });
                        }
                        
                }
            }
                
            ]
        }).then((el) => {
            el.present();
        });          
    }    
    
    public deleteAccount(){
        let alert = this.alertCtrl.create({
            header: 'WARNING: You are about to delete your account',
            message: 'All your data associated with this account will be erased. This cannot be undone.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Delete',
                    handler: data => {
                        
                        

                            
                            this.authenticationService.deleteUser().then(() => {
                                let alert = this.alertCtrl.create({
                                    header: 'Account deleted',
                                    message: 'Your account has been removed',
                                    buttons: [
                                        {
                                            text: 'Dismiss',
                                            role: 'cancel',
                                            handler: data => {
                                            }
                                        }                              
                                    ]           
                                }).then((el) => {
                                    el.present();
                                });   
                                
                                this.logout();                              
                            }).catch(() => {
                                let alert = this.alertCtrl.create({
                                    header: 'Error',
                                    message: 'There was an error while deleting your account.',
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: data => {
                                            }
                                        },
                                         {
                                            text: 'Try Again',
                                            handler: data => {
                                                setTimeout(() => {this.deleteAccount()},200);
                                            }
                                        }                               
                                    ]            
                                }).then((el) => {
                                    el.present();
                                });                                
                            });
                        }
                        
                
            }
                
            ]
        }).then((el) => {
            el.present();
        });          
    }       

    
    public openChangePassword(){
        let alert = this.alertCtrl.create({
            header: 'Change Password',
            inputs: [           
                {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password'
                },
                {
                    name: 'confirmPassword',
                    placeholder: 'Confirm Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Change',
                    handler: data => {
                        
                        if (data.password && data.confirmPassword && data.password === data.confirmPassword){

                            
                            this.authenticationService.changePassword(this.user.email, data.password, data.confirmPassword).then(() => {
                                let alert = this.alertCtrl.create({
                                    header: 'Success',
                                    message: 'Your password has been updated',
                                    buttons: [
                                        {
                                            text: 'Dismiss',
                                            role: 'cancel',
                                            handler: data => {
                                            }
                                        }                              
                                    ]           
                                }).then((el) => {
                                    el.present();
                                });                                 
                            }).catch(() => {
                                let alert = this.alertCtrl.create({
                                    header: 'Error',
                                    message: 'There was an error while changing your password.',
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: data => {
                                            }
                                        },
                                         {
                                            text: 'Try Again',
                                            handler: data => {
                                                setTimeout(() => {this.openChangePassword()},200);
                                            }
                                        }                               
                                    ]            
                                }).then((el) => {
                                    el.present();
                                });                                
                            });
                        }
                        
                        else{
                            let alert = this.alertCtrl.create({
                                header: 'Error',
                                message: 'Passwords do not match',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: data => {
                                        }
                                    },
                                     {
                                        text: 'Try Again',
                                        handler: data => {
                                            setTimeout(() => {this.openChangePassword()},200);
                                        }
                                    }                               
                                ]            
                            }).then((el) => {
                                    el.present();
                                });                              
                        }
    
                    }
                }
                
            ]
        }).then((el) => {
            el.present();
        });          
    }
   
    public formatDate(date){

        return moment(date).format("DD/MM/YYYY");
    }     
    
    public logout(){
        this.authenticationService.logout();
      
    }      
}