import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'environments/environment';
import { v4 as uuid } from 'uuid';

@Injectable({
	providedIn: 'root'
})

export class SmsService {
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	smsUrl = environment.tokenUrl;

	constructor(private http: HttpClient) { }

	private baseUrl = this.smsUrl ;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	public getTokenSms(token:any): Observable<any> {

		return this.http.get(`${this.baseUrl}/sms/?token=${token}`);
	}

	public reSendSms(token:any): Observable<any> {

		return this.http.get(`${this.baseUrl}/resend-sms-token/?token=${token}`);
	}

	public forwardSms(value:any): Observable<any> {

		return this.http.post(`${this.baseUrl}/forward-sms-token`, value);
	}
}
