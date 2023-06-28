import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTimesheetPageRoutingModule } from './add-timesheet-routing.module';

import { AddTimesheetPage } from './add-timesheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTimesheetPageRoutingModule
  ],
  declarations: [AddTimesheetPage]
})
export class AddTimesheetPageModule {}
