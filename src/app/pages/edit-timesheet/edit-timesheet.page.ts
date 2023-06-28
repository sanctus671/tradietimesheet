import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SubmissionService} from '../../services/submission/submission.service';
import { NavController, AlertController } from "@ionic/angular";
import * as moment from 'moment';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.page.html',
  styleUrls: ['./edit-timesheet.page.scss'],
})
export class EditTimesheetPage implements OnInit {
    
    
    public timesheet:any;
    public submissions:Array<any>;
    public submittedSubmissions:Array<any>;
    public submissionIndex:any;
    public loading:boolean;
    public submissionLoading:boolean;
    public user:any;
    public appSettings:any;
    public fieldLabels:any;
    
    constructor(private submissionService:SubmissionService, private authenticationService:AuthenticationService, 
        private navController: NavController, private route: ActivatedRoute, private alertCtrl: AlertController) { 
        
        this.appSettings = {};
        
        this.fieldLabels = {site_name:"Site Name", total_rubbish: "Materials Used", comments: "Comments"};
    
        this.timesheet = {};
		
        this.submissions = [];
        this.submittedSubmissions = [];
        
        this.submissionLoading = true;
        
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
    
    ionViewDidEnter(){
        const submissionDate: string = this.route.snapshot.queryParamMap.get('date');
        const startTime: string = this.route.snapshot.queryParamMap.get('start_time');
        const endTime: string = this.route.snapshot.queryParamMap.get('end_time');
        
        this.timesheet.submission_date = submissionDate;
        this.timesheet.start_time = startTime;
        this.timesheet.end_time = endTime;
        
        this.submissionService.getLocalSubmissions().then((submissions:Array<any>) => {
            
            this.submissions = submissions;
            
            for (var index in this.submissions){
                
                let submission = this.submissions[index]
                
                if (submission.submission_date === this.timesheet.submission_date && 
                    submission.start_time === this.timesheet.start_time && 
                    submission.end_time === this.timesheet.end_time){
                    this.timesheet = submission;
                    this.submissionIndex = index;
        
                    this.submissionLoading = false;


                }

            }            
        });
        this.getSubmittedSubmissions();        
    }
    
    
    public save(){
        
        this.loading = true;
        
        this.timesheet.start_time = moment(this.timesheet.start_time_raw).format("HH:mm");
        this.timesheet.end_time = moment(this.timesheet.end_time_raw).format("HH:mm");
        this.timesheet.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
        
        
  
        if (this.hasOverlap()){
            
            let alert = this.alertCtrl.create({
                 header: 'Error',
                 message: 'Your selected times overlap with an existing entry. Please try again.',
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
            return;
        }        
        
        
        this.submissionService.updateLocalSubmissions(this.submissions).then(() => {
            this.loading = false;
            this.authenticationService.retreiveUserData().then(() => {});
            this.navController.back();
        }).catch(() => {
            let alert = this.alertCtrl.create({
                 header: 'Error',
                 message: 'There was an error trying to save your timesheet. Please try again.',
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
        });
        
        
    }
    
    public formatLongDate(date){
        return moment(date).format("dddd Do MMM");
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
                        
                        
                        
                        this.submissions.splice(this.submissionIndex, 1);
                        this.submissionService.updateLocalSubmissions(this.submissions).then(() => {
                            
                            this.authenticationService.retreiveUserData().then(() => {});
                            this.navController.back();                            
                            
                            
                        }).catch(() => {
                            let alert = this.alertCtrl.create({
                                 header: 'Error',
                                 message: 'There was an error trying to delete your timesheet. Please try again.',
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
                        })
                        
                        }
                        
                
            }
                
            ]
        }).then((el) => {
            el.present();
        });          
    }    
    
    
    private hasOverlap(){
        
        //(StartDate1 <= EndDate2) and (EndDate1 >= StartDate2)
        let todaysDate = moment().format("YYYY-MM-DD");
        let startDate =  moment(todaysDate + " " +this.timesheet.start_time);
        let endDate = moment(todaysDate + " " + this.timesheet.end_time);
        

        
        for (let submission of this.submissions){
            
            let checkStartDate = moment(todaysDate + " " + submission.start_time);
            let checkEndDate = moment(todaysDate + " " + submission.end_time);
            
            if (this.rangeOverlap([startDate, endDate], [checkStartDate, checkEndDate])){
                return true;
            }
            
            
        }
        
        
        for (let submittedSubmission of this.submittedSubmissions){
            
            let checkSubmittedStartDate = moment(submittedSubmission.start_time);
            let checkSubmittedEndDate = moment(submittedSubmission.end_time);
            
            if (this.rangeOverlap([startDate, endDate], [checkSubmittedStartDate, checkSubmittedEndDate])){
                return true;
            }
            
            
        }        
        
        
        
        
       return false;
    }
    

    private rangeOverlap(range1, range2) {


      const [ start1, end1 ] = range1;
      const [ start2, end2 ] = range2;

      // check range1 is between range2
      const startFirst = start1.isBetween(start2, end2, "minute", "()")
      const endFirst = end1.isBetween(start2, end2,  "minute", "()")

      // check range2 is between range1
      const startLast = start2.isBetween(start1, end1,  "minute", "()")
      const endLast = end2.isBetween(start1, end1,  "minute", "()")

      return startFirst || endFirst || startLast || endLast
    }    
    
    
    
    
    public getSubmittedSubmissions(){
        
           
        
        this.submissionService.getSubmissions().then((data:Array<any>) => {
          
            let submittedSubmissions = data;
            

            let weekdayDate =this.timesheet.submission_date;
            
            
            this.submittedSubmissions = [];
            
            for (let submission of submittedSubmissions){
                if (submission.submission_date === weekdayDate){
                    this.submittedSubmissions.push(submission);


                }
            
            }         
            
            
            
            
            
        });
    }   
        
}
