import {
  LocalStorageMethodReturn,
  UserInfo,
  UserInfoKey
} from '../types'

function userInfo(): LocalStorageMethodReturn<UserInfo> {
  const key: UserInfoKey = 'user-info'
  const get = () => {
    const data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data) as UserInfo
    }
    return null
  }

  const set = (value: UserInfo) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const remove = () => {
    localStorage.removeItem(key)
  }

  return {
    get,
    set,
    remove
  }
}

export default {
  userInfo: userInfo
}
