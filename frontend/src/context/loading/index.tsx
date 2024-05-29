import { createContext, useContext, useState } from "react";
import { IContextProps, LoadingContextProps } from "../../types/props";
import { Containter } from "./style";

const LoadingContext = createContext({} as LoadingContextProps)

export const LoadingContextProvider = ({children} : IContextProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <LoadingContext.Provider value={{
      isLoading,
      setIsLoading
    }}>
      {isLoading &&
        <Containter>
          <span />
        </Containter>
      }
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)