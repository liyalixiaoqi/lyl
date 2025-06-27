export const getCodeMessage = (code: number | string): string => {
	switch (code) {
		case 200:
			return '请求成功';
		case 401:
			return '未授权，请登录';
		case 403:
			return '拒绝访问';
		case 404:
			return '请求地址错误';
		case 500:
			return '服务器错误';
		case 502:
			return '网关错误';
		case 503:
			return '服务不可用';
		case 504:
			return '网关超时';
		default:
			return '未知错误';
	}
};
