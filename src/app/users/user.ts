import { Role } from './role';

export interface User {
	id: number;
	username:string
	firstName: string;
	middleName: string;
	lastName: string;
	msisdn: string;
	email: string;
	roles: Role[];
	password:string
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}