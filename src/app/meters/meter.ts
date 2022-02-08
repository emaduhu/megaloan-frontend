import { Token } from '../token-list/token';

export interface Meter {
	id: number;
	msisdn: string;
	customerName: string;
	metername: string;
	meterNumber: string;
	token: Token[];
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	
}