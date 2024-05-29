import { createContext, useContext, useState } from "react";
import { ICustomSteperProps, ICustomSteperContextProps } from "../../types/props";
import { Step, StepConnector, StepIconProps, StepLabel, Stepper, stepConnectorClasses, styled } from "@mui/material";
import { useTheme } from "styled-components";

const CustomSteperContext = createContext({} as ICustomSteperContextProps)

export const CustomSteper = ({
  steps,
  icons
}:ICustomSteperProps) => {
  const theme = useTheme()


  const [activeStep,setActiveStep] = useState(0)

  const ColorlibConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: theme.colors.secondary,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: theme.colors.secondary,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: theme.colors.secondary200,
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ ownerState }) => ({
    backgroundColor: theme.colors.secondary200,
    zIndex: 20,
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    color: theme.colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      color: theme.colors.background,
      backgroundColor: theme.colors.primary,
    }),
    ...(ownerState.completed && {
      color: theme.colors.background,
      backgroundColor: theme.colors.secondary,
    }),
  }));

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  return (
    <CustomSteperContext.Provider value={{
      activeStep,
      setActiveStep
    }}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map(({label}, index) => {
          return (
            <Step key={label} completed={index < activeStep}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {steps.map(({component: Component}, index) =>
        <div key={index}>
          {index === activeStep && <Component />}
        </div>
      )}
    </CustomSteperContext.Provider>

  )
}

export const useCustomSteper = () => useContext(CustomSteperContext)