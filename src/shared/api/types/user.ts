// import { FileEntity } from "./file-entity";

export enum UserProviderEnum {
  EMAIL = 'email',
  GOOGLE = 'google',
}

export type User = {
  id: number
  email: string
  provider: string
  socialId: string
  firstName: string
  lastName: string
  photo: {
    id: string
    path: string
  }
  role: {
    id: number
    name: string
  }
  status: {
    id: number
    name: string
  }
  createdAt: string
  updatedAt: string
  deletedAt: string

  // photo?: FileEntity;
}
