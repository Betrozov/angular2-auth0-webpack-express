import {Component, OnInit} from 'angular2/core';

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
