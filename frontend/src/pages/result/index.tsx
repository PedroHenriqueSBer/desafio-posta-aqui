import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header"
import { Category, Container, Content } from "./style"
import { useResult } from "../../context/results";
import { useEffect, useState } from "react";
import { IResult } from "../../types/models";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import api from "../../services/api";
import { Popup } from "../../components/Popup";
import { useLoading } from "../../context/loading";
import { IShipmentViewModel } from "../../types/viewModels";
import { useTheme } from "styled-components";

export const Result = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { setIsLoading } = useLoading()
  const { results } = useResult()
  const theme = useTheme()
  const [ result, setResult ] = useState<IResult>()
  const [ description, setDescription ] = useState<string>('')
  const [ title, setTitle ] = useState<string>('')
  const [ lowerPriceIndex, setLowerPriceIndex ] = useState<number>(0)
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  const requestCarrier = (carrier: string,calculated_id: string) => 
    new Promise<string>((resolve,reject) => api.post(`/posting?carrier={{${carrier}}}`,{calculated_id}).then(({data: {code}}) => resolve(code)).catch(reject))

  function getLowerIndex(shipments: IShipmentViewModel[]): number {
    if (shipments.length === 0) {
      return -1; // Retorna -1 se a lista estiver vazia
    }
  
    let lowestPriceIndex = 0;
    let lowestPrice = shipments[0].price;
  
    for (let i = 1; i < shipments.length; i++) {
      if (shipments[i].price < lowestPrice) {
        lowestPrice = shipments[i].price;
        lowestPriceIndex = i;
      }
    }
  
    return lowestPriceIndex;
  }

  const handleRequest = (carrier: string,calculated_id: string) => {
    setIsLoading(true)
    requestCarrier(carrier,calculated_id)
      .then(code => {setDescription(`Seu código é ${code}`);setTitle('Código gerado com sucesso')})
      .catch(() => {setDescription(`Erro ao acessar a api`);setTitle('Erro')})
      .finally(() => {setIsLoading(false); setIsOpen(true)})
    
  }

  const getImageUrl = (value: string) => {
    if(['CORREIOS PAC','CORREIOS SEDEX'].includes(value))
      return 'correios-color.png'
    if(['JADLOG EXPRESS','JADLOG PACKAGE'].includes(value))
      return 'jadlog-color.png'
    return 'azul-cargologo.png'
  }

  useEffect(()=>{
    if(id !== undefined){
      if(results[parseInt(id)] !== undefined){
        setResult(results[parseInt(id)])
        setLowerPriceIndex(getLowerIndex(results[parseInt(id)].shipment as IShipmentViewModel[]))
      }
      else
        navigate('/')
    }
  },[])

  return (
    <>
      <Header />
      <Container>
        <Content>
          {result === undefined 
            ? (
              <Typography variant="h5" component="p" color="primary">Carregando resultado...</Typography>
            )
            : (
              <Grid spacing={2} container>
                <Grid item xs={6} md={8} lg={10}>
                  <Typography variant="h5" component="p" color="primary">{result.name}</Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                  <Typography variant="h5" component="p" color="primary">{new Date(result.createdAt).toLocaleDateString()}</Typography>
                </Grid>
                {result.shipment.map((s, index) =>
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    {lowerPriceIndex === index && 
                      <Category>
                        Melhor frete
                      </Category>
                    }
                    <Card style={lowerPriceIndex === index ? 
                    {
                      background: theme.colors.secondary200
                    } : undefined}>
                      <CardMedia
                        sx={{ height: 100 }}
                        image={'/assets/' + getImageUrl(s.carrier)}
                        title={s.carrier}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {s.carrier}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <p>desconto: {s.discount.toFixed(2)}</p>
                          <p>preço: {s.price.toFixed(2)}</p>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => handleRequest(s.carrier,s._id)}>Gerar código</Button>
                      </CardActions>
                    </Card>
                  </Grid>  
                )}
              </Grid>
            )
          }
        </Content>
      </Container>
      <Popup
        title={title}
        description={description}
        isOpen={isOpen}
        onClose={() => {setIsOpen(false)}}
      />
    </>
  )
}