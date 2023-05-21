import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:5262/api/Users/';
  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private router: Router
  ) {}

  signUp = async (userObj: any) => {
    const url = `${this.baseUrl}register`;
    const res = await this.http
      .post<any>(url, userObj)
      .toPromise()
      .catch((e) => {
        console.error(e.error.message);
        this.toaster.warning(e.error.message);
      });

    if (!!res) this.toaster.success(res.message);
    return res;
  };

  login = async (loginObg: any) => {
    const url = `${this.baseUrl}signIn`;
    const res = await this.http
      .post<any>(url, loginObg)
      .toPromise()
      .catch((e) => {
        console.error(e.error.message);
        this.toaster.warning(e.error.message);
      });
    if (!!res) this.toaster.success(res.message);
    return res;
  };

  signOut = () => {
    localStorage.clear();
    this.router.navigate(['login']);
  };

  storeToken = (tokenValue: string, email: string) => {
    localStorage.setItem('token', tokenValue);
    localStorage.setItem('email', email);
  };

  resetToken = () => {
    localStorage.clear();
  };

  getToken = () => {
    return localStorage.getItem('token');
  };

  getEmail = () => {
    return localStorage.getItem('email');
  };

  isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };
}
