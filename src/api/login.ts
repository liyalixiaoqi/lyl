import { post } from '../http/request';
type LoginData = {
	username: string;
	password: string;
};

type RegisterData = {
	username: string;
	password: string;
};
type LogoutData = {
	token: string;
};
export const login = (data: LoginData) => {
	return post('/login', data,{});
};

export const register = (data: RegisterData) => {
	return post('/register', data,{});
};

export const logout = (data: LogoutData) => {
	return post('/logout', data,{});
};
