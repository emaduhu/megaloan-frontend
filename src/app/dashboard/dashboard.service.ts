import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'environments/environment';
import { v4 as uuid } from 'uuid';
import { Dashboard } from './dashboard';

@Injectable({
	providedIn: 'root'
})

export class DashboardService {
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	dashboardsUrl = environment.tokenUrl;

	constructor(private http: HttpClient) { }

	private baseUrl = this.dashboardsUrl ;

	public getDashboardInfo(): Observable<any> {
		return this.http.get(`${this.baseUrl}/dashboard-info`);
	}

}
