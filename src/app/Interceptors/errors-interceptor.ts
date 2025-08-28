import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        let errorMessage = 'An unknown error occurred!';

        if (error.error.code === 422) {
          errorMessage = 'New signups are currently disabled!';
          //the condition is for when the app is on github and rls policies for this purpose are removed
        } else if (error.status === 403) {
          errorMessage = 'Feature currently disabled as this page is used for demonstration purposes!';
          //the condition is for when the app is on github and rls policies for this purpose are removed
        } else if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error ${error.status}: ${error.message}`;
        }

        alert(errorMessage);

        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
