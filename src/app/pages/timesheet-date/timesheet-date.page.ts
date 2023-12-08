import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SubmissionService} from '../../services/submission/submission.service';
import { NavController, AlertController } from "@ionic/angular";
import * as moment from 'moment';
import {AuthenticationService} from '../../services/authentication/authentication.service';


@Component({
  selector: 'app-timesheet-date',
  templateUrl: './timesheet-date.page.html',
  styleUrls: ['./timesheet-date.page.scss'],
})
export class TimesheetDatePage implements OnInit {
    
    
    public selectedDate:any;

    public loading:boolean;
    
    public user:any;
    
    public submissions:Array<any>;
    
    
    public submittedSubmissions:Array<any>;
    
    public totalWorkTime:number;
    
    public breakTime:number;
        
    constructor(private submissionService:SubmissionService, private authenticationService:AuthenticationService, 
        private navController: NavController, private route: ActivatedRoute, private alertCtrl: AlertController, private ngZone: NgZone) {
        
        
        
       this.loading = true;
       
       this.breakTime = 30;
        
        this.submissions = [];  
        this.submittedSubmissions = [];                

        this.user = {};
        this.authenticationService.getUserData().subscribe((data) => {

            this.ngZone.run(() => {
                this.user = data;
            });
                
            if (this.user.groups.length > 0){
                let appSettings = this.user.groups[0];
                
                this.ngZone.run(() => {

                    if (appSettings.break_time){
                        this.breakTime = parseFloat(appSettings.break_time);
                    }

                });

            }
            
  

            this.getSubmissions();
            this.getSubmittedSubmissions();            

        });  
        
        
                    
        } 

    ngOnInit() {
    }
    
    ionViewDidEnter(){
        const submissionDate: string = this.route.snapshot.queryParamMap.get('date');
  
        
        this.selectedDate = submissionDate;
        
 
        
        this.submissions = [];  
        this.submittedSubmissions = [];  
        
        this.getSubmissions();
        this.getSubmittedSubmissions();
        
    }
    
    
    public calculateWorkTime(){
        
        
        let totalWorkTime = 0;
                
        
            let weekdayDate = this.formatDatabase(this.selectedDate);
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
            
       
        
        this.totalWorkTime = totalWorkTime;      
        
        

        
        
    }    
    
    
    
    public getSubmissions(){
        
        
        if (!this.selectedDate){
            return;
        }
        this.submissionService.getLocalSubmissions().then((data:Array<any>) => {
        
            let submissions = data;



            let weekdayDate = this.formatDatabase(this.selectedDate);
            
            
            this.submissions = [];
            
            for (let submission of submissions){
                if (submission.submission_date === weekdayDate){
                    this.submissions.push(submission);


                }
            
            }
            
            
            this.calculateWorkTime();


            
        })
    }
    
    
    public getSubmittedSubmissions(){
        
        
        if (!this.selectedDate){
            return;
        }
         
        
        
        this.submissionService.getSubmissions().then((data:Array<any>) => {
          
            let submittedSubmissions = data;
            

            let weekdayDate = this.formatDatabase(this.selectedDate);
            
            
            this.submittedSubmissions = [];
            
            for (let submission of submittedSubmissions){
                if (submission.submission_date === weekdayDate){
                    this.submittedSubmissions.push(submission);


                }
            
            }  
            
            
            this.calculateWorkTime();
             
            this.loading = false;         
            
            
            
            
            
        });
    } 
    
    

    
    
    public formatDate(date){
        return moment(date).format("DD/MM/YYYY");
    }
    
    
    
    
    public formatDatabase(date){
        return moment(date).format("YYYY-MM-DD");
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
