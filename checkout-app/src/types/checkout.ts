export interface CartItem {
  id: number
  title: string
  quantity: number
  price: number
}

export interface FormData {
  email: string
  name: string
  cardNumber: string
  expiry: string
  cvc: string
  billingCep: string
  billingAddress: string
  billingNumber: string
  billingComplement: string
  billingCity: string
  billingState: string
  isSameAddress: boolean
  deliveryCep?: string
  deliveryAddress?: string
  deliveryNumber?: string
  deliveryComplement?: string
  deliveryCity?: string
  deliveryState?: string
}

