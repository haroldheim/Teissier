import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private myAppUrl = environment.appUrl;

    constructor(private http: HttpClient) {}

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http
            .get(`${this.myAppUrl}${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http
            .put(`${this.myAppUrl}${path}`, JSON.stringify(body))
            .pipe(catchError(this.formatErrors));
    }

    post(
        path: string,
        body: Object = {},
        options: Object = {},
    ): Observable<any> {
        return this.http
            .post(`${this.myAppUrl}${path}`, JSON.stringify(body), options)
            .pipe(catchError(this.formatErrors));
    }

    delete(path): Observable<any> {
        return this.http
            .delete(`${this.myAppUrl}${path}`)
            .pipe(catchError(this.formatErrors));
    }
}
