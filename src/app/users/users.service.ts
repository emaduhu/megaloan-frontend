import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'environments/environment';
import { v4 as uuid } from 'uuid';
import { User } from './user';

@Injectable({
	providedIn: 'root'
})

export class UsersService {
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	usersUrl = environment.tokenUrl;

	constructor(private http: HttpClient) { }

	private baseUrl = this.usersUrl;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};


	public allUsers(): Observable<any> {
		return this.http.get(`${this.baseUrl}/all-users`);
	}

	/**
	 * getUser
	 */
	public getUser(id: string): Observable<any> {
		return this.http.get(`${this.baseUrl}/user/?id=${id}`);
	}

	/**
	 * addUser
	 */
	public addUser(value: any) : Observable<any>  {
		return this.http.post(`${this.baseUrl}/add-user/`, value);
	}

	/**
	 * updateUser
	 */
	public updateUser(value: any) : Observable<any>  {
		return this.http.post(`${this.baseUrl}/update-user/`, value);
	}
	/**
	 * deleteUser
	 */
	public deleteUser(value: any): Observable<any>  {
		return this.http.post(`${this.baseUrl}/delete-user/`, value);
	}
}
