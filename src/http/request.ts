import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import { getCodeMessage } from './ststus';
const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 5000
});

type BaseResponse<T> = {
	code: number | string;
	message: string;
	data: T;
};
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

service.interceptors.response.use(
	(response: AxiosResponse<BaseResponse<any>>) => {
		if (response.status === 200) {
			return response;
		}
		ElMessage.error(getCodeMessage(response.status));
		return response;
	},
	(error: AxiosError) => {
		ElMessage.error(getCodeMessage(error.response?.status || 500));
		return Promise.reject(error);
	}
);

// BaseResponse 为 res.data 的类型
// T 为 res.data.data 的类型 不同的接口会返回不同的 data 所以我们加一个泛型表示
// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
	const conf = config;
	return new Promise((resolve, reject) => {
		service.request<any, AxiosResponse<BaseResponse<T>>>(conf).then((res: AxiosResponse<BaseResponse<T>>) => {
			const data = res.data;
			// 如果data.code为错误代码返回message信息
			if (data.code != 1) {
				ElMessage({
					message: data.message,
					type: 'error'
				});
				reject(data.message);
			} else {
				ElMessage({
					message: data.message,
					type: 'success'
				});
				// 此处返回data信息 也就是 api 中配置好的 Response类型
				resolve(data.data as T);
			}
		});
	});
};
export const get = <T = any, U = any>(url: string, params: U, config: AxiosRequestConfig) => {
	return requestInstance<T>({ url, params, ...config, method: 'GET' });
};

export const post = <T = any, U = any>(url: string, data: U, config: AxiosRequestConfig) => {
	return requestInstance<T>({ url, data, ...config, method: 'POST' });
};

export const put = <T = any, U = any>(url: string, data: U, config: AxiosRequestConfig) => {
	return requestInstance<T>({ url, data, ...config, method: 'PUT' });
};

export const del = <T = any, U = any>(url: string, params: U, config: AxiosRequestConfig) => {
	return requestInstance<T>({ url, params, ...config, method: 'DELETE' });
};

export const patch = <T = any, U = any>(url: string, data: U, config: AxiosRequestConfig) => {
	return requestInstance<T>({ url, data, ...config, method: 'PATCH' });
};
