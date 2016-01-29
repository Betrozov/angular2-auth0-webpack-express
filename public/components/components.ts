import {Component, View} from 'angular2/core';
import {RouteConfig} from 'angular2/router';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {LoginComponent} from './login/login';
import {TodoComponent} from './todo/todo';

@Component({
  selector: 'app'
})

@View({
  template: `
    <div id="main">
      <router-outlet></router-outlet>
    </div>`,
  directives: [LoggedInRouterOutlet]
})

@RouteConfig([
  {path: '/', redirectTo: ['/Todo']},
  {path: '/todo', component: TodoComponent, name: 'Todo'},
  {path: '/login', component: LoginComponent, name: 'Login'},
  {path: '/**', redirectTo: ['/Todo']}
])

export class App {
}
