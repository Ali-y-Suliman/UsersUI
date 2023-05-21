import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should validate the form', () => {
    const form = component.loginForm;
    form.controls['email'].setValue('testuser@gmail.com');
    form.controls['password'].setValue('testpassword');
    expect(form.valid).toBeTruthy();
  });

  it('Reactive Form Validation - Email Required & Password check', () => {
    const form = component.loginForm;
    form.controls['email'].setValue('');
    form.controls['password'].setValue('testpassword');
    expect(form.valid).toBeFalsy();
    expect(form.controls['email'].hasError('required')).toBeTruthy();
  });

  it('Reactive Form Validation - Email Format validation & Password check', () => {
    const form = component.loginForm;
    form.controls['email'].setValue('testuser');
    form.controls['password'].setValue('testpassword');
    expect(form.valid).toBeFalsy();
    expect(form.controls['email'].hasError('email')).toBeTruthy();
  });

  it('Reactive Form Validation - Empty Form check', () => {
    const form = component.loginForm;
    form.controls['email'].setValue('');
    form.controls['password'].setValue('');
    expect(form.valid).toBeFalsy();
    expect(form.controls['email'].hasError('required')).toBeTruthy();
    expect(form.controls['password'].hasError('required')).toBeTruthy();
  });
});
