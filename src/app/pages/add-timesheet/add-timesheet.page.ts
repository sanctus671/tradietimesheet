import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SubmissionService} from '../../services/submission/submission.service';
import { NavController, AlertController } from "@ionic/angular";
import * as moment from 'moment';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.page.html',
  styleUrls: ['./add-timesheet.page.scss'],
})
export class AddTimesheetPage implements OnInit {
    
    
    public timesheet:any;
    public appSettings:any;
    public loading:boolean;
    public user:any;
    public fieldLabels:any;
    
    public submissions:Array<any>;
    public submittedSubmissions:Array<any>;
    
    constructor(private submissionService:SubmissionService, private authenticationService:AuthenticationService, 
        private navController: NavController, private route: ActivatedRoute, private alertCtrl: AlertController) { 
        
        this.appSettings = {};
        
        this.fieldLabels = {site_name:"Site Name", total_rubbish: "Materials Used", comments: "Comments"};
        
		let timezoneOffset = -(new Date().getTimezoneOffset())/60;
		let initialDate = moment().format("YYYY-MM-DD") + "T07:00:00+" + timezoneOffset + ":00";
		
        this.timesheet = {start_time_raw:initialDate};
		
        this.submissions = [];
        this.submittedSubmissions = [];
        
        this.user = {};
        
        
        this.authenticationService.getUserData().subscribe((data) => {
            this.user = data;
            
            if (this.user.groups.length > 0){
                this.timesheet.group_id = this.user.groups[0].id;
                
                 
                    
                        this.appSettings = this.user.groups[0];

                        if (this.appSettings.field_labels){
                            
                            this.fieldLabels = JSON.parse(this.appSettings.field_labels);

                        }              
                
                
                
            }
            
        })
        
    }
    
    ionViewDidEnter(){
        const submissionDate: string = this.route.snapshot.queryParamMap.get('date');
  
        
        this.timesheet.submission_date = submissionDate;
        
	this.getSubmissions();
        this.getSubmittedSubmissions();
        
    }

    ngOnInit() {
        
        
        
    }
    
    
    public save(){
        
        this.loading = true;
   
        this.timesheet.start_time = moment(this.timesheet.start_time_raw).format("HH:mm");
        this.timesheet.end_time = moment(this.timesheet.end_time_raw).format("HH:mm");
        this.timesheet.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        
  
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
        
        
        this.submissionService.createLocalSubmission(this.timesheet).then(() => {
            
   
            
            
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
    
    
    public getSubmissions(){
        
     
        this.submissionService.getLocalSubmissions().then((data:Array<any>) => {
        
            let submissions = data;



            let weekdayDate = this.timesheet.submission_date;
            
    
            
            
            this.submissions = [];
            
      
            
            for (let submission of submissions){
                if (submission.submission_date === weekdayDate){
                    this.submissions.push(submission);


                }
            
            }
            
      


            
        })
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
    
    
    
    
    public formatDatabase(date){
        return moment(date).format("YYYY-MM-DD");
    }   
    
    
    
    
    
  
    

}
