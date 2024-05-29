import { Button, Typography } from "@mui/material"
import { Header } from "../../components/Header"
import { Container, Content, Item } from "./style"
import { useResult } from "../../context/results"
import { useNavigate } from "react-router-dom"

export const History = () => {
  const { results } = useResult()
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Typography variant="h5" component="p" color="primary">Histórico</Typography>
          {results.map((r, index) => 
            <Item>
              <p>
                <Typography>{r.name}</Typography>
                <Typography>{new Date(r.createdAt).toLocaleDateString()}</Typography>
              </p>
              <Button onClick={() => navigate(`/result/${index}`)}>Ver Resultado</Button>
            </Item>
          )}
        </Content>
      </Container>
    </>
  )
}