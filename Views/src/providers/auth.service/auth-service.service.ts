import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public api: ApiService ) { }

  signIn(params?: any) {
    //debugger;
    return this.api.post('user/login', params);
  }

  public isLoggedIn(){
    return localStorage.getItem('access_token') !== null;
  }

  public logout(){
    localStorage.removeItem('access_token');
  }

  public getToken(): string {
     return localStorage.getItem('access_token') || '' ;
  }

  public getUserName(): string {
     return localStorage.getItem('loggedUserUsername') || '';
  }

  public getUserId(): string {
    return localStorage.getItem('loggedUserId') || '';
  }

  public getLoggedInUser(): string {
    return localStorage.getItem('loggedUser') || '';
  }
}
