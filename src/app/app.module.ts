/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { NbAuthJWTToken,  } from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { RoleProvider } from './auth/role.provider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbSecurityModule.forRoot({
      accessControl: {
        'ADMIN-NORMAL': {
          view: ['dashboard'],
          create: ['dashboard'],
        },
        'ADMIN-GOD': {
          parent: 'ADMIN-NORMAL',
          remove: 'dashboard',
        }
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    [ AuthGuard ],
    { provide: NbRoleProvider, useClass: RoleProvider }
  ],
})
export class AppModule {
}
