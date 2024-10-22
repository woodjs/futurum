import { IUser } from '../../../entities/user/types'

export const userInfoToProgress = (userInfo: IUser | object | null): number => {
  if (userInfo) {
    const keys = Object.keys(userInfo)
    const passedItems = []

    const filteredKeys: string[] = keys.filter(key => {
      switch (key) {
        case 'login':
          return key
        case 'email':
          return key
        case 'firstName':
          return key
        case 'lastName':
          return key
        case 'about':
          return key
        case 'phone':
          return key
        case 'country':
          return key
        case 'whatsapp':
          return key
        case 'telegram':
          return key
        default:
          break
      }
    })

    for (let i = 0; i < filteredKeys.length; i += 1) {
      if (userInfo[filteredKeys[i]]) {
        passedItems.push(userInfo[filteredKeys[i]])
      }
    }

    return Math.round((passedItems.length / filteredKeys.length) * 100)
  }

  return 0
}
