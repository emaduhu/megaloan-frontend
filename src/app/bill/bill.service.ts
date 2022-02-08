import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'environments/environment';
import { v4 as uuid } from 'uuid';

@Injectable({
	providedIn: 'root'
})

export class BillService {
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	billsUrl = environment.tokenUrl;

	constructor(private http: HttpClient) { }

	private baseUrl = this.billsUrl;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	public getGepgBill(value: any): Observable<any> {

		return this.http.get(`${this.baseUrl}/bill/?bill_id=${value}`);
	}

	public getSettings(): Observable<any> {

		return this.http.get(`${this.baseUrl}/gepg-settings`);
	}

	public cancelGepgBill(value: any): Observable<any> {

		return this.http.post(`${this.baseUrl}/gepg-bill/cancel`, value);
	}

	public reActivateGepgBill(value: any): Observable<any> {

		return this.http.post(`${this.baseUrl}/gepg-bill/reactivate`, value);
	}

}
