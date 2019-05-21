import { Component } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  lottieConfig: any;
  constructor() {
    LottieAnimationViewModule.forRoot();
    this.lottieConfig = {
      path: 'assets/success-animation.json',
      autoplay: true,
      loop: true
    };
  }
}
