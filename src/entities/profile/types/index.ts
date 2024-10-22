export interface IProfile {
  id: number | null
  email: string
  provider: string | null
  socialId: number | null | string
  firstName: string
  lastName: string
  login: string | null
  country: string | null
  about: string | null
  whatsapp: string | null
  phone: string | null
  telegram: string | null
  photo: {
    id: string
    path: string
    type: string
    name: string
  }
  role: {
    id: number
    name: string
    __entity: string
  } | null
  status: {
    id: number
    name: string
    __entity: string
  } | null
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
}
