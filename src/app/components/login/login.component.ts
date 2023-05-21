import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { validateAllFormFileds } from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  userObject: any;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    const myToken = this.auth.getToken();
    if (!!myToken) {
      this.router.navigate(['dashboard']);
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  hideShowPass = () => {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password'
  }

  onLogIn = async () => {
    if (this.loginForm.valid) {
      //send obj
      const res = await this.auth.login(this.loginForm.value);
      this.loginForm.reset();
      if (!!res) {
        this.router.navigate(['dashboard']);
      }
      this.auth.storeToken(res.data.token, res.data.email);

    } else {
      //error using poster and requierd fields
      validateAllFormFileds(this.loginForm);
      this.toaster.warning('Your Form is invalid');
    }
  }

}
