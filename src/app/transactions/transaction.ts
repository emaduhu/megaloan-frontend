import { Token } from '../token-list/token';

export interface Transaction {
	id: number;
	meterNumber: string;
	customerName: string;
	controlNumber:string;
	billAmount:string;
	phoneNumber: string;
	gepgReceipt:string;
	pspReceipt:string;
	paidAmount:string;
	token:string;
	payedAt: string;
	billId:string;
	error:string;
}