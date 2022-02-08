import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'environments/environment';
import { v4 as uuid } from 'uuid';

@Injectable({
	providedIn: 'root'
})

export class PaymentService {
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	paymentsUrl = environment.tokenUrl;

	constructor(private http: HttpClient) { }

	private baseUrl = this.paymentsUrl ;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	public getGepgPayment(value:any): Observable<any> {

		return this.http.get(`${this.baseUrl}/payment/?bill_id=${value}`);
	}
}
