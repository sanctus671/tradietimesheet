import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import {environment} from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    
    authState = new BehaviorSubject({});
    userData = new BehaviorSubject(false);
    
    constructor(public http: HttpClient, public storage: Storage, private platform: Platform) {    
    
        this.platform.ready().then(() => {
            this.ifLoggedIn();
        });    
 
    }
  
  
    ifLoggedIn() {
        this.storage.get('tt_token').then((response) => {
            if (response) {
              this.authState.next({data:{authenticated:true}});
            }
            else{
                this.authState.next({data:{authenticated:false}});
            }
        }).catch(() => {
            this.authState.next({data:{authenticated:false}});
        });
    }    
    
    
    public isAuthenticated() {
        let state:any = this.authState.value;
        

        if (state && state.data && state.data.authenticated) { 
            return true;
        }         
        
        return false;
        
        
    }
  
    public login(data){
        return new Promise((resolve, reject) => {
            this.http.post(environment.apiUrl + "/auth/login", data).subscribe((res) => {
                    this.storage.set("tt_token", res["token"]).then(() => {
                        this.authState.next({data:{authenticated:true}});
                    });
                             
                    this.retreiveUserData().then(() => {});
                    
                    resolve(res["token"]);             
              },(e) => {
              //console.log(e);
                  reject(e);
              });          
        })
    }
  
  
  
    public register(data){
        return new Promise((resolve, reject) => {
            this.http.post(environment.apiUrl + "/auth/signup", data).subscribe((res) => {
                this.storage.set("tt_token", res["token"]).then(() => {
                    this.authState.next({data:{authenticated:true}});
                }); 
                
                this.retreiveUserData().then(() => {});
                    
                resolve(res["token"]);
            },(e) => {
                reject(e);
            });          
        })      
    }
    
    public retreiveUserData(){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.get(environment.apiUrl + "/users/me?token=" + token).subscribe((res:any) => {
                        this.storage.get("tt_user").then((data) => {
                            if (data && data.id !== res.id){
                                this.storage.remove("tt_submissions");
                                this.storage.remove("tt_online_submissions");
                                this.storage.remove("tt_update_submissions");
                                this.storage.remove("tt_document_groups");
                                this.storage.remove("tt_documents");
                                this.storage.remove("tt_form_groups");
                                this.storage.remove("tt_forms");
                            }
                        })
                        this.storage.set("tt_user", res);
                        this.setUserData(res);
                        resolve(res);
                    }, (e) => {
                    //console.log(e);
                        if (e && e.error && e.error.error && e.error.error.status_code === 401){
                                //token expired, logout
                                this.storage.clear();
                                this.authState.next({data:{authenticated:false}});
                                //this.app.getRootNav().setRoot(LoginPage);
                                //this.app.getRootNav().popToRoot();  
                        }
                        else if (e && e.error && e.error.error && e.error.error.status_code === 500){
                                //user was deleted on the server, logout
                                this.storage.clear();
                                this.authState.next({data:{authenticated:false}});                           
                        }                            
                        else{
                            this.storage.get("tt_user").then((data) => {
                                if (data){
                                    resolve(data);
                                }
                                else{
                                   reject(e); 
                                }
                            }).catch(() => {
                                reject(e);
                            });
                        }
                        
                    }); 
                }
                else{
                    reject();
                }
            });
        });        
    }
    
    public getUserData(){
        return this.userData.asObservable();
    }

    public setUserData(userData){
        this.userData.next(userData);
    }  
    
    
    public getGroups(){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.get(environment.apiUrl + "/groups?token=" + token).subscribe((res) => {
                        
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
    
    
    public resetPassword(data){
        return new Promise((resolve, reject) => {
            this.http.post(environment.apiUrl + "/auth/recovery", data).subscribe((res) => {        
                resolve(res);
            },(e) => {
                reject(e);
            });          
        })      
    }     

    public logout(){
        return new Promise((resolve, reject) => {
            
            this.storage.get("tt_token").then((token) => {            
                if (token){
                    this.http.post(environment.apiUrl + "/auth/logout?token=" + token,{}).subscribe((res) => {
                        
                        
                        resolve();
                        
                    }, (e) => {
                        resolve();
                    });   
                }
                else{
                    resolve();
                }
                //this.storage.clear();
                this.storage.remove("tt_token");
                this.authState.next({data:{authenticated:false}});
            });       
        })        
    }  
    
    
    public deleteUser(){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.delete(environment.apiUrl + "/users/me?token=" + token).subscribe((res) => {
                        resolve(res);                     
                    },(e) => {
                        reject(e);
                    });   
                }
                else{reject();} 
            });                    
        })       
    }          
               
    public changeEmail(email){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.put(environment.apiUrl + "/users/me?token=" + token,{email:email}).subscribe((res) => {
                        resolve(res);                     
                    },(e) => {
                        reject(e);
                    });   
                }
                else{reject();} 
            });                    
        })       
    }   
               
    public changeName(name){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.put(environment.apiUrl + "/users/me?token=" + token,{name:name}).subscribe((res) => {
                        resolve(res);                     
                    },(e) => {
                        reject(e);
                    });   
                }
                else{reject();} 
            });                    
        })       
    }
    
    
    
    
    public savePushId(id){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.post(environment.apiUrl + "/updatepushid?token=" + token,{push_id:id}).subscribe((res) => {
                        resolve();                     
                    },(e) => {
                        reject(e);
                    });   
                }
                else{reject();} 
            });                    
        })       
    }            

    public changePassword(email,password,passwordConfirm){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.put(environment.apiUrl + "/users/me?token=" + token,{email:email,password:password}).subscribe((res) => {
                        resolve();                     
                    },(e) => {
                        reject(e);
                    });   
                }
                else{reject();} 
            });                    
        })       
    }
    
   
    
    
    public getProfile(userId){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.get(environment.apiUrl + '/profiles/' + userId + '?token=' + token).subscribe((res:any) => {
                        resolve(res.profile);
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
    
    public updateProfile(profile){
        return new Promise((resolve, reject) => {
            this.storage.get("tt_token").then((token) => {            
                if (token){            
                    this.http.put(environment.apiUrl + "/profiles/" + profile.id + "?token=" + token, profile).subscribe((res:any) => {
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
