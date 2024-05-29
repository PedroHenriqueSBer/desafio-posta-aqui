import styled from "styled-components";

export const Container = styled.div`
  color: ${({theme}) => theme.colors.text200};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding-top: 4rem;
  div.text{
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 80%;
  }
  h1{
    font-size: 35px;
    color: ${({theme}) => theme.colors.primary};
    margin: 0;
  }
  h2{
    color: ${({theme}) => theme.colors.text};
    font-size: 20px;
    margin: 0;
  }
  span{
    font-size: 15px;
  }
`

export const Content = styled.div`
  width: 100%;
  background: ${({theme}) => theme.colors.secondary200};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  div{
    @media (max-width: 650px) {
      padding: 4rem;
    }
    display: grid;
    grid-template-columns: auto;
    @media (min-width: 650px) {
      grid-template-columns: auto auto;
    }
    @media (min-width: 950px) {
      grid-template-columns: auto auto auto;
    }
    align-items: center;
    justify-content: center;
    gap: 5rem;
  }
  img{
    width: 16rem;
  }
  h2{
    font-size: 3rem;
  }
`

export const Button = styled.button`
  background: ${({theme}) => theme.colors.secondary};
  width: fit-content;
  padding: 13px 25px;
  color: ${({theme}) => theme.colors.background};
  border-radius: 5px;
  transition: 300ms ease-in-out;
  &:hover{
    color: ${({theme}) => theme.colors.text};
  }
`