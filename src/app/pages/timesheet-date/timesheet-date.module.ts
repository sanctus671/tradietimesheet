import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimesheetDatePageRoutingModule } from './timesheet-date-routing.module';

import { TimesheetDatePage } from './timesheet-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimesheetDatePageRoutingModule
  ],
  declarations: [TimesheetDatePage]
})
export class TimesheetDatePageModule {}
