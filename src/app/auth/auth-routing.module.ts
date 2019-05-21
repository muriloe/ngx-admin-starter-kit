import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';

import { AuthGuard } from '../auth-guard.service';
import { NgxLoginComponent } from '../pages/login/login.component';

export const routes: Routes = [
    { path: 'pages', canActivate: [AuthGuard], loadChildren: 'app/pages/pages.module#PagesModule' },
    {
      path: '',
      component: NbAuthComponent, 
      children: [
        {
          path: 'login',
          component: NgxLoginComponent, 
        },
      ], 
    },
  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
} 