import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTimesheetPage } from './edit-timesheet.page';

const routes: Routes = [
  {
    path: '',
    component: EditTimesheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTimesheetPageRoutingModule {}
