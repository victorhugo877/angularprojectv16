import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Register } from 'src/lib/models/register.model';
import { CookieService } from "ngx-cookie-service";
import { Login } from 'src/lib/models/login.model';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiEnv = environment;

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  register(userRegister: Register): Observable<any> {
    return this.http.post(`${this.apiEnv.loginApi}/register`, userRegister);
  }

  login(userLogin: Login): Observable<any> {
    return this.http.post(`${this.apiEnv.loginApi}/login`, userLogin);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken(): string {
    return this.cookies.get("token");
  }

  deletedToken() {
    this.cookies.delete("token");
  }
  getUSers(){
    return this.http.get(`${this.apiEnv.loginApi}/users?page=1`);
  }
}
