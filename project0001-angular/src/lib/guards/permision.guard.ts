import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})

export class permisionGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot
  ) {
   
    const token = await this.loginService.getToken()
    if (!token) {
      return this.router.parseUrl('/login');
    }

    return true;
  }
};
