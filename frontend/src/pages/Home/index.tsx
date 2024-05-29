import { useNavigate } from "react-router-dom"
import { Header } from "../../components/Header"
import { Button, Container, Content } from "./style"

export const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Container>
        <div className="text">
          <h1>Calculo de frete</h1>
          <h2>Desafio de Calculo de frete e consulta a api da Postaqui</h2>
          <span>é bem simples, você preenche um formulário e ele te devolve os resultados</span>
          <Button onClick={() => navigate('/calculator')}>Iniciar</Button>
        </div>
        <Content>
          <h2>Transportadoras</h2>
          <div>
            <img src="/assets/correios-color.png" alt="" />
            <img src="/assets/jadlog-color.png" alt="" />
            <img src="/assets/azul-cargologo.png" alt="" />
          </div>
        </Content>
      </Container>
    </>
  )
}