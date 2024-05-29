import { ReactNode } from "react";
import { IPackage } from "./models";

export interface IContextProps {
  children: ReactNode
}

export interface IStepOptions {
  label: string,
  component: () => JSX.Element
}
export interface IOption {
  label: string,
  value: string
}
export interface IInformationProps {
  options: IOption[]
  title: string
  children: ReactNode
}
export interface ICustomSteperIconsProps{
  [index: string]: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}
export interface ICustomSteperProps {
  steps: IStepOptions[]
  icons: ICustromSteperIconsProps
}
export interface IResultContextProps {
  results: import('./models').IResults[], 
  setResults: (value: import('./models').IResults[]) => void
}
export interface ICalculateContextProps {
  selectedPackage: import('./models').IPackage, 
  setSelectedPackage: (value: import('./models').IPackage) => void,
  selectedReceiver: import('./models').IPerson,
  setSelectedReceiver: (value: import('./models').IPerson) => void,
  selectedSender: import('./models').IPerson,
  setSelectedSender: (value: import('./models').IPerson) => void,
}
export interface IPersonFormProps {
  defaultPerson: IPerson
  onSubmit: (value: IPerson) => void
}
export interface IPackageFormProps {
  defaultPackage: IPackage
  onSubmit: (value: IPackage) => void
}
export interface ICustomSteperContextProps {
  activeStep: number
  setActiveStep: (value: number) => void
}
export interface LoadingContextProps {
  isLoading: boolean,
  setIsLoading: (value: boolean) => void
}

export interface IPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}