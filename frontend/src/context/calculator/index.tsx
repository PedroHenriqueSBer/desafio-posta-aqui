import { createContext, useContext, useState } from "react";
import { ICalculateContextProps, IContextProps } from "../../types/props";
import { IPackage, IPerson } from "../../types/models";

const CalculateContext = createContext({} as ICalculateContextProps)

export const CalculateContextProvider = ({children} : IContextProps) => {

  const [selectedPackage, setSelectedPackage] = useState<IPackage>({
    ar: false,
    height: '',
    information: {
      amount: '',
      description: '',
      quantity: ''
    },
    length: '',
    own_hands: false,
    reverse: false,
    weight: '',
    width: ''
  })

  const [selectedReceiver, setSelectedReceiver] = useState<IPerson>({
    address: {
      cep: '',
      city: '',
      neighborhood: '',
      number: '',
      state: '',
      street: '',
      uf: ''
    },
    cpf: '',
    email: '',
    fullname: '',
    phone: ''
  })
  
  const [selectedSender, setSelectedSender] = useState<IPerson>({
    address: {
      cep: '',
      city: '',
      neighborhood: '',
      number: '',
      state: '',
      street: '',
      uf: ''
    },
    cpf: '',
    email: '',
    fullname: '',
    phone: ''
  
  })
  
  return (
    <CalculateContext.Provider value={{
      selectedPackage, 
      setSelectedPackage,
      selectedReceiver, 
      setSelectedReceiver,
      selectedSender, 
      setSelectedSender
    }}>
      {children}
    </CalculateContext.Provider>
  )
}

export const useCalculate = () => useContext(CalculateContext)