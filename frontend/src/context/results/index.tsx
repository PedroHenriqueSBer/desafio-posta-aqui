import { createContext, useContext } from "react";
import { IContextProps, IResultContextProps } from "../../types/props";
import { IResults } from "../../types/models";
import { usePersistedState } from "../../hook/usePersistedState";

const ResultContext = createContext({} as IResultContextProps)

export const ResultContextProvider = ({children} : IContextProps) => {

  const [results, setResults] = usePersistedState<IResults[]>('data.results',[])

  
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