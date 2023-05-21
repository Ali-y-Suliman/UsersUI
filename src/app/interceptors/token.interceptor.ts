import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    try {
      const myToken = this.auth.getToken();
      const hasAuth = !!request.headers.get('Authorization');
      if (myToken && !hasAuth) {
        const authReq = request.clone({
          setHeaders: { Authorization: `Bearer ${myToken}` },
        });
        return next.handle(authReq);
      } else {
        return next.handle(request);
      }
    } catch (error) {
      console.log(error);
      return next.handle(request);
    }
  }
}
