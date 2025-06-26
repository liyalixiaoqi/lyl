import { post } from '../http/request'
type LoginData = {
    username: string
    password: string
}

type RegisterData = {
    username: string
    password: string
}
export const login = (data: LoginData) => {
    return post('/login', data, {
        baseURL: '/api'
    })
}

export const register = (data: RegisterData) => {
    return post('/register', data, {
        baseURL: '/api'
    })
}

export const logout = (data: any) => {
    return post('/logout', data, {
        baseURL: '/api'
    })
}