import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {AuthenticationService} from './authentication.service'
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,private authenticationService:AuthenticationService) { }

  public API_URL = environment.API_URL;

  getcart(){
    let token = this.authenticationService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set Bearer token in Authorization header
    });
    return this.http.get<any>(`${this.API_URL}/dashboard`,
    {headers}
  )
  }
}
