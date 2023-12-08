(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{zDS7:function(n,e,l){"use strict";l.r(e);var t=l("CcnG"),o=l("ZZ/e"),a=l("ri4K"),r=l("9B/o"),u=l("QaJk"),i=l("wd/R"),c=function(){function n(n,e,l,t,o,a){var r=this;this.plt=n,this.authenticationService=e,this.alertCtrl=l,this.iab=t,this.submissionService=o,this.loadingController=a,this.user={},this.authenticationService.getUserData().subscribe((function(n){r.user=n}))}return n.prototype.ngOnInit=function(){},n.prototype.ionViewDidEnter=function(){},n.prototype.openChangeName=function(){var n=this;this.alertCtrl.create({header:"Change Name",inputs:[{name:"name",placeholder:"Name",type:"text",value:this.user.name}],buttons:[{text:"Cancel",role:"cancel",handler:function(n){}},{text:"Change",handler:function(e){e.name&&n.authenticationService.changeName(e.name).then((function(){n.authenticationService.retreiveUserData().then((function(){})),n.alertCtrl.create({header:"Success",message:"Your name has been updated",buttons:[{text:"Dismiss",role:"cancel",handler:function(n){}}]}).then((function(n){n.present()}))})).catch((function(){n.alertCtrl.create({header:"Error",message:"There was an error while changing your name.",buttons:[{text:"Cancel",role:"cancel",handler:function(n){}},{text:"Try Again",handler:function(e){setTimeout((function(){n.openChangeName()}),200)}}]}).then((function(n){n.present()}))}))}}]}).then((function(n){n.present()}))},n.prototype.openChangeEmail=function(){var n=this;this.alertCtrl.create({header:"Change Email",inputs:[{name:"email",placeholder:"Email",type:"text",value:this.user.email}],buttons:[{text:"Cancel",role:"cancel",handler:function(n){}},{text:"Change",handler:function(e){e.email&&n.authenticationService.changeEmail(e.email).then((function(){n.authenticationService.retreiveUserData().then((function(){})),n.alertCtrl.create({header:"Success",message:"Your email has been updated",buttons:[{text:"Dismiss",role:"cancel",handler:function(n){}}]}).then((function(n){n.present()}))})).catch((function(){n.alertCtrl.create({header:"Error",message:"There was an error while changing your email.",buttons:[{text:"Cancel",role:"cancel",handler:function(n){}},{text:"Try Again",handler:function(e){setTimeout((function(){n.openChangeEmail()}),200)}}]}).then((function(n){n.present()}))}))}}]}).then((function(n){n.present()}))},n.prototype.deleteAccount=function(){var n=this;this.alertCtrl.create({header:"WARNING: You are about to delete your account",message:"All your data associated with this account will be erased. This cannot be undone.",buttons:[{text:"Cancel",role:"cancel",handler:function(n){}},{text:"Delete",handler:function(e){n.authenticationService.deleteUser().then((function(){n.alertCtrl.create({header:"Account deleted",message:"Your account has been removed",buttons:[{text:"Dismiss",role:"cancel",handler:function(n){}}]}).then((function(n){n.present()})),n.logout()})).catch((function(){n.alertCtrl.create({header:"Error",message:"There was an error while deleting your account.",buttons:[{text:"Cancel",role:"cancel",handler:function(n){}},{text:"Try Again",handler:function(e){setTimeout((function(){n.deleteAccount()}),200)}}]}).then((function(n){n.present()}))}))}}]}).then((function(n){n.present()}))},n.prototype.openChangePassword=function(){var n=this;this.alertCtrl.create({header:"Change Password",inputs:[{name:"password",placeholder:"Password",type:"password"},{name:"confirmPassword",placeholder:"Confirm Password",type:"password"}],buttons:[{text:"Cancel",role:"cancel",handler:function(n){}},{text:"Change",handler:function(e){e.password&&e.confirmPassword&&e.password===e.confirmPassword?n.authenticationService.changePassword(n.user.email,e.password,e.confirmPassword).then((function(){n.alertCtrl.create({header:"Success",message:"Your password has been updated",buttons:[{text:"Dismiss",role:"cancel",handler:function(n){}}]}).then((function(n){n.present()}))})).catch((function(){n.alertCtrl.create({header:"Error",message:"There was an error while changing your password.",buttons:[{text:"Cancel",role:"cancel",handler:function(n){}},{text:"Try Again",handler:function(e){setTimeout((function(){n.openChangePassword()}),200)}}]}).then((function(n){n.present()}))})):n.alertCtrl.create({header:"Error",message:"Passwords do not match",buttons:[{text:"Cancel",role:"cancel",handler:function(n){}},{text:"Try Again",handler:function(e){setTimeout((function(){n.openChangePassword()}),200)}}]}).then((function(n){n.present()}))}}]}).then((function(n){n.present()}))},n.prototype.formatDate=function(n){return i(n).format("DD/MM/YYYY")},n.prototype.logout=function(){this.authenticationService.logout()},n}(),s=function(){return function(){}}(),h=l("pMnS"),b=l("oBZk"),d=t.rb({encapsulation:0,styles:[[".settings-list[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%]{margin-bottom:10px;margin-top:20px;padding-top:10px}.settings-list[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%]:first-child{margin-top:0;padding-top:0}"]],data:{}});function m(n){return t.Lb(0,[(n()(),t.tb(0,0,null,null,6,"ion-header",[],null,null,null,b.E,b.i)),t.sb(1,49152,null,0,o.B,[t.h,t.k,t.z],null,null),(n()(),t.tb(2,0,null,0,4,"ion-toolbar",[["color","primary"]],null,null,null,b.R,b.v)),t.sb(3,49152,null,0,o.Cb,[t.h,t.k,t.z],{color:[0,"color"]},null),(n()(),t.tb(4,0,null,0,2,"ion-title",[],null,null,null,b.Q,b.u)),t.sb(5,49152,null,0,o.Ab,[t.h,t.k,t.z],null,null),(n()(),t.Kb(-1,0,["Settings"])),(n()(),t.tb(7,0,null,null,36,"ion-content",[],null,null,null,b.B,b.f)),t.sb(8,49152,null,0,o.u,[t.h,t.k,t.z],null,null),(n()(),t.tb(9,0,null,0,34,"ion-list",[["class","settings-list"]],null,null,null,b.K,b.n)),t.sb(10,49152,null,0,o.O,[t.h,t.k,t.z],null,null),(n()(),t.tb(11,0,null,0,6,"ion-item",[["detail",""]],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.openChangeName()&&t),t}),b.H,b.l)),t.sb(12,49152,null,0,o.H,[t.h,t.k,t.z],{detail:[0,"detail"]},null),(n()(),t.tb(13,0,null,0,1,"ion-icon",[["color","primary"],["name","person"],["slot","start"]],null,null,null,b.F,b.j)),t.sb(14,49152,null,0,o.C,[t.h,t.k,t.z],{color:[0,"color"],name:[1,"name"]},null),(n()(),t.tb(15,0,null,0,2,"ion-label",[],null,null,null,b.I,b.m)),t.sb(16,49152,null,0,o.N,[t.h,t.k,t.z],null,null),(n()(),t.Kb(-1,0,["Change Name"])),(n()(),t.tb(18,0,null,0,6,"ion-item",[["detail",""]],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.openChangeEmail()&&t),t}),b.H,b.l)),t.sb(19,49152,null,0,o.H,[t.h,t.k,t.z],{detail:[0,"detail"]},null),(n()(),t.tb(20,0,null,0,1,"ion-icon",[["color","primary"],["name","mail"],["slot","start"]],null,null,null,b.F,b.j)),t.sb(21,49152,null,0,o.C,[t.h,t.k,t.z],{color:[0,"color"],name:[1,"name"]},null),(n()(),t.tb(22,0,null,0,2,"ion-label",[],null,null,null,b.I,b.m)),t.sb(23,49152,null,0,o.N,[t.h,t.k,t.z],null,null),(n()(),t.Kb(-1,0,["Change Email"])),(n()(),t.tb(25,0,null,0,6,"ion-item",[["detail",""]],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.openChangePassword()&&t),t}),b.H,b.l)),t.sb(26,49152,null,0,o.H,[t.h,t.k,t.z],{detail:[0,"detail"]},null),(n()(),t.tb(27,0,null,0,1,"ion-icon",[["color","primary"],["name","unlock"],["slot","start"]],null,null,null,b.F,b.j)),t.sb(28,49152,null,0,o.C,[t.h,t.k,t.z],{color:[0,"color"],name:[1,"name"]},null),(n()(),t.tb(29,0,null,0,2,"ion-label",[],null,null,null,b.I,b.m)),t.sb(30,49152,null,0,o.N,[t.h,t.k,t.z],null,null),(n()(),t.Kb(-1,0,["Change Password"])),(n()(),t.tb(32,0,null,0,4,"ion-item",[],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.logout()&&t),t}),b.H,b.l)),t.sb(33,49152,null,0,o.H,[t.h,t.k,t.z],null,null),(n()(),t.tb(34,0,null,0,1,"ion-icon",[["color","primary"],["name","lock"],["slot","start"]],null,null,null,b.F,b.j)),t.sb(35,49152,null,0,o.C,[t.h,t.k,t.z],{color:[0,"color"],name:[1,"name"]},null),(n()(),t.Kb(-1,0,[" Logout "])),(n()(),t.tb(37,0,null,0,6,"ion-item",[],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.deleteAccount()&&t),t}),b.H,b.l)),t.sb(38,49152,null,0,o.H,[t.h,t.k,t.z],null,null),(n()(),t.tb(39,0,null,0,1,"ion-icon",[["color","danger"],["name","trash"],["slot","start"]],null,null,null,b.F,b.j)),t.sb(40,49152,null,0,o.C,[t.h,t.k,t.z],{color:[0,"color"],name:[1,"name"]},null),(n()(),t.tb(41,0,null,0,2,"ion-label",[["color","danger"]],null,null,null,b.I,b.m)),t.sb(42,49152,null,0,o.N,[t.h,t.k,t.z],{color:[0,"color"]},null),(n()(),t.Kb(-1,0,["Delete Account"]))],(function(n,e){n(e,3,0,"primary"),n(e,12,0,""),n(e,14,0,"primary","person"),n(e,19,0,""),n(e,21,0,"primary","mail"),n(e,26,0,""),n(e,28,0,"primary","unlock"),n(e,35,0,"primary","lock"),n(e,40,0,"danger","trash"),n(e,42,0,"danger")}),null)}function p(n){return t.Lb(0,[(n()(),t.tb(0,0,null,null,1,"app-settings",[],null,null,null,m,d)),t.sb(1,114688,null,0,c,[o.Jb,a.a,o.a,r.a,u.a,o.Gb],null,null)],(function(n,e){n(e,1,0)}),null)}var f=t.pb("app-settings",c,p,{},{},[]),g=l("Ip0R"),C=l("gIcY"),w=l("ZYCi");l.d(e,"SettingsPageModuleNgFactory",(function(){return k}));var k=t.qb(s,[],(function(n){return t.Bb([t.Cb(512,t.j,t.bb,[[8,[h.a,f]],[3,t.j],t.x]),t.Cb(4608,g.l,g.k,[t.u,[2,g.w]]),t.Cb(4608,C.j,C.j,[]),t.Cb(4608,o.b,o.b,[t.z,t.g]),t.Cb(4608,o.Hb,o.Hb,[o.b,t.j,t.q]),t.Cb(4608,o.Kb,o.Kb,[o.b,t.j,t.q]),t.Cb(1073742336,g.b,g.b,[]),t.Cb(1073742336,C.i,C.i,[]),t.Cb(1073742336,C.b,C.b,[]),t.Cb(1073742336,o.Eb,o.Eb,[]),t.Cb(1073742336,w.p,w.p,[[2,w.u],[2,w.m]]),t.Cb(1073742336,s,s,[]),t.Cb(1024,w.k,(function(){return[[{path:"",component:c}]]}),[])])}))}}]);