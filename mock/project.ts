import { MockMethod } from 'vite-plugin-mock';

export default [
	{
		url: '/mock/api/project',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: 'success',
				data: [
					{
						id: 1,
						date: '2016-05-03',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 2,
						date: '2016-05-02',
						name: 'abc',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 3,
						date: '2016-05-04',
						name: 'Tomc',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 4,
						date: '2016-05-01',
						name: 'y',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 5,
						date: '2016-05-01',
						name: 'g',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 6,
						date: '2016-05-01',
						name: 'h',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 7,
						date: '2016-05-01',
						name: 'j',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 8,
						date: '2016-05-01',
						name: 'k',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 9,
						date: '2016-05-01',
						name: 'l',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 10,
						date: '2016-05-01',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 11,
						date: '2016-05-01',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 12,
						date: '2016-05-01',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles'
					},
					{
						id: 13,
						date: '2016-05-01',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles'
					}
				]
			};
		}
	}
] as MockMethod[];
