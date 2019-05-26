import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router) {}
  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(     
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
          const auth = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
            if(token.getPayload().access == "ADMIN-GOD" || token.getPayload().access == "ADMIN-NORMAL"){
              //TODO  
            }else{
              this.router.navigate(['auth/login']); //TODO: send to error page
            }
        });
        }),
      );
  }
}