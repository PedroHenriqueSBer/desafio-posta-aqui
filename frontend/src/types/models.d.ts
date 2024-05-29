export interface IAddress {
  cep: string
  state: string
  uf: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement?: string
}

export interface IInformation {
  amount: string,
  quantity: string,
  description: string
}

export interface IPerson {
  fullname:string
  cpf:string
  phone:string
  email:string
  address: IAddress
}

export interface IPackage {
  weight: string
  height: string
  width: string
  length: string
  reverse: boolean
  ar: boolean
  own_hands: boolean
  information: IInformation
}

export interface IShipment {
  _id: string
  carrier: string
  price: number
  discount: number
}

export interface IState {
  uf: string,
  state: string
}

export interface IResults {
  name: string
  createdAt: Date
  shipment: import('./viewModels').IShipmentViewModel[]
}