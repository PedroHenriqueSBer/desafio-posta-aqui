import styled from "styled-components";

export const Container = styled.header`
  width: 100vw;
  box-shadow: 0 0 5px #0000002f;
  height: 2rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 2rem;

  .menuBar{
    margin-right: 2rem;
  }

  @media (max-width: 599px) {
    gap: 1rem;
    justify-content: space-between;
    img{
      width: 3rem;
    }
  }

  @media (min-width: 600px) {
    img{
      width: 8rem;
    }
  }
`

export const Button = styled.button`
  color: ${({theme}) => theme.colors.text200};
  transition: 300ms ease-in-out;
  &:hover{
    color: ${({theme}) => theme.colors.secondary};
  }
`