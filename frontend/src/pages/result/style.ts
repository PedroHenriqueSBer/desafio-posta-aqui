import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 3rem 0;
`

export const Content = styled.div`
  box-shadow: 0 0 5px #00000034;
  padding: 2rem;
  width: 80%;
  height: fit-content;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Category = styled.div`
  padding: 1rem 2rem;
  background-color: ${({theme}) => theme.colors.success};
  color: ${({theme}) => theme.colors.background};
  position: absolute;
  border-radius: 2rem;
  margin-left: 1rem;
  margin-top: 1rem;
`