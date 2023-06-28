import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetDatePage } from './timesheet-date.page';

const routes: Routes = [
  {
    path: '',
    component: TimesheetDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimesheetDatePageRoutingModule {}
