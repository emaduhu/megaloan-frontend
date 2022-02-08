import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'environments/environment';
import { v4 as uuid } from 'uuid';
import { Meter } from './meter';

@Injectable({
	providedIn: 'root'
})

export class MetersService {
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	metersUrl = environment.tokenUrl;

	constructor(private http: HttpClient) { }

	private baseUrl = this.metersUrl ;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};


	public allMeters(): Observable<any> {
		return this.http.get(`${this.baseUrl}/all-meter-numbers`);
	}

	public getMeter(meterNumber: string): Observable<any> {
		return this.http.get(`${this.baseUrl}/meter/?meterNumber=${meterNumber}`);
	}

	public meterTokens(value:any): Observable<any> {
		return this.http.post(`${this.baseUrl}/meter-tokens`, value);
	}

	/**
	 * forwardToken
	 */
	public forwardToken(value:any) {

		return this.http.post(`${this.baseUrl}/forward-token`, value);
		
	}

	/**
	 * Filter Meters
	 */
	 public filterMeters(value:any): Observable<any> {

		console.log("Filter Values: " + value);

		return this.http.post(`${this.baseUrl}/filter-meters`, value);
		
	}
}
