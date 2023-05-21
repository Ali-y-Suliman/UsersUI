import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(private auth : AuthService, private apiService : ApiService) { }

  async ngOnInit(): Promise<void> {
    const email = this.auth.getEmail();
    if(!!email){
      this.user = await this.apiService.getUser(email);
    }
  }

  logout = () => {
    this.auth.signOut();
  }


}
