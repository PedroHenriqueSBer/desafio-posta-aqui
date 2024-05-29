import { IContextProps } from '../types/props'
import { createTheme, ThemeProvider as MUITheProvider } from "@mui/material";
import light from "./../styles/themes/light";
import { ThemeProvider } from "styled-components";
import { LoadingContextProvider } from './loading';
import { CalculateContextProvider } from './calculator';
import { ResultContextProvider } from './results';


export const Providers = ({children} : IContextProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: light.colors.primary,
      },
      background: {
        default: light.colors.background,
      },
      error: {
        main: light.colors.error
      },
      secondary: {
        main: light.colors.secondary
      },
      success: {
        main: light.colors.success
      }
    },
  });
  return (
    <MUITheProvider theme={theme}>
      <ThemeProvider theme={light}>
        <LoadingContextProvider>
          <CalculateContextProvider>
            <ResultContextProvider>
              {children}
            </ResultContextProvider>
          </CalculateContextProvider>
        </LoadingContextProvider>
      </ThemeProvider>
    </MUITheProvider>
  )
}