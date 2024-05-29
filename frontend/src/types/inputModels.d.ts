export interface IShippingCalculateInputModel{
  sender: import('./models').IPerson
  receiver: import('./models').IPerson
  package: import('./models').IPackage
}