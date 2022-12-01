import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService } from '../providers/auth.service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(public auth: AuthServiceService, public router: Router) { }

  canActivate(): boolean {
    console.log(0)
    if (!this.auth.isLoggedIn()) {
      console.log(1)
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
