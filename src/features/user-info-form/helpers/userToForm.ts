import { IUser } from '../../../entities/user/types'

export const userToForm = (user: IUser | object | null): object => {
  const formData: object = {}
  if (user) {
    const keys = Object.keys(user)
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
      formData[filteredKeys[i]] = user[filteredKeys[i]]
    }

    return formData
  }

  return formData
}
