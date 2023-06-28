import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTimesheetPage } from './add-timesheet.page';

const routes: Routes = [
  {
    path: '',
    component: AddTimesheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTimesheetPageRoutingModule {}
