import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
*{
    color: ${({theme}) => theme.colors.text200};
    font-family: "Roboto", sans-serif !important;
    font-weight: 600;
    font-size: 16px;
    @media (max-width: 599px) {
      font-size: 12px;
    }
    ::-webkit-scrollbar {
      width: 8px;
      border-radius: 10px;
      position: absolute;
    }
    ::-webkit-scrollbar:horizontal {
      height: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-track-horizontal {
      border-radius: 10px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-thumb:horizontal {
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 10px;
      position: absolute;
    }
  }

  .desktop{
    @media (max-width: 599px) {
      display: none;
    }
  }

  .mobile{
    @media (min-width: 600px) {
      display: none;
    }
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px ${({theme})=> theme.colors.background} inset;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: ${({theme})=> theme.colors.text} !important;
  }

  html, body, div#root{
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: ${({theme}) => theme.colors.background};
  }

  button{
    background: none;
    margin: 0;
    padding: 0;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input:focus{
    outline: 0;
  }
`;