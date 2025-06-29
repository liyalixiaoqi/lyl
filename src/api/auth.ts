import { get } from '../http/request';

export const getAuthList = () => {
	return get('/authList');
};