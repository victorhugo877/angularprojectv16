import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Register } from 'src/lib/models/register.model';
import { CookieService } from "ngx-cookie-service";
import { Login } from 'src/lib/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  register(userRegister: Register): Observable<any> {
    return this.http.post("https://reqres.in/api/register", userRegister);
  }

  login(userLogin: Login): Observable<any> {
    return this.http.post("https://reqres.in/api/login", userLogin);
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
}
