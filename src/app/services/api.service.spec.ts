import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
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
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Get User data service test', inject(
    [HttpTestingController],
    async (httpClient: HttpTestingController) => {
      const email = 'test@gmail.com';
      const mockResponse = {
        data: {
          firstName: 'Test',
          lastName: 'test',
          email: 'test@gmail.com',
          token: '123456',
        },
        message: 'User Fetched Successfully',
        success: true,
        statusCode: 200,
      };
      const promise = service.getUser(email);

      const req = httpClient.expectOne(
        `http://localhost:5262/api/Users/user?email=${email}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const response = await promise;

      expect(response).toEqual(mockResponse);
    }
  ));
});
