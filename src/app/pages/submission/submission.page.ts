import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubmissionService} from '../../services/submission/submission.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import { NavController, AlertController } from "@ionic/angular";
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as moment from 'moment';


@Component({
  selector: 'app-submission',
  templateUrl: './submission.page.html',
  styleUrls: ['./submission.page.scss'],
})
export class SubmissionPage implements OnInit {


    public loading:boolean;
    
    public user:any;
    
    public submission:any;
    public appSettings:any;
    public fieldLabels:any;


    constructor(private router: Router, private authenticationService:AuthenticationService, 
            private route:ActivatedRoute, private iab: InAppBrowser, private submissionService:SubmissionService, private navController: NavController, 
            private alertCtrl: AlertController) { 

        this.appSettings = {};
        
        this.fieldLabels = {site_name:"Site Name", total_rubbish: "Materials Used", comments: "Comments"};        
        
        this.loading = true;
        
        let submissionId = this.route.snapshot.params['id']; 
        this.submission = {id:submissionId};
        
        
        this.getSubmission();
        
        
        this.user = {};
        this.authenticationService.getUserData().subscribe((data) => {
            this.user = data;
            
            if (this.user.groups.length > 0){
                    
                        this.appSettings = this.user.groups[0];



                        if (this.appSettings.field_labels){
                            
                            this.fieldLabels = JSON.parse(this.appSettings.field_labels);
                        }              
                
                
                
            }
            
        })        
    
        
        
   
        }

    ngOnInit() {
    }
    
    
    
    public getSubmission(){
        this.submissionService.getSubmission(this.submission.id).then((data) => {
        
            this.submission = data;
            this.loading = false;
        })
    }
    
    public deleteSubmission(){
        let alert = this.alertCtrl.create({
            header: 'Are you sure?',
            message: 'You are about to delete this timesheet submission. This cannot be undone.',
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
                        
                        

                            
                        this.submissionService.deleteSubmission(this.submission.id).then(() => {
                                let alert = this.alertCtrl.create({
                                    header: 'Submission delete',
                                    message: 'This timesheet submission has been removed.',
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
                                this.loading = false;
                                this.authenticationService.retreiveUserData().then(() => {});
                                this.navController.back();                            
                            }).catch(() => {
                                let alert = this.alertCtrl.create({
                                    header: 'Error',
                                    message: 'There was an error while deleting your submission.',
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
                                                setTimeout(() => {this.deleteSubmission()},200);
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
       
    
    
    
    public formatDate(date){
        return moment(date).format("DD/MM/YYYY");
    }
    
    
    public formatDatabase(date){
        return moment(date).format("YYYY-MM-DD");
    }
    
    public formatLongDate(date){
        return moment(date).format("dddd Do MMM");
    }
    
    public formatFromNow(date){
        return moment(date).fromNow();
    }   
    
    public formatFromNowServer(date){

        let localeOffset = -(new Date().getTimezoneOffset());
        return moment(date).add(localeOffset, 'm').fromNow();
    }
    
}
