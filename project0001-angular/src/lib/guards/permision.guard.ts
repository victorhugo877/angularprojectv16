import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { AppFacade } from 'src/app/+state/app.facade'
import { nonEmptyString, emptyString } from 'check-types';

@Injectable({
  providedIn: 'root',
})

export class permisionGuard implements CanActivate {
  token:string = '';
  constructor(
    private router: Router,
    private loginService: LoginService,
    readonly appFacade:AppFacade
  ) { 
    this.appFacade.tokenSession$
    .subscribe((token:string) => {
      if(nonEmptyString(token)){
        this.token = token
      }
    });
  }

  async canActivate(
    route: ActivatedRouteSnapshot
  ) {
   
    //const token = await this.loginService.getToken():
    const token = this.token;
    if (emptyString(token)) {
      return this.router.parseUrl('/login');
    }

    return true;
  }
};
