import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import {environment} from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

    constructor(public http: HttpClient, public storage: Storage) { }
    
  
    public uploadFile(form){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.post( environment.apiUrl + '/upload', form).subscribe((res) => {
                        
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