import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthServiceService} from '../providers/auth.service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private auth: AuthServiceService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Calling Interceptor');
    console.log("token : ",this.auth.getToken())
    const authToken = this.auth.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken
      }
    });
    return next.handle(request);
  }
}
