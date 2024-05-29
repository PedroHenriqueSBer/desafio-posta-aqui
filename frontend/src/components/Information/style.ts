import styled from "styled-components";

export const Container = styled.div`
  #content{
    display: none;
    position: absolute;
    left: 0;
    background: ${({theme}) => theme.colors.background};
    box-shadow: 0 0 5px #00000034;
    padding: 1rem 2rem;
    width: 10rem;
    @media (min-width: 900px) {
      width: 25rem;
    }
    color: ${({theme}) => theme.colors.text};
    margin-top: 3rem;
  }
  &:hover #content{
    display: flex;
  }
`