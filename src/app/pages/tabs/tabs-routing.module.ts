import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'timesheet',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../timesheet/timesheet.module').then(m => m.TimesheetPageModule)
          }
        ]
      },
      {
        path: 'submissions',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../submissions/submissions.module').then(m => m.SubmissionsPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      } ,
      {
        path: '',
        redirectTo: '/tabs/timesheet',
        pathMatch: 'full'
      },     
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/timesheet',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
