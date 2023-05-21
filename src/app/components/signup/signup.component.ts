import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { validateAllFormFileds } from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    const myToken = this.auth.getToken();
    if (!!myToken) {
      this.router.navigate(['dashboard']);
    }
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmedPassword: ['', Validators.required],
    });

  }

  hideShowPass = () => {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password'
  }

  onSignUp = async () => {
    if (this.signUpForm.valid) {
      //send obj
      const res = await this.auth.signUp(this.signUpForm.value)
      this.signUpForm.reset();
      if (res)
        this.router.navigate(['login'])
    } else {
      //error using poster and requierd fields
      validateAllFormFileds(this.signUpForm);
      this.toaster.warning('Your Form is invalid');
    }
  }
}
