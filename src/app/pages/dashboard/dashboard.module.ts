import { NgModule } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    LottieAnimationViewModule,
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
