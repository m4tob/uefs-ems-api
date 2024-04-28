export interface Account {
  id: number
  nome: string
  createdAt?: Date
  updatedAt?: Date
}

// The payload can change in the future, so we can use an interface to define it
export interface AuthPayload {
  account: Account
}
