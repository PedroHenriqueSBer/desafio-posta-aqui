import { createContext, useContext, useState } from "react";
import { ICalculateContextProps, IContextProps } from "../../types/props";
import { IPackage, IPerson } from "../../types/models";
import { DEFAULTPACKAGE, DEFAULTPERSON } from "../../constants";

const CalculateContext = createContext({} as ICalculateContextProps)

export const CalculateContextProvider = ({children} : IContextProps) => {

  const [selectedPackage, setSelectedPackage] = useState<IPackage>(DEFAULTPACKAGE)

  const [selectedReceiver, setSelectedReceiver] = useState<IPerson>(DEFAULTPERSON)
  
  const [selectedSender, setSelectedSender] = useState<IPerson>(DEFAULTPERSON)
  
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