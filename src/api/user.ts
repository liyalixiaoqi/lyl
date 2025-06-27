import { get, post } from '../http/request';

export const getUserList = (params: Object) => {
	return get('/user/list', params, {
		baseURL: '/api'
	});
};

export const addUser = (data: Object) => {
	return post('/user/add', data, {
		baseURL: '/api'
	});
};
