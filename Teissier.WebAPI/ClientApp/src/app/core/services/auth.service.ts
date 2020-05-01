import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authUrl = 'api/Auth/';

    constructor(private http: HttpService) {}

    login(data: any): Observable<any> {
        return this.http.post(this.authUrl + 'login', data).pipe(
            map((user) => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }),
            catchError(this.handleError('login', [])),
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T);
        };
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}
