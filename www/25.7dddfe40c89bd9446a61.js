(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{oqQG:function(n,l,t){"use strict";t.r(l);var u=t("CcnG"),i=function(){return function(){}}(),e=t("pMnS"),o=t("oBZk"),s=t("ZZ/e"),r=t("ZYCi"),a=t("Ip0R"),b=t("QaJk"),c=t("wd/R"),m=t("ri4K"),f=function(){function n(n,l,t,u,i,e){var o=this;this.submissionService=n,this.authenticationService=l,this.navController=t,this.route=u,this.alertCtrl=i,this.ngZone=e,this.loading=!0,this.breakTime=30,this.submissions=[],this.submittedSubmissions=[],this.user={},this.authenticationService.getUserData().subscribe((function(n){if(o.ngZone.run((function(){o.user=n})),o.user.groups.length>0){var l=o.user.groups[0];o.ngZone.run((function(){l.break_time&&(o.breakTime=parseFloat(l.break_time))}))}o.getSubmissions(),o.getSubmittedSubmissions()}))}return n.prototype.ngOnInit=function(){},n.prototype.ionViewDidEnter=function(){var n=this.route.snapshot.queryParamMap.get("date");this.selectedDate=n,this.submissions=[],this.submittedSubmissions=[],this.getSubmissions(),this.getSubmittedSubmissions()},n.prototype.calculateWorkTime=function(){for(var n=0,l=this.formatDatabase(this.selectedDate),t=0,u=0,i=0,e=0,o=this.submissions;e<o.length;e++)if((b=o[e]).submission_date===l){var s=b.submission_date+" "+b.start_time;t+=c.duration(c(b.submission_date+" "+b.end_time).diff(c(s))).asMinutes(),b.no_break&&(u+=1),i+=1}for(var r=0,a=this.submittedSubmissions;r<a.length;r++){var b;(b=a[r]).submission_date===l&&(s=b.submission_date+" "+b.start_time,t+=c.duration(c(b.submission_date+" "+b.end_time).diff(c(s))).asMinutes(),b.no_break&&(u+=1),i+=1)}t>0&&(t-=this.breakTime,u>0&&i===u&&(t+=this.breakTime),t<0&&(t=0)),this.totalWorkTime=n+=t},n.prototype.getSubmissions=function(){var n=this;this.selectedDate&&this.submissionService.getLocalSubmissions().then((function(l){var t=l,u=n.formatDatabase(n.selectedDate);n.submissions=[];for(var i=0,e=t;i<e.length;i++){var o=e[i];o.submission_date===u&&n.submissions.push(o)}n.calculateWorkTime()}))},n.prototype.getSubmittedSubmissions=function(){var n=this;this.selectedDate&&this.submissionService.getSubmissions().then((function(l){var t=l,u=n.formatDatabase(n.selectedDate);n.submittedSubmissions=[];for(var i=0,e=t;i<e.length;i++){var o=e[i];o.submission_date===u&&n.submittedSubmissions.push(o)}n.calculateWorkTime(),n.loading=!1}))},n.prototype.formatDate=function(n){return c(n).format("DD/MM/YYYY")},n.prototype.formatDatabase=function(n){return c(n).format("YYYY-MM-DD")},n.prototype.formatMinutes=function(n){var l=n/60,t=Math.floor(l),u=Math.round(60*(l-t)),i=1===t?"hour":"hours";return t<1&&u<1?"0 "+i:(t>0?t+" "+i+" ":"")+(u>0?u+" "+(1===u?"minute":"minutes"):"")},n.prototype.formatLongDate=function(n){return c(n).format("dddd Do MMM")},n.prototype.formatFromNow=function(n){return c(n).fromNow()},n.prototype.formatFromNowServer=function(n){var l=-(new Date).getTimezoneOffset();return c(n).add(l,"m").fromNow()},n}(),d=u.rb({encapsulation:0,styles:[[".submissions__list[_ngcontent-%COMP%]{margin-top:5px}.timesheet__total-time[_ngcontent-%COMP%]{padding:0 15px;margin-top:20px;margin-bottom:30px}.timesheet__total-time[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{margin:0;font-weight:700}.timesheet__total-time[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{white-space:nowrap}.timesheet__total-time[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:12px}.add-timesheet-footer__button[_ngcontent-%COMP%]{margin-top:30px;margin-left:15px;margin-right:15px}.add-timesheet-footer__button[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px;margin-left:5px}"]],data:{}});function h(n){return u.Lb(0,[(n()(),u.tb(0,0,null,null,1,"h4",[],null,null,null,null,null)),(n()(),u.Kb(1,null,["",""]))],null,(function(n,l){n(l,1,0,l.parent.context.$implicit.site_name)}))}function p(n){return u.Lb(0,[(n()(),u.tb(0,0,null,null,14,"ion-item",[["detail",""],["routerDirection","forward"]],null,[[null,"click"]],(function(n,l,t){var i=!0;return"click"===l&&(i=!1!==u.Eb(n,2).onClick()&&i),"click"===l&&(i=!1!==u.Eb(n,5).onClick(t)&&i),i}),o.H,o.l)),u.sb(1,49152,null,0,s.H,[u.h,u.k,u.z],{detail:[0,"detail"],routerDirection:[1,"routerDirection"]},null),u.sb(2,16384,null,0,r.n,[r.m,r.a,[8,null],u.D,u.k],{queryParams:[0,"queryParams"],routerLink:[1,"routerLink"]},null),u.Gb(3,{date:0,start_time:1,end_time:2}),u.Fb(4,1),u.sb(5,737280,null,0,s.Lb,[a.g,s.Ib,u.k,r.m,[2,r.n]],{routerDirection:[0,"routerDirection"]},null),(n()(),u.tb(6,0,null,0,8,"ion-label",[],null,null,null,o.I,o.m)),u.sb(7,49152,null,0,s.N,[u.h,u.k,u.z],null,null),(n()(),u.tb(8,0,null,0,2,"h2",[],null,null,null,null,null)),(n()(),u.tb(9,0,null,null,1,"strong",[],null,null,null,null,null)),(n()(),u.Kb(10,null,[""," - ",""])),(n()(),u.ib(16777216,null,0,1,null,h)),u.sb(12,16384,null,0,a.j,[u.O,u.L],{ngIf:[0,"ngIf"]},null),(n()(),u.tb(13,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),u.Kb(14,null,["Added ",""]))],(function(n,l){var t=l.component;n(l,1,0,"","forward");var u=n(l,3,0,t.formatDatabase(l.context.$implicit.submission_date),l.context.$implicit.start_time,l.context.$implicit.end_time),i=n(l,4,0,"/edit-timesheet");n(l,2,0,u,i),n(l,5,0,"forward"),n(l,12,0,l.context.$implicit.site_name)}),(function(n,l){var t=l.component;n(l,10,0,l.context.$implicit.start_time,l.context.$implicit.end_time),n(l,14,0,t.formatFromNow(l.context.$implicit.created_at))}))}function g(n){return u.Lb(0,[(n()(),u.tb(0,0,null,null,6,"ion-list",[["class","submissions__list"]],null,null,null,o.K,o.n)),u.sb(1,49152,null,0,s.O,[u.h,u.k,u.z],null,null),(n()(),u.tb(2,0,null,0,2,"ion-list-header",[],null,null,null,o.J,o.o)),u.sb(3,49152,null,0,s.P,[u.h,u.k,u.z],null,null),(n()(),u.Kb(-1,0,[" Unsubmitted Timesheets "])),(n()(),u.ib(16777216,null,0,1,null,p)),u.sb(6,278528,null,0,a.i,[u.O,u.L,u.s],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){n(l,6,0,l.component.submissions)}),null)}function k(n){return u.Lb(0,[(n()(),u.tb(0,0,null,null,2,"ion-list-header",[],null,null,null,o.J,o.o)),u.sb(1,49152,null,0,s.P,[u.h,u.k,u.z],null,null),(n()(),u.Kb(-1,0,[" Submitted Timesheets "]))],null,null)}function _(n){return u.Lb(0,[(n()(),u.tb(0,0,null,null,1,"h4",[],null,null,null,null,null)),(n()(),u.Kb(1,null,["",""]))],null,(function(n,l){n(l,1,0,l.parent.context.$implicit.site_name)}))}function D(n){return u.Lb(0,[(n()(),u.tb(0,0,null,null,13,"ion-item",[["class","submissions__list__item"],["detail",""],["routerDirection","forward"]],null,[[null,"click"]],(function(n,l,t){var i=!0;return"click"===l&&(i=!1!==u.Eb(n,2).onClick()&&i),"click"===l&&(i=!1!==u.Eb(n,4).onClick(t)&&i),i}),o.H,o.l)),u.sb(1,49152,null,0,s.H,[u.h,u.k,u.z],{detail:[0,"detail"],routerDirection:[1,"routerDirection"]},null),u.sb(2,16384,null,0,r.n,[r.m,r.a,[8,null],u.D,u.k],{routerLink:[0,"routerLink"]},null),u.Fb(3,1),u.sb(4,737280,null,0,s.Lb,[a.g,s.Ib,u.k,r.m,[2,r.n]],{routerDirection:[0,"routerDirection"]},null),(n()(),u.tb(5,0,null,0,8,"ion-label",[],null,null,null,o.I,o.m)),u.sb(6,49152,null,0,s.N,[u.h,u.k,u.z],null,null),(n()(),u.tb(7,0,null,0,2,"h2",[],null,null,null,null,null)),(n()(),u.tb(8,0,null,null,1,"strong",[],null,null,null,null,null)),(n()(),u.Kb(9,null,[""," - ",""])),(n()(),u.ib(16777216,null,0,1,null,_)),u.sb(11,16384,null,0,a.j,[u.O,u.L],{ngIf:[0,"ngIf"]},null),(n()(),u.tb(12,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),u.Kb(13,null,["Submitted ",""]))],(function(n,l){n(l,1,0,"","forward");var t=n(l,3,0,"/submission/"+l.context.$implicit.id);n(l,2,0,t),n(l,4,0,"forward"),n(l,11,0,l.context.$implicit.site_name)}),(function(n,l){var t=l.component;n(l,9,0,l.context.$implicit.start_time,l.context.$implicit.end_time),n(l,13,0,t.formatFromNowServer(l.context.$implicit.created_at))}))}function v(n){return u.Lb(0,[(n()(),u.tb(0,0,null,null,5,"ion-list",[["class","submissions__list"]],null,null,null,o.K,o.n)),u.sb(1,49152,null,0,s.O,[u.h,u.k,u.z],null,null),(n()(),u.ib(16777216,null,0,1,null,k)),u.sb(3,16384,null,0,a.j,[u.O,u.L],{ngIf:[0,"ngIf"]},null),(n()(),u.ib(16777216,null,0,1,null,D)),u.sb(5,278528,null,0,a.i,[u.O,u.L,u.s],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){var t=l.component;n(l,3,0,t.submissions.length>0&&t.submittedSubmissions.length>0),n(l,5,0,t.submittedSubmissions)}),null)}function C(n){return u.Lb(0,[(n()(),u.tb(0,0,null,null,6,"div",[["class","timesheet__total-time"]],null,null,null,null,null)),(n()(),u.tb(1,0,null,null,3,"h6",[],null,null,null,null,null)),(n()(),u.Kb(-1,null,["Total work time is "])),(n()(),u.tb(3,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),u.Kb(4,null,["",""])),(n()(),u.tb(5,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),u.Kb(6,null,[""," minute daily break"]))],null,(function(n,l){var t=l.component;n(l,4,0,t.formatMinutes(t.totalWorkTime)),n(l,6,0,t.breakTime)}))}function x(n){return u.Lb(0,[(n()(),u.tb(0,0,null,null,11,"ion-header",[],null,null,null,o.E,o.i)),u.sb(1,49152,null,0,s.B,[u.h,u.k,u.z],null,null),(n()(),u.tb(2,0,null,0,9,"ion-toolbar",[["color","primary"]],null,null,null,o.R,o.v)),u.sb(3,49152,null,0,s.Cb,[u.h,u.k,u.z],{color:[0,"color"]},null),(n()(),u.tb(4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,o.z,o.d)),u.sb(5,49152,null,0,s.l,[u.h,u.k,u.z],null,null),(n()(),u.tb(6,0,null,0,2,"ion-back-button",[["defaultHref","/tabs/timesheet"]],null,[[null,"click"]],(function(n,l,t){var i=!0;return"click"===l&&(i=!1!==u.Eb(n,8).onClick(t)&&i),i}),o.x,o.b)),u.sb(7,49152,null,0,s.g,[u.h,u.k,u.z],{defaultHref:[0,"defaultHref"]},null),u.sb(8,16384,null,0,s.h,[[2,s.ib],s.Ib],{defaultHref:[0,"defaultHref"]},null),(n()(),u.tb(9,0,null,0,2,"ion-title",[],null,null,null,o.Q,o.u)),u.sb(10,49152,null,0,s.Ab,[u.h,u.k,u.z],null,null),(n()(),u.Kb(11,0,[" "," "])),(n()(),u.tb(12,0,null,null,14,"ion-content",[],null,null,null,o.B,o.f)),u.sb(13,49152,null,0,s.u,[u.h,u.k,u.z],null,null),(n()(),u.ib(16777216,null,0,1,null,g)),u.sb(15,16384,null,0,a.j,[u.O,u.L],{ngIf:[0,"ngIf"]},null),(n()(),u.ib(16777216,null,0,1,null,v)),u.sb(17,16384,null,0,a.j,[u.O,u.L],{ngIf:[0,"ngIf"]},null),(n()(),u.ib(16777216,null,0,1,null,C)),u.sb(19,16384,null,0,a.j,[u.O,u.L],{ngIf:[0,"ngIf"]},null),(n()(),u.tb(20,0,null,0,6,"ion-button",[["class","add-timesheet-footer__button"],["color","primary"],["expand","full"],["routerDirection","forward"]],null,[[null,"click"]],(function(n,l,t){var i=!0;return"click"===l&&(i=!1!==u.Eb(n,22).onClick()&&i),"click"===l&&(i=!1!==u.Eb(n,25).onClick(t)&&i),i}),o.y,o.c)),u.sb(21,49152,null,0,s.k,[u.h,u.k,u.z],{color:[0,"color"],expand:[1,"expand"],routerDirection:[2,"routerDirection"]},null),u.sb(22,16384,null,0,r.n,[r.m,r.a,[8,null],u.D,u.k],{queryParams:[0,"queryParams"],routerLink:[1,"routerLink"]},null),u.Gb(23,{date:0}),u.Fb(24,1),u.sb(25,737280,null,0,s.Lb,[a.g,s.Ib,u.k,r.m,[2,r.n]],{routerDirection:[0,"routerDirection"]},null),(n()(),u.Kb(-1,0,[" Add Timesheet "]))],(function(n,l){var t=l.component;n(l,3,0,"primary"),n(l,7,0,"/tabs/timesheet"),n(l,8,0,"/tabs/timesheet"),n(l,15,0,t.submissions.length>0),n(l,17,0,t.submittedSubmissions.length>0),n(l,19,0,t.submittedSubmissions.length>0||t.submissions.length>0),n(l,21,0,"primary","full","forward");var u=n(l,23,0,t.formatDatabase(t.selectedDate)),i=n(l,24,0,"/add-timesheet");n(l,22,0,u,i),n(l,25,0,"forward")}),(function(n,l){var t=l.component;n(l,11,0,t.selectedDate?t.formatLongDate(t.selectedDate):"")}))}function w(n){return u.Lb(0,[(n()(),u.tb(0,0,null,null,1,"app-timesheet-date",[],null,null,null,x,d)),u.sb(1,114688,null,0,f,[b.a,m.a,s.Ib,r.a,s.a,u.z],null,null)],(function(n,l){n(l,1,0)}),null)}var L=u.pb("app-timesheet-date",f,w,{},{},[]),S=t("gIcY"),M=function(){return function(){}}();t.d(l,"TimesheetDatePageModuleNgFactory",(function(){return O}));var O=u.qb(i,[],(function(n){return u.Bb([u.Cb(512,u.j,u.bb,[[8,[e.a,L]],[3,u.j],u.x]),u.Cb(4608,a.l,a.k,[u.u,[2,a.w]]),u.Cb(4608,S.j,S.j,[]),u.Cb(4608,s.b,s.b,[u.z,u.g]),u.Cb(4608,s.Hb,s.Hb,[s.b,u.j,u.q]),u.Cb(4608,s.Kb,s.Kb,[s.b,u.j,u.q]),u.Cb(1073742336,a.b,a.b,[]),u.Cb(1073742336,S.i,S.i,[]),u.Cb(1073742336,S.b,S.b,[]),u.Cb(1073742336,s.Eb,s.Eb,[]),u.Cb(1073742336,r.p,r.p,[[2,r.u],[2,r.m]]),u.Cb(1073742336,M,M,[]),u.Cb(1073742336,i,i,[]),u.Cb(1024,r.k,(function(){return[[{path:"",component:f}]]}),[])])}))}}]);