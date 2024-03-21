import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/lib/services/login/login.service';
import { AppFacade } from 'src/app/+state/app.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private loginService:LoginService,
    private router:Router,
    readonly appFacade:AppFacade
  ){

  }
  closeSession():void {
    this.loginService.deletedToken();
    this.appFacade.setTokenSession('');
    this.router.navigate(["/login"]);
  }
}
