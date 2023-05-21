import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:5262/api/Users/user';
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  getUser = async (email: string) => {
    const url = `${this.baseUrl}`;
    const res = await this.http
      .get<any>(`${url}?email=${email}`)
      .toPromise()
      .catch((e) => {
        if (e.status == 401) {
          this.auth.resetToken();
          this.router.navigate(['login']);
        }
        console.error(e);
        this.toaster.warning(e.statusText);
      });
    if (!!res) this.toaster.success(res.message);
    return res;
  };
}
