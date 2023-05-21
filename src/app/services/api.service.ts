import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:5262/api/Users/user'
  constructor(private http : HttpClient, private toaster: ToastrService) { }

  getUser = async ( email: string ) => {
    const url = `${this.baseUrl}`;
    const res =  await (this.http.get<any>(`${url}?email=${email}`).toPromise().catch(e => {
      console.error(e)
      this.toaster.warning( e );
    }));
    if (!!res)
    this.toaster.success( res.message );
     return res; 
  }
}
