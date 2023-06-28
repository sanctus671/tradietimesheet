import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import { ToastController,NavController } from '@ionic/angular';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
    public user:any;
    constructor(public authService: AuthenticationService, public toastController: ToastController) {
        this.user = {email:"", loading:false};
    }

    ngOnInit() {
    }
    
    
    public resetPassword(){
        this.user.loading = true;
        this.user.error = "";
        //alert("Registering... Press ok to continue");
        this.authService.resetPassword(this.user).then(() => {
            //alert("Registration successful");
                this.user.loading = false;
                this.user.email = "";
                this.toastController.create({
                    message: 'Link sent to reset your password!',
                    duration: 2000
                }).then((toast) => {
                    toast.present(); 
                });                
                
        }).catch((e) => {
        //alert("Registration failed. Press ok to see error. Screenshot this screen and send to me please.");
            //alert(JSON.stringify(e));
            this.user.loading = false;
            if (e && e.error){
                if (e.error.error.errors){               
                    for (var index in e.error.error.errors){
                        let error = e.error.error.errors[index];
                        this.user.error = this.user.error + error + " ";
                    }    
                }  
                else{
                    this.user.error = e.error.error.message;
                }          
            }
            else{
                this.user.error = e.message;
            }

            
        })
  
    } 
    
 

}
