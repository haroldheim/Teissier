import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router, private _snackBar: MatSnackBar) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token,
                },
            });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json',
                },
            });
        }
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json'),
        });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.openSnackBar(error.statusText);

                if (error.status === 401) {
                    this.router.navigate(['login']);
                }
                if (error.status === 400) {
                    alert(error.error);
                }
                return throwError(error);
            }),
        );
    }

    openSnackBar(message: string) {
        this._snackBar.open(message);
    }
}
