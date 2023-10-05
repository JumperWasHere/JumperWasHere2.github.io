import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  userRole: string;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log('canActivate');

    const isAuth = this.authService.getIsAuth();    
    if (isAuth === 'true') {
      return true;
    } else {
      return this.router.navigate(['login']);
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log('canActivateChild');

      const isAuth = this.authService.getIsAuth();
      if (isAuth) {
        return true;
      } else {
        return this.router.navigate(['login']);
      }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log('load');
      const isAuth = this.authService.getIsAuth();
      if (isAuth) {
        return true;
      } else {
        return this.router.navigate(['login']);
      }
  }
}
