import { Role } from './role';
export class User {
    id: number;
	username:string
	email: string;
	roles: Role[];
	tokenType: string;
    accessToken?: string;
}
