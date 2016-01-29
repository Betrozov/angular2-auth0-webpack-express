import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {Http} from 'angular2/http';
import {contentHeaders} from '../common/headers';

@Directive({
  selector: 'router-outlet'
})

export class LoggedInRouterOutlet extends RouterOutlet {
  private parentRouter:Router;
  private http:Http;

  constructor(_elementRef:ElementRef, _loader:DynamicComponentLoader,
              _parentRouter:Router, @Attribute('name') nameAttr:string, _http:Http) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.http = _http;
  }

  isLogged(cb):any {
    this.http
      .get('/isLogged', {headers: contentHeaders})
      .map(res => res.json())
      .subscribe(
        response => {
          return cb(null, response.data);
        },
        error => {
          console.log(error);
        }
      );
  }

  activate(instruction:ComponentInstruction) {
    return this.isLogged((err, data) => {
      if (!data) {
        this.parentRouter.navigateByUrl('/login');
      }

      return super.activate(instruction);
    });
  }
}
