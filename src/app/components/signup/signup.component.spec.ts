import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
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
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should validate the signUp form', () => {
    const form = component.signUpForm;
    form.controls['firstName'].setValue('Ali');
    form.controls['lastName'].setValue('Suliman');
    form.controls['email'].setValue('testuser@gmail.com');
    form.controls['password'].setValue('testpassword');
    form.controls['confirmedPassword'].setValue('testpassword');
    expect(form.valid).toBeTruthy();
  });

  it('Reactive Form Validation - firstName Required', () => {
    const form = component.signUpForm;
    form.controls['firstName'].setValue('');
    form.controls['lastName'].setValue('Suliman');
    form.controls['email'].setValue('testuser@gmail.com');
    form.controls['password'].setValue('testpassword');
    form.controls['confirmedPassword'].setValue('testpassword');
    expect(form.valid).toBeFalsy();
    expect(form.controls['firstName'].hasError('required')).toBeTruthy();
  });

  it('Reactive Form Validation - lastName Required', () => {
    const form = component.signUpForm;
    form.controls['firstName'].setValue('Ali');
    form.controls['lastName'].setValue('');
    form.controls['email'].setValue('testuser@gmail.com');
    form.controls['password'].setValue('testpassword');
    form.controls['confirmedPassword'].setValue('testpassword');
    expect(form.valid).toBeFalsy();
    expect(form.controls['lastName'].hasError('required')).toBeTruthy();
  });

  it('Reactive Form Validation - email Required', () => {
    const form = component.signUpForm;
    form.controls['firstName'].setValue('Ali');
    form.controls['lastName'].setValue('Suliman');
    form.controls['email'].setValue('');
    form.controls['password'].setValue('testpassword');
    form.controls['confirmedPassword'].setValue('testpassword');
    expect(form.valid).toBeFalsy();
    expect(form.controls['email'].hasError('required')).toBeTruthy();
  });

  it('Reactive Form Validation - password Required', () => {
    const form = component.signUpForm;
    form.controls['firstName'].setValue('Ali');
    form.controls['lastName'].setValue('Suliman');
    form.controls['email'].setValue('testuser@gmail.com');
    form.controls['password'].setValue('');
    form.controls['confirmedPassword'].setValue('testpassword');
    expect(form.valid).toBeFalsy();
    expect(form.controls['password'].hasError('required')).toBeTruthy();
  });

  it('Reactive Form Validation - confirmedPassword Required', () => {
    const form = component.signUpForm;
    form.controls['firstName'].setValue('Ali');
    form.controls['lastName'].setValue('Suliman');
    form.controls['email'].setValue('testuser@gmail.com');
    form.controls['password'].setValue('testpassword');
    form.controls['confirmedPassword'].setValue('');
    expect(form.valid).toBeFalsy();
    expect(
      form.controls['confirmedPassword'].hasError('required')
    ).toBeTruthy();
  });

  it('Reactive Form Validation - Email Format validation', () => {
    const form = component.signUpForm;
    form.controls['firstName'].setValue('Ali');
    form.controls['lastName'].setValue('Suliman');
    form.controls['email'].setValue('testuser');
    form.controls['password'].setValue('testpassword');
    form.controls['confirmedPassword'].setValue('testpassword');
    expect(form.valid).toBeFalsy();
    expect(form.controls['email'].hasError('email')).toBeTruthy();
  });

  it('Reactive Form Validation - Short Password validation', () => {
    const form = component.signUpForm;
    form.controls['firstName'].setValue('Ali');
    form.controls['lastName'].setValue('Suliman');
    form.controls['email'].setValue('testuser');
    form.controls['password'].setValue('test');
    form.controls['confirmedPassword'].setValue('test');
    expect(form.valid).toBeFalsy();
    expect(form.controls['password'].hasError('minlength')).toBeTruthy();
  });
});
