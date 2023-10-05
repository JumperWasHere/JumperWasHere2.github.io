import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public API_URL = environment.API_URL;
  private isAuthenticated = 'false';
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient,private router:Router) { }
  
  login(username:string, password:string) {
    return this.http.post<any>(`${this.API_URL}/account/login`,
      {
        username,
        password
      }
    )
  }
  logout(){
    this.isAuthenticated = 'false';
    localStorage.removeItem('token');
    localStorage.removeItem('IsAuth');
    this.router.navigate(['login']);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }
  getToken() {
    return localStorage.getItem('token');
  }
  setIsAuth(value:string){
    localStorage.setItem('IsAuth', value);
    this.isAuthenticated = value;

  }
  getIsAuth() {
    return localStorage.getItem('IsAuth');
  }
}
