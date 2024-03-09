import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Alert } from 'src/lib/models/alert.model';
import { LoginService } from 'src/lib/services/login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  formRegister!: FormGroup;
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

  ngAfterViewInit(): void {
    this.formRegister.valueChanges.subscribe((p) => {
      if(this.formRegister.get('confirmedPassword')?.dirty){
        this.samePasswords = p.password === p.confirmedPassword ? true : false;
      }
      this.changeDetector.markForCheck();
    })
  }

  initialForm():void {
    this.formRegister = new FormGroup({
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
      confirmedPassword: new FormControl('', [
        Validators.required,
        Validators.min(8)
      ])
    });
  }

  save():void {
    this.formRegister.markAllAsTouched();
    const userRegister = { email: this.formRegister?.value?.email, password: this.formRegister?.value?.password };
    this.loginService.register(userRegister)
    .pipe(
      catchError((e) => {
        this.alertShow=true;
        this.alertView = {
          type: 'danger',
		      message: 'Ha ocurrido un error en el registro',
        }
        throw e;
      })
    )
    .subscribe((r) => {
      this.alertShow=true;
      this.alertView = {
        type: 'success',
        message: "Usuarios registrado de manera Exitosa!!"
      }
      this.toLogin();
    })
  }

  toLogin():void {
    this.router.navigate(["/login"]);
  }

  close():void {
    this.alertShow=false;
  }
}
