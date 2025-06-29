import { get, post } from '../http/request';

export const getUserList = (params: Object) => {
	return get('/userList', params);
};

export const getAuthUserList = (data: Object) => {
	return get('/authUserList', data);
};
