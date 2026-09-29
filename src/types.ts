export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'instructor' | 'customer'
}

export type Membership = {
  id: string
  name: string
  description: string
  image: string
  price: number
  duration: number
  class_credits: number
}