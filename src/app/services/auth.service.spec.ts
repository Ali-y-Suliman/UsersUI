import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Signin service test', inject(
    [HttpTestingController],
    async (httpClient: HttpTestingController) => {
      const user = { email: 'test@gmail.com', password: '12345678' };
      const mockResponse = {
        data: {
          firstName: 'Test',
          lastName: 'test',
          email: 'test@gmail.com',
          token: '123456',
        },
        message: 'SignedIn Successfully',
        success: true,
        statusCode: 200,
      };
      const promise = service.login(user);

      const req = httpClient.expectOne(
        'http://localhost:5262/api/Users/signIn'
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);

      const response = await promise;

      expect(response).toEqual(mockResponse);
    }
  ));

  it('SignUp service test', inject(
    [HttpTestingController],
    async (httpClient: HttpTestingController) => {
      const user = {
        firstName: 'Test',
        lastName: 'test',
        email: 'test@gmail.com',
        password: '12345678',
        confirmedPassword: '12345678',
      };
      const mockResponse = {
        data: {
          firstName: 'Test',
          lastName: 'test',
          email: 'test@gmail.com',
          token: '',
        },
        message: 'Registered Successfully, please logIn',
        success: true,
        statusCode: 200,
      };
      const promise = service.signUp(user);

      const req = httpClient.expectOne(
        'http://localhost:5262/api/Users/register'
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);

      const response = await promise;

      expect(response).toEqual(mockResponse);
    }
  ));
});
