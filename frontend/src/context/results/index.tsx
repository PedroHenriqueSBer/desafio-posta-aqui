import { createContext, useContext } from "react";
import { IContextProps, IResultContextProps } from "../../types/props";
import { IResult } from "../../types/models";
import { usePersistedState } from "../../hook/usePersistedState";

const ResultContext = createContext({} as IResultContextProps)

export const ResultContextProvider = ({children} : IContextProps) => {

  const [results, setResults] = usePersistedState<IResult[]>('data.resultss',[])
  
  return (
    <ResultContext.Provider value={{
      results, 
      setResults
    }}>
      {children}
    </ResultContext.Provider>
  )
}

export const useResult = () => useContext(ResultContext)