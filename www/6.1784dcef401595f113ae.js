(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{PqgL:function(e,t,n){"use strict";n.r(t);var i=n("CcnG"),s=function(){return function(){}}(),l=n("pMnS"),o=n("oBZk"),a=n("ZZ/e"),u=n("Ip0R"),r=n("ZYCi"),c=n("gIcY"),m=n("wd/R"),h=n("ri4K"),b=n("QaJk"),d=n("p74H"),g=function(){function e(e,t,n,i,s,l,o){var a=this;this.authenticationService=e,this.submissionService=t,this.ngZone=n,this.loadingController=i,this.alertCtrl=s,this.platform=l,this.statusBar=o,this.appSettings={name:"",color_scheme:"",logo:"",field_labels:"",week_start:"",break_toggle:!1},this.maxSelectableDate=m().format("YYYY-MM-DD"),this.weekdaySubmissions={},this.weekdaySubmittedSubmissions={},this.submittedSubmissions=[],this.submissions=[],this.pendingSubmissions=0,this.user={},this.breakTime=30,this.setStartOfWeek(),this.setWeekdays(),this.getSubmissions(),this.getSubmittedSubmissions(),this.authenticationService.getUserData().subscribe((function(e){e&&(a.user=e,a.user.groups.length>0&&a.ngZone.run((function(){var e=a.appSettings.week_start;a.appSettings=a.user.groups[0],a.appSettings.color_scheme&&a.setColorScheme(),a.appSettings.break_time&&(a.breakTime=parseFloat(a.appSettings.break_time)),a.appSettings.week_start&&a.appSettings.week_start!==e&&(a.setStartOfWeek(),a.setWeekdays())}))),a.getSubmissions(),a.getSubmittedSubmissions()}))}return e.prototype.ngOnInit=function(){},e.prototype.ionViewDidEnter=function(){this.appSettings.color_scheme&&this.setColorScheme()},e.prototype.calculateWorkTime=function(){for(var e=0,t=0,n=this.weekdays;t<n.length;t++){for(var i=this.formatDatabase(n[t]),s=0,l=0,o=0,a=0,u=this.submissions;a<u.length;a++)if((b=u[a]).submission_date===i){var r=b.submission_date+" "+b.start_time;s+=m.duration(m(b.submission_date+" "+b.end_time).diff(m(r))).asMinutes(),b.no_break&&(l+=1),o+=1}for(var c=0,h=this.submittedSubmissions;c<h.length;c++){var b;(b=h[c]).submission_date===i&&(r=b.submission_date+" "+b.start_time,s+=m.duration(m(b.submission_date+" "+b.end_time).diff(m(r))).asMinutes(),b.no_break&&(l+=1),o+=1)}s>0&&(s-=this.breakTime,l>0&&o===l&&(s+=this.breakTime),s<0&&(s=0)),e+=s}this.totalWorkTime=e},e.prototype.setStartOfWeek=function(){var e=this.appSettings.week_start?this.appSettings.week_start:"Monday",t=m().startOf("week").day(e),n=m();t.isAfter(n)&&t.subtract(1,"weeks"),this.currentWeek=m(t),this.selectedDate=this.currentWeek.toISOString()},e.prototype.setColorScheme=function(){var e=this;setTimeout((function(){if(document.documentElement.style.setProperty("--ion-color-primary",e.appSettings.color_scheme),document.documentElement.style.setProperty("--ion-color-primary-shade",e.appSettings.color_scheme),document.documentElement.style.setProperty("--ion-color-primary-tint",e.appSettings.color_scheme),e.platform.is("android")){var t=e.LightenDarkenColor(e.appSettings.color_scheme,-40);e.statusBar.backgroundColorByHexString(t.length<7?"#000000":t)}}))},e.prototype.getSubmissions=function(){var e=this;this.submissionService.getLocalSubmissions().then((function(t){e.submissions=t,e.setWeekdaySubmissions()}))},e.prototype.getSubmittedSubmissions=function(){var e=this;this.submissionService.getSubmissions().then((function(t){e.submittedSubmissions=t,e.setWeekdaySubmittedSubmissions()}))},e.prototype.setWeekdays=function(){this.weekdays=[],this.weekdays.push(m(this.currentWeek)),this.weekdays.push(m(this.currentWeek).add(1,"days")),this.weekdays.push(m(this.currentWeek).add(2,"days")),this.weekdays.push(m(this.currentWeek).add(3,"days")),this.weekdays.push(m(this.currentWeek).add(4,"days")),this.weekdays.push(m(this.currentWeek).add(5,"days")),this.weekdays.push(m(this.currentWeek).add(6,"days"))},e.prototype.setWeekdaySubmittedSubmissions=function(){var e=this;this.ngZone.run((function(){e.weekdaySubmittedSubmissions={};for(var t=0,n=e.submittedSubmissions;t<n.length;t++)for(var i=n[t],s=0,l=e.weekdays;s<l.length;s++){var o=e.formatDatabase(l[s]);i.submission_date===o&&(e.weekdaySubmittedSubmissions[o]=i)}})),this.calculateWorkTime()},e.prototype.setWeekdaySubmissions=function(){var e=this;this.weekdaySubmissions={},this.pendingSubmissions=0,this.ngZone.run((function(){for(var t=0,n=e.submissions;t<n.length;t++)for(var i=n[t],s=0,l=e.weekdays;s<l.length;s++){var o=e.formatDatabase(l[s]);i.submission_date===o&&(e.weekdaySubmissions[o]=i,e.pendingSubmissions+=1)}})),this.calculateWorkTime()},e.prototype.resetWeek=function(){var e=this;this.alertCtrl.create({header:"Confirm",message:"You are about to reset all unsubmitted timesheets for week "+this.formatDate(this.currentWeek)+". Do you want to continue?",buttons:[{text:"Cancel",role:"cancel",handler:function(e){}},{text:"Reset",handler:function(t){var n=[];for(var i in e.submissions){for(var s=e.submissions[i],l=!0,o=0,a=e.weekdays;o<a.length;o++){var u=e.formatDatabase(a[o]);s.submission_date===u&&(l=!1)}l&&n.push(s)}e.ngZone.run((function(){e.weekdaySubmissions={},e.submissions=n})),e.submissionService.updateLocalSubmissions(n).then((function(){setTimeout((function(){e.loader.dismiss(),e.alertCtrl.create({header:"Success",message:"Your timesheets have been reset",buttons:[{text:"Dismiss",role:"cancel",handler:function(e){}}]}).then((function(e){e.present()}))}),1e3),e.getSubmissions()}))}}]}).then((function(e){e.present()}))},e.prototype.submitWeek=function(){var e=this;this.alertCtrl.create({header:"Confirm",message:"You are about to submit all timesheets for week "+this.formatDate(this.currentWeek)+". Do you want to continue?",buttons:[{text:"Cancel",role:"cancel",handler:function(e){}},{text:"Submit All",handler:function(t){e.loadingController.create({message:"Submitting timesheets. Please wait..."}).then((function(t){e.loader=t,t.present();var n=[];for(var i in e.submissions)for(var s=e.submissions[i],l=0,o=e.weekdays;l<o.length;l++){var a=e.formatDatabase(o[l]);s.submission_date===a&&(s.submission_index=i,n.push(s))}e.submitSubmission(n.length-1,n,n.length)}))}}]}).then((function(e){e.present()}))},e.prototype.submitSubmission=function(e,t,n){var i=this;if(e<0)return this.getSubmissions(),this.getSubmittedSubmissions(),setTimeout((function(){i.loader.dismiss(),i.alertCtrl.create({header:"Success",message:"Your timesheets have been submitted",buttons:[{text:"Dismiss",role:"cancel",handler:function(e){}}]}).then((function(e){e.present()}))}),1e3),void this.submissionService.sendWeeklyTimesheet(this.formatDatabase(this.currentWeek)).then((function(){}));this.loader.message="Submitting "+(n-e)+"/"+n+" timesheets. Please wait...",this.submissionService.createSubmission(this.submissions[e]).then((function(s){t.splice(e,1),i.submissionService.updateLocalSubmissions(t).then((function(){i.submitSubmission(e-1,t,n)})).catch((function(){i.submitSubmission(e-1,t,n)}))})).catch((function(){i.submitSubmission(e-1,t,n)}))},e.prototype.dateChanged=function(e){var t=this.appSettings.week_start?this.appSettings.week_start:"Monday",n=m(this.selectedDate).startOf("week").day(t),i=m(this.selectedDate);n.isAfter(i)&&n.subtract(1,"weeks"),this.currentWeek=m(n),this.selectedDate=this.currentWeek.toISOString(),this.setWeekdays(),this.setWeekdaySubmittedSubmissions(),this.setWeekdaySubmissions()},e.prototype.previousWeek=function(){this.currentWeek.subtract(1,"week"),this.selectedDate=this.currentWeek.toISOString(),this.setWeekdays(),this.setWeekdaySubmittedSubmissions(),this.setWeekdaySubmissions()},e.prototype.nextWeek=function(){this.currentWeek.add(1,"week"),this.selectedDate=this.currentWeek.toISOString(),this.setWeekdays(),this.setWeekdaySubmittedSubmissions(),this.setWeekdaySubmissions()},e.prototype.displayForward=function(e){var t=m().subtract(1,"week");return!this.currentWeek.isAfter(t)},e.prototype.isCurrentDate=function(e){return m(e).format("YYYY-MM-DD")===m().format("YYYY-MM-DD")},e.prototype.formatDate=function(e){return m(e).format("DD/MM/YYYY")},e.prototype.formatDatabase=function(e){return m(e).format("YYYY-MM-DD")},e.prototype.formatLongDate=function(e){return m(e).format("dddd Do MMM")},e.prototype.formatFromNow=function(e){return m(e).fromNow()},e.prototype.formatMinutes=function(e){var t=e/60,n=Math.floor(t),i=Math.round(60*(t-n)),s=1===n?"hour":"hours";return n<1&&i<1?"0 "+s:(n>0?n+" "+s+" ":"")+(i>0?i+" "+(1===i?"minute":"minutes"):"")},e.prototype.formatFromNowServer=function(e){var t=-(new Date).getTimezoneOffset();return m(e).add(t,"m").fromNow()},e.prototype.LightenDarkenColor=function(e,t){var n=!1;"#"==e[0]&&(e=e.slice(1),n=!0);var i=parseInt(e,16),s=(i>>16)+t;s>255?s=255:s<0&&(s=0);var l=(i>>8&255)+t;l>255?l=255:l<0&&(l=0);var o=(255&i)+t;return o>255?o=255:o<0&&(o=0),(n?"#":"")+(o|l<<8|s<<16).toString(16)},e}(),p=i.rb({encapsulation:0,styles:[[".timesheet-header[_ngcontent-%COMP%]   .timesheet-header__business[_ngcontent-%COMP%]{pointer-events:none;max-width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:15px}.timesheet-header[_ngcontent-%COMP%]   .timesheet-header__logo[_ngcontent-%COMP%]{height:30px}.timesheet[_ngcontent-%COMP%]   .timesheet__navigation[_ngcontent-%COMP%]{background-color:#efefef;display:-webkit-box;display:flex;padding:10px 15px;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}.timesheet[_ngcontent-%COMP%]   .timesheet__navigation[_ngcontent-%COMP%]   .timesheet__navigation__week[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1;text-align:center;cursor:pointer;margin-left:30px;margin-right:30px}.timesheet[_ngcontent-%COMP%]   .timesheet__navigation[_ngcontent-%COMP%]   .timesheet__navigation__arrow[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;cursor:pointer}.timesheet[_ngcontent-%COMP%]   .timesheet__navigation[_ngcontent-%COMP%]   .timesheet__navigation__arrow[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:20px}.timesheet[_ngcontent-%COMP%]   .timesheet__navigation[_ngcontent-%COMP%]   .timesheet__navigation__arrow.timesheet__navigation__arrow--disabled[_ngcontent-%COMP%]{opacity:0;pointer-events:none}.timesheet[_ngcontent-%COMP%]   .timesheet__datepicker[_ngcontent-%COMP%]{display:none!important}.timesheet[_ngcontent-%COMP%]   .timesheet__submission[_ngcontent-%COMP%]{text-align:Center;margin-top:15px}.timesheet[_ngcontent-%COMP%]   .timesheet__submission[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{min-width:140px;margin:10px 5px 0}.timesheet[_ngcontent-%COMP%]   .timesheet__timesheets[_ngcontent-%COMP%]{margin-top:30px;padding:0 15px;margin-bottom:30px}.timesheet[_ngcontent-%COMP%]   .timesheet__timesheets[_ngcontent-%COMP%]   .timesheet__timesheets__day[_ngcontent-%COMP%]{border:2px solid #f36500;position:relative;padding:10px;margin-top:15px;border-radius:5px;color:#f36500;-webkit-transition:opacity 150ms;transition:opacity 150ms ease;cursor:pointer}.timesheet[_ngcontent-%COMP%]   .timesheet__timesheets[_ngcontent-%COMP%]   .timesheet__timesheets__day.timesheet__timesheets__day--current[_ngcontent-%COMP%]{background-color:#f36500}.timesheet[_ngcontent-%COMP%]   .timesheet__timesheets[_ngcontent-%COMP%]   .timesheet__timesheets__day[_ngcontent-%COMP%]:focus, .timesheet[_ngcontent-%COMP%]   .timesheet__timesheets[_ngcontent-%COMP%]   .timesheet__timesheets__day[_ngcontent-%COMP%]:hover{opacity:.7}.timesheet[_ngcontent-%COMP%]   .timesheet__timesheets[_ngcontent-%COMP%]   .timesheet__timesheets__day[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{margin:0;text-align:Center}.timesheet[_ngcontent-%COMP%]   .timesheet__timesheets[_ngcontent-%COMP%]   .timesheet__timesheets__day[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{position:absolute;right:10px;top:calc(50% - 10px);font-size:20px}.timesheet[_ngcontent-%COMP%]   .timesheet__total-time[_ngcontent-%COMP%]{padding:0 15px;text-align:center;margin-bottom:30px}.timesheet[_ngcontent-%COMP%]   .timesheet__total-time[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{margin:0;font-weight:700}.timesheet[_ngcontent-%COMP%]   .timesheet__total-time[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{white-space:nowrap}.timesheet[_ngcontent-%COMP%]   .timesheet__total-time[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:12px}"]],data:{}});function _(e){return i.Lb(0,[(e()(),i.tb(0,0,null,null,1,"div",[["class","timesheet-header__business"],["slot","end"]],null,null,null,null,null)),(e()(),i.Kb(1,null,[" "," "]))],null,(function(e,t){e(t,1,0,t.component.appSettings.name)}))}function f(e){return i.Lb(0,[(e()(),i.tb(0,0,null,null,6,"div",[["class","timesheet__submission"]],null,null,null,null,null)),(e()(),i.tb(1,0,null,null,2,"ion-button",[["color","primary"]],null,[[null,"click"]],(function(e,t,n){var i=!0;return"click"===t&&(i=!1!==e.component.submitWeek()&&i),i}),o.y,o.c)),i.sb(2,49152,null,0,a.k,[i.h,i.k,i.z],{color:[0,"color"]},null),(e()(),i.Kb(-1,0,["Submit Week"])),(e()(),i.tb(4,0,null,null,2,"ion-button",[["color","primary"],["fill","outline"]],null,[[null,"click"]],(function(e,t,n){var i=!0;return"click"===t&&(i=!1!==e.component.resetWeek()&&i),i}),o.y,o.c)),i.sb(5,49152,null,0,a.k,[i.h,i.k,i.z],{color:[0,"color"],fill:[1,"fill"]},null),(e()(),i.Kb(-1,0,["Reset"]))],(function(e,t){e(t,2,0,"primary"),e(t,5,0,"primary","outline")}),null)}function k(e){return i.Lb(0,[(e()(),i.tb(0,0,null,null,1,"ion-icon",[["name","checkmark-circle"]],null,null,null,o.F,o.j)),i.sb(1,49152,null,0,a.C,[i.h,i.k,i.z],{name:[0,"name"]},null)],(function(e,t){e(t,1,0,"checkmark-circle")}),null)}function y(e){return i.Lb(0,[(e()(),i.tb(0,0,null,null,14,"div",[["class","timesheet__timesheets__day"],["routerDirection","forward"]],null,[[null,"click"]],(function(e,t,n){var s=!0;return"click"===t&&(s=!1!==i.Eb(e,7).onClick()&&s),"click"===t&&(s=!1!==i.Eb(e,10).onClick(n)&&s),s}),null,null)),i.Hb(512,null,u.r,u.s,[i.s,i.t,i.k,i.D]),i.sb(2,278528,null,0,u.h,[u.r],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),i.Gb(3,{"timesheet__timesheets__day--current":0}),i.Hb(512,null,u.t,u.u,[i.k,i.t,i.D]),i.sb(5,278528,null,0,u.m,[u.t],{ngStyle:[0,"ngStyle"]},null),i.Gb(6,{color:0,"background-color":1,"border-color":2}),i.sb(7,16384,null,0,r.n,[r.m,r.a,[8,null],i.D,i.k],{queryParams:[0,"queryParams"],routerLink:[1,"routerLink"]},null),i.Gb(8,{date:0}),i.Fb(9,1),i.sb(10,737280,null,0,a.Lb,[u.g,a.Ib,i.k,r.m,[2,r.n]],{routerDirection:[0,"routerDirection"]},null),(e()(),i.tb(11,0,null,null,1,"h6",[],null,null,null,null,null)),(e()(),i.Kb(12,null,["",""])),(e()(),i.ib(16777216,null,null,1,null,k)),i.sb(14,16384,null,0,u.j,[i.O,i.L],{ngIf:[0,"ngIf"]},null)],(function(e,t){var n=t.component,i=e(t,3,0,n.isCurrentDate(t.context.$implicit));e(t,2,0,"timesheet__timesheets__day",i);var s=e(t,6,0,n.isCurrentDate(t.context.$implicit)?"white":n.appSettings.color_scheme,n.isCurrentDate(t.context.$implicit)?n.appSettings.color_scheme:"",n.appSettings.color_scheme);e(t,5,0,s);var l=e(t,8,0,n.formatDatabase(t.context.$implicit)),o=e(t,9,0,n.weekdaySubmissions[n.formatDatabase(t.context.$implicit)]||n.weekdaySubmittedSubmissions[n.formatDatabase(t.context.$implicit)]?"/timesheet-date":"/add-timesheet");e(t,7,0,l,o),e(t,10,0,"forward"),e(t,14,0,n.weekdaySubmissions[n.formatDatabase(t.context.$implicit)]||n.weekdaySubmittedSubmissions[n.formatDatabase(t.context.$implicit)])}),(function(e,t){e(t,12,0,t.component.formatLongDate(t.context.$implicit))}))}function C(e){return i.Lb(0,[(e()(),i.tb(0,0,null,null,8,"ion-header",[["class","timesheet-header"]],null,null,null,o.E,o.i)),i.sb(1,49152,null,0,a.B,[i.h,i.k,i.z],null,null),(e()(),i.tb(2,0,null,0,6,"ion-toolbar",[["color","primary"]],null,null,null,o.R,o.v)),i.sb(3,49152,null,0,a.Cb,[i.h,i.k,i.z],{color:[0,"color"]},null),(e()(),i.tb(4,0,null,0,2,"ion-title",[],null,null,null,o.Q,o.u)),i.sb(5,49152,null,0,a.Ab,[i.h,i.k,i.z],null,null),(e()(),i.tb(6,0,null,0,0,"img",[["class","timesheet-header__logo"]],[[8,"src",4]],null,null,null,null)),(e()(),i.ib(16777216,null,0,1,null,_)),i.sb(8,16384,null,0,u.j,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(e()(),i.tb(9,0,null,null,32,"ion-content",[["class","timesheet"]],null,null,null,o.B,o.f)),i.sb(10,49152,null,0,a.u,[i.h,i.k,i.z],null,null),(e()(),i.tb(11,0,null,0,11,"div",[["class","timesheet__navigation"]],null,null,null,null,null)),(e()(),i.tb(12,0,null,null,2,"a",[["class","timesheet__navigation__arrow timesheet__navigation__arrow--left"]],null,[[null,"click"]],(function(e,t,n){var i=!0;return"click"===t&&(i=!1!==e.component.previousWeek()&&i),i}),null,null)),(e()(),i.tb(13,0,null,null,1,"ion-icon",[["name","ios-arrow-back"]],null,null,null,o.F,o.j)),i.sb(14,49152,null,0,a.C,[i.h,i.k,i.z],{name:[0,"name"]},null),(e()(),i.tb(15,0,null,null,1,"div",[["class","timesheet__navigation__week"]],null,[[null,"click"]],(function(e,t,n){var s=!0;return"click"===t&&(s=!1!==i.Eb(e,29).open()&&s),s}),null,null)),(e()(),i.Kb(16,null,["Week ",""])),(e()(),i.tb(17,0,null,null,5,"a",[["class","timesheet__navigation__arrow timesheet__navigation__arrow--right"]],null,[[null,"click"]],(function(e,t,n){var i=!0;return"click"===t&&(i=!1!==e.component.nextWeek()&&i),i}),null,null)),i.Hb(512,null,u.r,u.s,[i.s,i.t,i.k,i.D]),i.sb(19,278528,null,0,u.h,[u.r],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),i.Gb(20,{"timesheet__navigation__arrow--disabled":0}),(e()(),i.tb(21,0,null,null,1,"ion-icon",[["name","ios-arrow-forward"]],null,null,null,o.F,o.j)),i.sb(22,49152,null,0,a.C,[i.h,i.k,i.z],{name:[0,"name"]},null),(e()(),i.tb(23,0,null,0,6,"ion-datetime",[["class","timesheet__datepicker"],["displayFormat","DD MMM, YYYY"],["hidden","true"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionChange"],[null,"ngModelChange"],[null,"ionBlur"]],(function(e,t,n){var s=!0,l=e.component;return"ionBlur"===t&&(s=!1!==i.Eb(e,24)._handleBlurEvent(n.target)&&s),"ionChange"===t&&(s=!1!==i.Eb(e,24)._handleChangeEvent(n.target)&&s),"ionChange"===t&&(s=!1!==l.dateChanged(n)&&s),"ngModelChange"===t&&(s=!1!==(l.selectedDate=n)&&s),s}),o.C,o.g)),i.sb(24,16384,null,0,a.Mb,[i.k],null,null),i.Hb(1024,null,c.c,(function(e){return[e]}),[a.Mb]),i.sb(26,671744,null,0,c.h,[[8,null],[8,null],[8,null],[6,c.c]],{model:[0,"model"]},{update:"ngModelChange"}),i.Hb(2048,null,c.d,null,[c.h]),i.sb(28,16384,null,0,c.e,[[4,c.d]],null,null),i.sb(29,49152,[["datePicker",4]],0,a.v,[i.h,i.k,i.z],{displayFormat:[0,"displayFormat"],max:[1,"max"]},null),(e()(),i.ib(16777216,null,0,1,null,f)),i.sb(31,16384,null,0,u.j,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(e()(),i.tb(32,0,null,0,2,"div",[["class","timesheet__timesheets"]],null,null,null,null,null)),(e()(),i.ib(16777216,null,null,1,null,y)),i.sb(34,278528,null,0,u.i,[i.O,i.L,i.s],{ngForOf:[0,"ngForOf"]},null),(e()(),i.tb(35,0,null,0,6,"div",[["class","timesheet__total-time"]],null,null,null,null,null)),(e()(),i.tb(36,0,null,null,3,"h6",[],null,null,null,null,null)),(e()(),i.Kb(-1,null,["Total work time is "])),(e()(),i.tb(38,0,null,null,1,"span",[],null,null,null,null,null)),(e()(),i.Kb(39,null,["",""])),(e()(),i.tb(40,0,null,null,1,"span",[],null,null,null,null,null)),(e()(),i.Kb(41,null,[""," minute daily breaks"]))],(function(e,t){var n=t.component;e(t,3,0,"primary"),e(t,8,0,n.appSettings.name),e(t,14,0,"ios-arrow-back");var i=e(t,20,0,!n.displayForward(n.currentWeek));e(t,19,0,"timesheet__navigation__arrow timesheet__navigation__arrow--right",i),e(t,22,0,"ios-arrow-forward"),e(t,26,0,n.selectedDate),e(t,29,0,"DD MMM, YYYY",n.maxSelectableDate),e(t,31,0,n.pendingSubmissions>0),e(t,34,0,n.weekdays)}),(function(e,t){var n=t.component;e(t,6,0,n.appSettings.logo?n.appSettings.logo:"/assets/logo-light.png"),e(t,16,0,n.formatDate(n.currentWeek)),e(t,23,0,i.Eb(t,28).ngClassUntouched,i.Eb(t,28).ngClassTouched,i.Eb(t,28).ngClassPristine,i.Eb(t,28).ngClassDirty,i.Eb(t,28).ngClassValid,i.Eb(t,28).ngClassInvalid,i.Eb(t,28).ngClassPending),e(t,39,0,n.formatMinutes(n.totalWorkTime)),e(t,41,0,n.breakTime)}))}function S(e){return i.Lb(0,[(e()(),i.tb(0,0,null,null,1,"app-timesheet",[],null,null,null,C,p)),i.sb(1,114688,null,0,g,[h.a,b.a,i.z,a.Gb,a.a,a.Jb,d.a],null,null)],(function(e,t){e(t,1,0)}),null)}var v=i.pb("app-timesheet",g,S,{},{},[]),w=function(){return function(){}}();n.d(t,"TimesheetPageModuleNgFactory",(function(){return M}));var M=i.qb(s,[],(function(e){return i.Bb([i.Cb(512,i.j,i.bb,[[8,[l.a,v]],[3,i.j],i.x]),i.Cb(4608,u.l,u.k,[i.u,[2,u.w]]),i.Cb(4608,c.j,c.j,[]),i.Cb(4608,a.b,a.b,[i.z,i.g]),i.Cb(4608,a.Hb,a.Hb,[a.b,i.j,i.q]),i.Cb(4608,a.Kb,a.Kb,[a.b,i.j,i.q]),i.Cb(1073742336,u.b,u.b,[]),i.Cb(1073742336,c.i,c.i,[]),i.Cb(1073742336,c.b,c.b,[]),i.Cb(1073742336,a.Eb,a.Eb,[]),i.Cb(1073742336,r.p,r.p,[[2,r.u],[2,r.m]]),i.Cb(1073742336,w,w,[]),i.Cb(1073742336,s,s,[]),i.Cb(1024,r.k,(function(){return[[{path:"",component:g}]]}),[])])}))}}]);