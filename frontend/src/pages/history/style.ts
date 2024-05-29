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
  gap: 1rem;
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 5px #00000034;
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  p{
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`