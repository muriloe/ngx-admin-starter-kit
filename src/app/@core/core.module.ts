import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  NbAuthModule,
  NbDummyAuthStrategy,
  NbPasswordAuthStrategy,
  NbAuthJWTToken
} from '@nebular/auth';
import {
  NbSecurityModule,
  NbRoleProvider
} from '@nebular/security';
import {
  of as observableOf
} from 'rxjs';

import {
  throwIfAlreadyLoaded
} from './module-import-guard';
import {
  AnalyticsService,
  StateService,
} from './utils';
import {
  UserData
} from './data/users';
import {
  UserService
} from './mock/users.service';
import {
  MockDataModule
} from './mock/mock-data.module';
import {
  ServerInfo
} from '../../app/shared/endpoint';

var endPoint = ServerInfo.getServerName();

const socialLinks = [{
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

const DATA_SERVICES = [{
  provide: UserData,
  useClass: UserService
}, ];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: endPoint,
        login: {
          endpoint: '/api/user/login', //Configure your endpoint to login
          method: 'post',
        },
        register: {
          endpoint: '/api/user/login/register',
          method: 'post',
        },
        token: {
          class: NbAuthJWTToken,
          key: 'jwt', // this parameter tells where to look for the token
        },
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders > {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
