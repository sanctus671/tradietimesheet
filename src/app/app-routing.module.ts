import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './services/authentication/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuardService]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' }, 
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'submissions',
    loadChildren: () => import('./pages/submissions/submissions.module').then( m => m.SubmissionsPageModule)
  },
  {
    path: 'submission/:id',
    loadChildren: () => import('./pages/submission/submission.module').then( m => m.SubmissionPageModule)
  },
  {
    path: 'timesheet',
    loadChildren: () => import('./pages/timesheet/timesheet.module').then( m => m.TimesheetPageModule)
  },
  {
    path: 'add-timesheet',
    loadChildren: () => import('./pages/add-timesheet/add-timesheet.module').then( m => m.AddTimesheetPageModule)
  },
  {
    path: 'edit-timesheet',
    loadChildren: () => import('./pages/edit-timesheet/edit-timesheet.module').then( m => m.EditTimesheetPageModule)
  },
  {
    path: 'timesheet-date',
    loadChildren: () => import('./pages/timesheet-date/timesheet-date.module').then( m => m.TimesheetDatePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
