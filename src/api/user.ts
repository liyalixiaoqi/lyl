import { get, post, put, del, patch } from '../http/request'

export const getUserList = (params: any) => {
        return get('/user/list', params, {
            baseURL: '/api'
        })
    }

export const addUser = (data: any) => {
    return post('/user/add', data, {
        baseURL: '/api'
    })
}