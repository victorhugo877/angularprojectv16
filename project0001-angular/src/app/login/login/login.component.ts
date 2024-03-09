import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Alert } from 'src/lib/models/alert.model';
import { LoginService } from 'src/lib/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin!: FormGroup;
  samePasswords:boolean = false;
  alertShow:boolean = false;
  alertView:Alert = {
    type: "Sucess",
    message: "Usuarios registrado de manera Exitosa!!"
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private loginService:LoginService
  ){
    this.initialForm();
  }

  ngOnInit() {
    
  }


  initialForm():void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(20),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(8)
      ]),
    });
  }

  save():void {
    this.formLogin.markAllAsTouched();
    const userRegister = { email: this.formLogin?.value?.email, password: this.formLogin?.value?.password };
    this.loginService.login(userRegister)
    .pipe(
      catchError((e) => {
        this.alertShow=true;
        this.alertView = {
          type: 'danger',
		      message: 'Ha ocurrido un error intente de nuevo',
        }
        throw e;
      })
    )
    .subscribe((response:any) => {
      this.alertShow=true;
      this.alertView = {
        type: 'success',
        message: "Bienvenido Usuario Logueado de manera Exitosa!!"
      }
      this.loginService.setToken(response?.token);
      this.welcome();
    })
  }


  close():void {
    this.alertShow=false;
  }

  welcome():void {
    this.router.navigate(["/todo"]);
  }
}
