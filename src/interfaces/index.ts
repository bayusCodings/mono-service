export interface IJwtUserData {
  id: string
}

export interface IResponse<T> {
  message: string
  data: T
}

export interface IOkResponse {
  ok: boolean,
  message: string
}