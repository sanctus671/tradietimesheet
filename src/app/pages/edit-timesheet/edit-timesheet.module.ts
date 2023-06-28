import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTimesheetPageRoutingModule } from './edit-timesheet-routing.module';

import { EditTimesheetPage } from './edit-timesheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTimesheetPageRoutingModule
  ],
  declarations: [EditTimesheetPage]
})
export class EditTimesheetPageModule {}
