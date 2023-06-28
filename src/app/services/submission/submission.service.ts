import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import {environment} from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SubmissionService {
    
    
    
    
    constructor(public http: HttpClient, public storage: Storage) { }
    
  
    public getSubmissions(){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.get(environment.apiUrl + "/submissions?token=" + token).subscribe((res) => {
                        
                        resolve(res);
                    }, (e) => {
                        reject(e);
                    }); 
                }
                else{
                    reject();
                }
            });
        });        
    }      
    
    
    public getLocalSubmissions(){
        return new Promise((resolve, reject) => {
            
            
            this.storage.get("tt_submissions").then((data) => {
                
                
                let submissions = data ? JSON.parse(data) : [];
                
                resolve(submissions);
                
            }).catch(() => {
                reject();
            });
            
        });        
    }     
    
    
    
  
    
    
    public updateLocalSubmissions(submissions){
        return new Promise((resolve, reject) => {
            
            
            

            this.storage.set("tt_submissions", JSON.stringify(submissions)).then(() => {
                resolve();
            });
            
        });        
    }     
    
    

    
    public getSubmission(submissionId){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.get(environment.apiUrl + "/submissions/" + submissionId + "?token=" + token).subscribe((res) => {
                        resolve(res);
                    }, (e) => {
                        reject(e);
                    }); 
                }
                else{
                    reject();
                }
            });
        });        
    }  
    
    
    
    public createLocalSubmission(submission){
        return new Promise((resolve, reject) => {
            
            
            this.storage.get("tt_submissions").then((data) => {
                
                
                let submissions = data ? JSON.parse(data): [];
                submissions.push(submission);
                
                this.storage.set("tt_submissions", JSON.stringify(submissions)).then(() => {
                    resolve();
                });
                
            });  
        });        
    } 
    
    
    public createSubmission(submission){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.post(environment.apiUrl + "/submissions?token=" + token, submission).subscribe((res) => {
                        
                        resolve(res);
                    }, (e) => {
                        reject(e);
                    }); 
                }
                else{
                    reject();
                }
            });
        });        
    }     
    
    
    
    public sendWeeklyTimesheet(week){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.post(environment.apiUrl + "/sendweeklytimesheet?token=" + token, {week:week}).subscribe((res) => {
                        
                        resolve(res);
                    }, (e) => {
                        reject(e);
                    }); 
                }
                else{
                    reject();
                }
            });
        });        
    }     
    
    
    
    public updateSubmission(submissionId, submission){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.put(environment.apiUrl + "/submissions/" + submissionId + "?token=" + token, {fields:submission}).subscribe((res) => {
                        
                        resolve(res);
                    }, (e) => {
                        reject(e);
                    }); 
                }
                else{
                    reject();
                }
            });
        });        
    }       
    
    
    public deleteSubmission(submissionId){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.delete(environment.apiUrl + "/submissions/" + submissionId + "?token=" + token).subscribe((res) => {
                        
                        resolve(res);
                    }, (e) => {
                        reject(e);
                    }); 
                }
                else{
                    reject();
                }
            });
        });        
    } 
    
    
       
    
    
              
}
