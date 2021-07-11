import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: FirebaseService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        request = request.clone({
          setHeaders: {
            token: `${this.authService.token}`
          }
        });
        
        return next.handle(request);
      }
}