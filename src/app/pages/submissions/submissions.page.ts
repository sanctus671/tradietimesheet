import { Component, NgZone } from '@angular/core';
import {SubmissionService} from '../../services/submission/submission.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import { ToastController, ModalController,AlertController, Platform } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import * as moment from 'moment';


@Component({
    selector: 'app-submissions',
    templateUrl: './submissions.page.html',
    styleUrls: ['./submissions.page.scss'],
})
export class SubmissionsPage  {
    
    
    public loading:boolean;
    
    public user:any;
    
    public submissions:Array<any>;
    
    
    public submittedSubmissions:Array<any>;
    
    
    public weeks:Array<any>;
    public submissionsByWeek:any;
    public workTimeByWeek:any;
    public appSettings:any;
    
    public breakTime:number;
    
    constructor(private submissionService:SubmissionService, public toastController: ToastController, public modalController: ModalController,
        private router: Router, private authenticationService:AuthenticationService, private alertCtrl: AlertController, private ngZone: NgZone,
        private platform:Platform) { 

        this.appSettings = {name:"", color_scheme: '', logo: '', field_labels:"", week_start:"", break_toggle:false};
        
        this.loading = true;
        
        this.submissions = [];  
        this.submittedSubmissions = [];    
        this.weeks = [];
        this.submissionsByWeek = {};   
        this.workTimeByWeek = {}; 
        
        this.breakTime = 30;          

        this.user = {};
        this.authenticationService.getUserData().subscribe((data) => {

            this.ngZone.run(() => {
                this.user = data;
            });
                
            if (this.user.groups.length > 0){
                let appSettings = this.user.groups[0];

                this.appSettings = this.user.groups[0];
                
                this.ngZone.run(() => {

                    if (appSettings.break_time){
                        this.breakTime = parseFloat(appSettings.break_time);
                    }

                });

            }
            
   
            this.weeks = [];
            this.submissionsByWeek = {};   

            this.getSubmissions();
            this.getSubmittedSubmissions();            
            
        });   
   
        
 
                  
        
        
    }

    ngOnInit() {
       
    }

    ionViewDidEnter(){
        
   
        this.weeks = [];
        this.submissionsByWeek = {};   
        
        this.getSubmissions();
        this.getSubmittedSubmissions();
    }
    
    public getSubmissions(){

        

        this.submissionService.getLocalSubmissions().then((data:Array<any>) => {
        
            this.submissions = data;

            let startDay = this.appSettings.week_start ? this.appSettings.week_start : "Monday";
            
            for (let submission of this.submissions){
                
                let submissionDate = moment(submission.submission_date).startOf("week").day(startDay);
                let currentDay = moment(submission.submission_date);

                if (submissionDate.isAfter(currentDay)){
                    submissionDate.subtract(1, "weeks");

                }


                let submissionWeek = moment(submissionDate);




                
                let submissionWeekFormatted = submissionWeek.format("YYYY-MM-DD");
                
                if (this.weeks.indexOf(submissionWeekFormatted) < 0){
                    this.weeks.push(submissionWeekFormatted);
                    this.submissionsByWeek[submissionWeekFormatted] = [];
                }
                
                
                let dateFound = false;
                for (let submissionByWeek of this.submissionsByWeek[submissionWeekFormatted]){
                    if (submissionByWeek.submission_date === submission.submission_date){
                        dateFound = true;
                    }  
                }
                
                
                if (!dateFound){
                    this.submissionsByWeek[submissionWeekFormatted].push(submission);
                }
                
                this.submissionsByWeek[submissionWeekFormatted].sort((a,b) => {
                    var c:any = new Date(a.submission_date);
                    var d:any = new Date(b.submission_date);

                    return c-d;
                });
				
                
                              
            }
			

			this.weeks.sort((a,b) => {
                    var c:any = new Date(a);
                    var d:any = new Date(b);

                    return d-c;
                });		
			
			
            
            setTimeout(() => {
                
                this.loading = false;
            },5000)
            
        })
    }
    
    
    public getSubmittedSubmissions(){

        

        this.submissionService.getSubmissions().then((data:Array<any>) => {
          
            this.submittedSubmissions = data;

            let startDay = this.appSettings.week_start ? this.appSettings.week_start : "Monday";
            
            this.workTimeByWeek = {};
            
            for (let submission of this.submittedSubmissions){
                
                /*
                let submissionDate = moment(submission.submission_date);
                if (submissionDate.format("dddd") === "Sunday"){
                    submissionDate.subtract(1, "days");
                }                  
                let submissionWeek = submissionDate.startOf("week");
                if (submissionWeek.format("dddd") === "Sunday"){
                    submissionWeek.add(1, "days");
                }  
                */

                let submissionDate = moment(submission.submission_date).startOf("week").day(startDay);
                let currentDay = moment(submission.submission_date);

                if (submissionDate.isAfter(currentDay)){
                    submissionDate.subtract(1, "weeks");

                }


                let submissionWeek = moment(submissionDate);


                
                let submissionWeekFormatted = submissionWeek.format("YYYY-MM-DD");
                
                if (this.weeks.indexOf(submissionWeekFormatted) < 0){
                    this.weeks.push(submissionWeekFormatted);
                    this.submissionsByWeek[submissionWeekFormatted] = [];
                }
                
                
                let dateFound = false;
                for (let submissionByWeek of this.submissionsByWeek[submissionWeekFormatted]){
                    if (submissionByWeek.submission_date === submission.submission_date){
                        dateFound = true;
                    }  
                }
                
                
                if (!dateFound){
                    this.submissionsByWeek[submissionWeekFormatted].push(submission);
                }
                
                this.submissionsByWeek[submissionWeekFormatted].sort((a,b) => {
                    var c:any = new Date(a.submission_date);
                    var d:any = new Date(b.submission_date);

                    return c-d;
                });
                
                
                              
            }            
            
            
			this.weeks.sort((a,b) => {
                    var c:any = new Date(a);
                    var d:any = new Date(b);

                    return d-c;
                });	

				
            this.loading = false;
            
        });
    } 
    
    
    public calculateWorkTime(week){
        
        
        let totalWorkTime = 0;
        
        for (var i = 0; i < 8; i++){
                
        
            let weekdayDate = moment(week).add(i, "days").format("YYYY-MM-DD");
            
          
            
            
            
            let dailyWorkTime = 0;

            let dailyNoBreakCount = 0;
            let dailySubmissionCount = 0;
            
            for (let submission of this.submissions){
                
                
                        

                if (submission.submission_date === weekdayDate){
                    let startDate = submission.submission_date + ' ' + submission.start_time;
                    let endDate = submission.submission_date + ' ' + submission.end_time
                    let workTime = moment.duration(moment(endDate).diff(moment(startDate))).asMinutes();

                    dailyWorkTime += workTime;

                    if (submission.no_break){dailyNoBreakCount += 1}
                    dailySubmissionCount += 1;

                }
            }
            
        
            for (let submission of this.submittedSubmissions){
                

                if (submission.submission_date === weekdayDate){

                    let startDate = submission.submission_date + ' ' + submission.start_time;
                    let endDate = submission.submission_date + ' ' + submission.end_time
                    let workTime = moment.duration(moment(endDate).diff(moment(startDate))).asMinutes();       

                    dailyWorkTime += workTime;

                    if (submission.no_break){dailyNoBreakCount += 1}
                    dailySubmissionCount += 1;

                }
                
            }            
            

            if (dailyWorkTime > 0){
                //subtract breaks
                dailyWorkTime = dailyWorkTime - this.breakTime;

                if (dailyNoBreakCount > 0 && dailySubmissionCount === dailyNoBreakCount){
                        dailyWorkTime = dailyWorkTime + this.breakTime; 
                }
            
                if (dailyWorkTime < 0){dailyWorkTime = 0;}
            }
            
            totalWorkTime += dailyWorkTime;
            
        }  
        
        return this.formatMinutes(totalWorkTime);      
        
        

        
        
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
    
   
    
    
    public formatMinutes(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        
        let hoursText = rhours === 1 ? "hour" : "hours";
        let minuteText = rminutes === 1 ? "minute" : "minutes";
        
        return (rhours > 0 ? (rhours + " " + hoursText + " ") : "") + (rminutes > 0 ? (rminutes + " " + minuteText) : "");
    }   
    
}
