import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'environments/environment';

import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    authUrl = environment.authUrl;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.authUrl}/auth/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                // if (!user) return this.error('Username or password is incorrect');
                return user;
            }));
    }

    // With fakeProvider
    // login(username: string, password: string) {
    //     return this.http.post<any>(`/users/authenticate`, { username, password })
    //         .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //             return user;
    //         }));
    // }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    // helper functions

    // ok(body?) {
    //     return of(new HttpResponse({ status: 200, body }))
    // }

    // error(message) {
    //     return throwError({ error: { message } });
    // }

    // unauthorized() {
    //     return throwError({ status: 401, error: { message: 'Unauthorised' } });
    // }

    // isLoggedIn() {
    //     return headers.get('Authorization') === 'Bearer fake-jwt-token';
    // }

}

