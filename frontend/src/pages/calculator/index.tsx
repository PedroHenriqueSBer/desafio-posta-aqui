import { Typography } from "@mui/material"
import { Header } from "../../components/Header"
import { Container, Content } from "./style"
import { CustomSteper } from "../../components/CustomSteper"
import { ContactMail, Inventory, Send } from "@mui/icons-material"
import { PersonForm } from "../../components/PersonForm"
import { useCalculate } from "../../context/calculator"
import { PackageForm } from "../../components/PackageForm"
import { Information } from "../../components/Information"
import { IPackage } from "../../types/models"
import { IShippingCalculateInputModel } from "../../types/inputModels"
import { IShipmentViewModel } from "../../types/viewModels"
import api from "../../services/api"
import { useLoading } from "../../context/loading"
import { useResult } from "../../context/results"
import { useNavigate } from "react-router-dom"

export const Calculator = () => {  
  const { selectedSender, setSelectedSender, selectedReceiver, setSelectedReceiver, selectedPackage, setSelectedPackage} = useCalculate()
  const { setIsLoading } = useLoading()
  const { setResults, results } = useResult()
  const navigate = useNavigate()

  const shippingCalculate = (input: IShippingCalculateInputModel) => 
    new Promise<IShipmentViewModel[]>((resolve,reject) => api.post('/shipping_calculate',input).then(({data}) => resolve(data)).catch(reject))

  const carrier = (carrier: string,calculated_id: string) => 
    new Promise<string>((resolve,reject) => api.post(`//posting?carrier={{${carrier}}}`,{calculated_id}).then(({data: {code}}) => resolve(code)).catch(reject))

  const handleSubmit = (value: IPackage) => {
    setSelectedPackage(value)
    setIsLoading(true)
    shippingCalculate({
      sender: selectedSender,
      receiver: selectedReceiver,
      package: selectedPackage
    })
      .then((result) => {
        setResults([{
          createdAt: new Date(),
          name: selectedSender.fullname,
          shipment: result
        }, ...results])
        navigate(`/result/${results.length}`)
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Typography variant="h4" component="p" color="primary">Calculadora de frete</Typography>
          <CustomSteper 
            steps={[
              {
                label: 'Remetente',
                component: () => <PersonForm defaultPerson={selectedSender} onSubmit={setSelectedSender}/>
              },
              {
                label: 'Receptor',
                component: () => <PersonForm defaultPerson={selectedReceiver} onSubmit={setSelectedReceiver}/>
              },
              {
                label: 'Pacote',
                component: () => <PackageForm defaultPackage={selectedPackage} onSubmit={handleSubmit}/>
              }
            ]}
            icons={{
              1: <Information options={[
                {
                  label: 'Nome',
                  value: selectedSender.fullname
                },
                {
                  label: 'Email',
                  value: selectedSender.email
                },
                {
                  label: 'Cpf',
                  value: selectedSender.cpf
                },
                {
                  label: 'Telefone',
                  value: selectedSender.phone
                },
                {
                  label: 'Cep',
                  value: selectedSender.address.cep
                },
                {
                  label: 'Cidade',
                  value: selectedSender.address.city
                },
                {
                  label: 'Bairro',
                  value: selectedSender.address.neighborhood
                },
                {
                  label: 'Número',
                  value: selectedSender.address.number
                },
                {
                  label: 'Estado',
                  value: selectedSender.address.state
                },
                {
                  label: 'Uf',
                  value: selectedSender.address.uf
                },
                {
                  label: 'Rua',
                  value: selectedSender.address.street
                },
                {
                  label: 'Complemento',
                  value: selectedSender.address.complement ?? 'não informado'
                }
              ]} title="Remetente"><Send /></Information>,
              2: <Information options={[
                {
                  label: 'Nome',
                  value: selectedReceiver.fullname
                },
                {
                  label: 'Email',
                  value: selectedReceiver.email
                },
                {
                  label: 'Cpf',
                  value: selectedReceiver.cpf
                },
                {
                  label: 'Telefone',
                  value: selectedReceiver.phone
                },
                {
                  label: 'Cep',
                  value: selectedReceiver.address.cep
                },
                {
                  label: 'Cidade',
                  value: selectedReceiver.address.city
                },
                {
                  label: 'Bairro',
                  value: selectedReceiver.address.neighborhood
                },
                {
                  label: 'Número',
                  value: selectedReceiver.address.number
                },
                {
                  label: 'Estado',
                  value: selectedReceiver.address.state
                },
                {
                  label: 'Uf',
                  value: selectedReceiver.address.uf
                },
                {
                  label: 'Rua',
                  value: selectedReceiver.address.street
                },
                {
                  label: 'Complemento',
                  value: selectedSender.address.complement ?? 'não informado'
                }
              ]} title="Receptor"><ContactMail /></Information>,
              3: <Information options={[
                {
                  label: 'Peso',
                  value: selectedPackage.weight
                },
                {
                  label: 'Altura',
                  value: selectedPackage.height
                },
                {
                  label: 'Largura',
                  value: selectedPackage.width
                },
                {
                  label: 'Comprimento',
                  value: selectedPackage.length
                },
                {
                  label: 'Ar',
                  value: selectedPackage.ar ? 'sim' : 'não'
                },
                {
                  label: 'Próprias mãos',
                  value: selectedPackage.own_hands ? 'sim' : 'não'
                },
                {
                  label: 'Reverso',
                  value: selectedPackage.reverse ? 'sim' : 'não'
                },
                {
                  label: 'Custo',
                  value: selectedPackage.information.amount
                },
                {
                  label: 'Quantidade',
                  value: selectedPackage.information.quantity
                },
                {
                  label: 'Descrição',
                  value: selectedPackage.information.description
                }
              ]} title="Pacote"><Inventory /></Information>,
            }}
          />
        </Content>
      </Container>
    </>
  )
}