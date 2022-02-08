import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'environments/environment';
import { v4 as uuid } from 'uuid';

@Injectable({
	providedIn: 'root'
})

export class TokenService {
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	tokensUrl = environment.tokenUrl;

	constructor(private http: HttpClient) { }

	private baseUrl = this.tokensUrl ;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	public getGepgToken(value:any): Observable<any> {

		return this.http.get(`${this.baseUrl}/token/?bill_id=${value}`);
	}

	
}
