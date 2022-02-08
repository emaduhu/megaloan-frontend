import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'environments/environment';
import { v4 as uuid } from 'uuid';
import { Reconciliation } from './reconciliation';

@Injectable({
	providedIn: 'root'
})

export class ReconciliationService {
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	reconciliationUrl = environment.tokenUrl;

	constructor(private http: HttpClient) { }

	private baseUrl = this.reconciliationUrl ;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};


	public latestReconciliation(): Observable<any> {
		return this.http.get(`${this.baseUrl}/latest-reconciliation`);
	}

	/**
	 * Filter Reconciliation
	 */
	 public filterReconciliation(value:any): Observable<any> {

		console.log("Filter values: " + value);

		return this.http.post(`${this.baseUrl}/filter-reconciliation`, value);
		
	}

	public requestReconciliationFile(value:any): Observable<any> {

		console.log("Filter values: " + JSON.stringify(value));

		return this.http.post(`${this.baseUrl}/request-reconciliation`, value);
		
	}

}
