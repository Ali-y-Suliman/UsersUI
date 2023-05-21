import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : AuthService, private router: Router, private toaster: ToastrService){}
  canActivate(): boolean {
    if(this.auth.isLoggedIn()){
      return true;
    }
    this.toaster.warning('Please login first')
    this.router.navigate(['login']);
    return false;
  }
  
}
