import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'environments/environment';
import { v4 as uuid } from 'uuid';
import { Transaction } from './transaction';

@Injectable({
	providedIn: 'root'
})

export class TransactionsService {
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	transactionsUrl = environment.tokenUrl;

	constructor(private http: HttpClient) { }

	private baseUrl = this.transactionsUrl ;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};


	public latestTransactions(): Observable<any> {
		return this.http.get(`${this.baseUrl}/latest-transactions`);
	}

	public transactionTokens(value:any): Observable<any> {
		return this.http.post(`${this.baseUrl}/transaction-tokens`, value);
	}

	/**
	 * forwardToken
	 */
	public forwardToken(value:any) {

		console.log("value: " + value);

		return this.http.post(`${this.baseUrl}/forward-token`, value);
		
	}

	/**
	 * Filter Transactions
	 */
	 public filterTransactions(value:any): Observable<any> {

		console.log("Filter values: " + value);

		return this.http.post(`${this.baseUrl}/filter-transactions`, value);
		
	}


	public getGepgBill(value:any): Observable<any> {

		return this.http.get(`${this.baseUrl}/bill/?bill_id=${value}`);
	}

	public getGepgPayment(value:any): Observable<any> {

		return this.http.get(`${this.baseUrl}/payment/?bill_id=${value}`);
	}

	public getBillToken(value:any): Observable<any> {

		return this.http.get(`${this.baseUrl}/token/?bill_id=${value}`);
	}
	
}
