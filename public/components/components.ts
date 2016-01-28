import {Component, View} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {LoginComponent} from './login/login';
import {TodoComponent} from './todo/todo.component';

@Component({
  selector: 'app',
  template: `
    <div id="main">
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES, LoggedInRouterOutlet]
})

@RouteConfig([
  {path: '/', redirectTo: ['/Todo']},
  {path: '/todo', component: TodoComponent, name: 'Todo'},
  {path: '/login', component: LoginComponent, name: 'Login'},
  {path: '/**', redirectTo: ['/Todo']}
])

export class App {
}
