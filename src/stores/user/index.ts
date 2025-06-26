import { defineStore } from 'pinia'
import { getUserList  } from '../../api/user'

interface UserInfo {
  userName: string
  userAvatar?: string
  userRole: string
  userToken: string
  userInfo: object
}
const useUserStore = defineStore('userInfo', {
  state: (): UserInfo => ({
    userName: '',
    userAvatar: '',
    userRole: '',
    userToken: '',
    userInfo: {},
  }),
  actions: {
    setUserInfo(userInfo: UserInfo) {
        getUserList({}).then((res: any) => {
        this.userName = res.data.userName
        this.userRole = res.data.userRole
        this.userToken = res.data.userToken
        this.userInfo = res.data.userInfo
      })
    },
  },
  persist: {
    key: 'userInfo',
    storage: localStorage,
  },
})
export default function useUserInfo() {
  return useUserStore()
}
