import {Component, OnInit} from 'angular2/core';
import {RouteConfig, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'login',
  template: ''
})

export class LoginComponent implements OnInit {
  private lock = new Auth0Lock('8E1rg0xX8k5SLytPvhz7k2EgHhdJ9HpO', 'rohomi97.eu.auth0.com');

  constructor() {
  }

  ngOnInit() {
    this.lock.show({
      callbackURL: 'http://localhost:8080/callback',
      responseType: 'code',
      authParams: {
        scope: 'openid profile'
      }
    });
  }
}
