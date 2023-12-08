import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingController,AlertController, Platform } from '@ionic/angular';

import * as moment from 'moment';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {SubmissionService} from '../../services/submission/submission.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.page.html',
  styleUrls: ['./timesheet.page.scss'],
})
export class TimesheetPage implements OnInit {
    
    
    public appSettings:any;
    public currentWeek:any;
    public selectedDate:Date;
    public weekdays:Array<any>;
    public weekdaySubmissions:any;
    public weekdaySubmittedSubmissions:any;
    public submittedSubmissions:Array<any>;
    public pendingSubmissions:number;
    public submissions:Array<any>;
    public user:any;
    public loader:any;
    public totalWorkTime:number;
    public maxSelectableDate:string;
    public breakTime:number;
    
    constructor(private authenticationService:AuthenticationService, private submissionService:SubmissionService, private ngZone: NgZone, 
        private loadingController: LoadingController, private alertCtrl : AlertController, private platform: Platform, private statusBar: StatusBar) { 
    
        this.appSettings = {name:"", color_scheme: '', logo: '', field_labels:"", week_start:"", break_toggle:false};
        
        this.maxSelectableDate = moment().format("YYYY-MM-DD");
        
        this.weekdaySubmissions = {};
        this.weekdaySubmittedSubmissions = {};
        this.submittedSubmissions = [];
        this.submissions = [];
        
        this.pendingSubmissions = 0;
        
        this.user = {};
        
        this.breakTime = 30;
        
        this.setStartOfWeek();
        
        this.setWeekdays();
        this.getSubmissions();
        this.getSubmittedSubmissions();
        
        this.authenticationService.getUserData().subscribe((data) => {
            

            
            
            if (data){
                this.user = data;
                
                if (this.user.groups.length > 0){
                    
                    this.ngZone.run(() => {

                        let previousWeekStart = this.appSettings.week_start;
                    
                        this.appSettings = this.user.groups[0];
              

                        if (this.appSettings.color_scheme){
                            this.setColorScheme();

                        }
                        
                        if (this.appSettings.break_time){
                            this.breakTime = parseFloat(this.appSettings.break_time);
                        }

                        if (this.appSettings.week_start && this.appSettings.week_start !== previousWeekStart){
                            this.setStartOfWeek();
                            this.setWeekdays();
                        }
                    
                    });
                    
                }
                
            }
            
        
                       
            this.getSubmissions();
            this.getSubmittedSubmissions();            
            
            
            
            
        })        
    }

    ngOnInit() {
    }
    
    ionViewDidEnter(){
        if (this.appSettings.color_scheme){
            this.setColorScheme();
        }    
    }

    
    
    public calculateWorkTime(){
        
        
        let totalWorkTime = 0;
        
        for (let weekday of this.weekdays){
                
        
            let weekdayDate = this.formatDatabase(weekday);
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
        
        this.totalWorkTime = totalWorkTime;      
        
        

        
        
    }
    

    public setStartOfWeek(){
     


        let startDay = this.appSettings.week_start ? this.appSettings.week_start : "Monday";
   

        let currentWeekStart = moment().startOf("week").day(startDay);
        let currentDay = moment();
        if (currentWeekStart.isAfter(currentDay)){
            currentWeekStart.subtract(1, "weeks");
        }

    

        this.currentWeek = moment(currentWeekStart);
        

        /*
        let previousDay = currentWeekStart.subtract(1, "days").format("dddd");

        if (this.currentWeek.format("dddd") === previousDay){
			if (moment().format("dddd") === previousDay){
                //TODO: respond to start of date being not Monday. Ie if its tuesday subtract only 5 days etc..
                if (this.appSettings.week_start === "Tuesday"){
                    this.currentWeek.subtract(5, "days");
                }
                else if (this.appSettings.week_start === "Wednesday"){
                    this.currentWeek.subtract(4, "days");
                }
                else if (this.appSettings.week_start === "Thursday"){
                    this.currentWeek.subtract(3, "days");
                }
                else if (this.appSettings.week_start === "Friday"){
                    this.currentWeek.subtract(2, "days");
                }
                else if (this.appSettings.week_start === "Saturday"){
                    this.currentWeek.subtract(1, "days");
                }
                else if (this.appSettings.week_start === "Sunday"){
                    //this.currentWeek.subtract(6, "days");
                }
                else{
                    //Monday default
                    this.currentWeek.subtract(6, "days");
                }
				
			}
			else{
                //TODO: respond to start of date being not Monday. Ie if its tuesday add 2 days etc..

                if (this.appSettings.week_start === "Tuesday"){
                    this.currentWeek.add(2, "days");
                }
                else if (this.appSettings.week_start === "Wednesday"){
                    this.currentWeek.add(3, "days");
                }
                else if (this.appSettings.week_start === "Thursday"){
                    this.currentWeek.add(4, "days");
                }
                else if (this.appSettings.week_start === "Friday"){
                    this.currentWeek.add(5, "days");
                }
                else if (this.appSettings.week_start === "Saturday"){
                    this.currentWeek.add(6, "days");
                }
                else if (this.appSettings.week_start === "Sunday"){
                    this.currentWeek.add(7, "days");
                }
                else{
                    //Monday default
                    this.currentWeek.add(1, "days");
                }


				
			}
            
        }

        */

    
        this.selectedDate = this.currentWeek.toISOString();
    }
    
    
    
    
    
    private setColorScheme(){
        setTimeout(() => {
            document.documentElement.style.setProperty('--ion-color-primary', this.appSettings.color_scheme);
            document.documentElement.style.setProperty('--ion-color-primary-shade', this.appSettings.color_scheme);
            document.documentElement.style.setProperty('--ion-color-primary-tint', this.appSettings.color_scheme);   
            
            
            if (this.platform.is('android')){
                let statusBarColor = this.LightenDarkenColor(this.appSettings.color_scheme, -40);
                if (statusBarColor.length < 7){
                    this.statusBar.backgroundColorByHexString("#000000");
                }
                else{
                    this.statusBar.backgroundColorByHexString(statusBarColor);
                }
            }
            
            
        });         
    }
    
    public getSubmissions(){
        this.submissionService.getLocalSubmissions().then((data:Array<any>) => {
      
            this.submissions = data;
            
            this.setWeekdaySubmissions();
            
        })
    }
    
    
    public getSubmittedSubmissions(){
        this.submissionService.getSubmissions().then((data:Array<any>) => {
     
            this.submittedSubmissions = data;
            
            this.setWeekdaySubmittedSubmissions();
            
        });
    }    
    
    
    
    public setWeekdays(){
        
        this.weekdays = [];
        
        this.weekdays.push(moment(this.currentWeek));
        this.weekdays.push(moment(this.currentWeek).add(1, "days"));
        this.weekdays.push(moment(this.currentWeek).add(2, "days"));
        this.weekdays.push(moment(this.currentWeek).add(3, "days"));
        this.weekdays.push(moment(this.currentWeek).add(4, "days"));
        this.weekdays.push(moment(this.currentWeek).add(5, "days"));
        this.weekdays.push(moment(this.currentWeek).add(6, "days"));
        
       
        
        
    }
    
    public setWeekdaySubmittedSubmissions(){
        
        this.ngZone.run(() => {
        
            this.weekdaySubmittedSubmissions = {};

            for (let submission of this.submittedSubmissions){
                for (let weekday of this.weekdays){
                    let weekdayDate = this.formatDatabase(weekday);
                    
                    if (submission.submission_date === weekdayDate){
                        
                        
                        this.weekdaySubmittedSubmissions[weekdayDate] = submission;

                    }
                }
            }

        });
            
            this.calculateWorkTime();
        
    }
    
    
    public setWeekdaySubmissions(){
        
        this.weekdaySubmissions = {};
        this.pendingSubmissions = 0;
        
        this.ngZone.run(() => {
        
            for (let submission of this.submissions){
                for (let weekday of this.weekdays){
                    let weekdayDate = this.formatDatabase(weekday);
                    if (submission.submission_date === weekdayDate){
                        this.weekdaySubmissions[weekdayDate] = submission;
                        this.pendingSubmissions += 1;


                    }
                }
            }
        
        });
            
            this.calculateWorkTime();
        
    }  
    
    
    
    public resetWeek(){
        
        let alert = this.alertCtrl.create({
            header: 'Confirm',
            message: 'You are about to reset all unsubmitted timesheets for week ' + this.formatDate(this.currentWeek) + ". Do you want to continue?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                 {
                    text: 'Reset',
                    handler: data => {
                        
                        
                        
                        let updatedSubmissions = [];
                        for (var index in this.submissions){
                            let submission = this.submissions[index];
                            
                            let addSubmission = true;
                            
                            for (let weekday of this.weekdays){
                                let weekdayDate = this.formatDatabase(weekday);
                                if (submission.submission_date === weekdayDate){
                                    addSubmission = false;


                                }
                            }
                            
                            
                            if (addSubmission){
                                updatedSubmissions.push(submission);
                            }
                            
                        }
                        
                        this.ngZone.run(() => {
                            this.weekdaySubmissions = {};
                            this.submissions = updatedSubmissions;
                        });
                        
                        
                        this.submissionService.updateLocalSubmissions(updatedSubmissions).then(() => {

            
                            setTimeout(() => {
                                this.loader.dismiss();

                                let alert = this.alertCtrl.create({
                                     header: 'Success',
                                     message: 'Your timesheets have been reset',
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
                            },1000);   
                            
                            
                            this.getSubmissions();
                                                       
                        });   
        
                    }
                }                               
            ]            
        }).then((el) => {
                el.present();
            });      

        
        
        
    }    
    
    
    
    public submitWeek(){
        
        let alert = this.alertCtrl.create({
            header: 'Confirm',
            message: 'You are about to submit all timesheets for week ' + this.formatDate(this.currentWeek) + ". Do you want to continue?",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                 {
                    text: 'Submit All',
                    handler: data => {
                        this.loadingController.create({
                          message: 'Submitting timesheets. Please wait...'
                        }).then((el) => {

                            this.loader = el;
                            el.present();   

                            let submissionsToSubmit = [];

                            for (var index in  this.submissions){
                                let submission = this.submissions[index]
                                   for (let weekday of this.weekdays){
                                       let weekdayDate = this.formatDatabase(weekday);
                                       if (submission.submission_date === weekdayDate){
                                           submission.submission_index = index;
                                           submissionsToSubmit.push(submission);


                                       }
                                   }

                            }

                            this.submitSubmission((submissionsToSubmit.length - 1), submissionsToSubmit, submissionsToSubmit.length);

                        }); 
        
                    }
                }                               
            ]            
        }).then((el) => {
                el.present();
            });      

        
        
        
    }
    
    
    private submitSubmission(index, submissions, submissionsTotal){
        
        
        if (index < 0){
            this.getSubmissions();
            this.getSubmittedSubmissions();
            
            setTimeout(() => {
                this.loader.dismiss();

                let alert = this.alertCtrl.create({
                     header: 'Success',
                     message: 'Your timesheets have been submitted',
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
            },1000);             
            
  
            this.submissionService.sendWeeklyTimesheet(this.formatDatabase(this.currentWeek)).then(() => {

            });
            
            
            return;
        }
      
        this.loader.message = "Submitting " + (submissionsTotal - index) + "/" + submissionsTotal + " timesheets. Please wait...";

        this.submissionService.createSubmission(this.submissions[index]).then((data) => {
            

            
            submissions.splice(index,1);

                
            this.submissionService.updateLocalSubmissions(submissions).then(() => {
                this.submitSubmission(index - 1, submissions, submissionsTotal);
            }).catch(() => {
                this.submitSubmission(index - 1, submissions, submissionsTotal);
            });
            
        }).catch(() => {
            this.submitSubmission(index - 1, submissions, submissionsTotal);
        });       
    }
    
    public dateChanged(ev){
        

   

        /*
        this.currentWeek = moment(this.selectedDate).startOf("week");
        if (this.currentWeek.format("dddd") === "Sunday"){
			if (moment(this.selectedDate).format("dddd") === "Sunday"){
				this.currentWeek.subtract(6, "days");
			}
			else{
				this.currentWeek.add(1, "days");
			}
            
            
        } 
        */

        let startDay = this.appSettings.week_start ? this.appSettings.week_start : "Monday";
        //TODO get day before startDay replace Sunday below

        let currentWeekStart = moment(this.selectedDate).startOf("week").day(startDay);
        let currentDay = moment(this.selectedDate);
        if (currentWeekStart.isAfter(currentDay)){
            currentWeekStart.subtract(1, "weeks");
        }


        this.currentWeek = moment(currentWeekStart);

/*
        if (this.currentWeek.format("dddd") === "Sunday"){
			if (moment(this.selectedDate).format("dddd") === "Sunday"){
				this.currentWeek.subtract(6, "days");
			}
			else{
				this.currentWeek.add(1, "days");
			}
            
            
        } 
*/

        
        this.selectedDate = this.currentWeek.toISOString();
        
        this.setWeekdays();          
        this.setWeekdaySubmittedSubmissions();
        this.setWeekdaySubmissions();
        
        
        
              
        
    }
    
      
    
    
    public previousWeek(){
    
        this.currentWeek.subtract(1, "week");
        this.selectedDate = this.currentWeek.toISOString();
        this.setWeekdays();          
        this.setWeekdaySubmittedSubmissions();
        this.setWeekdaySubmissions();
        
    }
    
    public nextWeek(){
        this.currentWeek.add(1, "week");
        this.selectedDate = this.currentWeek.toISOString();
        
        this.setWeekdays();
        this.setWeekdaySubmittedSubmissions();
        this.setWeekdaySubmissions();
    }
    
    public displayForward(date){
        let dateCheck = moment().subtract(1, "week");
        if (this.currentWeek.isAfter(dateCheck)){
            return false;
        }
        
        return true;
    }
    
    public isCurrentDate(date){
        if (moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")){
            return true;
        }
        
        return false;
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
    
    
    public formatMinutes(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        
        let hoursText = rhours === 1 ? "hour" : "hours";
        let minuteText = rminutes === 1 ? "minute" : "minutes";
        
        if (rhours  < 1 && rminutes < 1){
            return "0 " +  hoursText;
        }
        
        return (rhours > 0 ? (rhours + " " + hoursText + " ") : "") + (rminutes > 0 ? (rminutes + " " + minuteText) : "");
    }    
    
    
    public formatFromNowServer(date){

        let localeOffset = -(new Date().getTimezoneOffset());
        return moment(date).add(localeOffset, 'm').fromNow();
    }
    
    private LightenDarkenColor(col, amt) {

        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col,16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if  (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if  (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

    }    

    
    
}
