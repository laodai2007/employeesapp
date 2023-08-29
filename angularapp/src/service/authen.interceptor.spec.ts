import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './authen.interceptor';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an Authorization header with the token', inject(
    [HttpClient],
    (client: HttpClient) => {
      const expectedToken = 'RANDOM_TOKEN';
      client.get('/api/data').subscribe();

      const httpRequest = httpMock.expectOne('/api/data');
      expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
      expect(httpRequest.request.headers.get('Authorization')).toBe(
        `Bearer ${expectedToken}`
      );
    }
  ));
});
