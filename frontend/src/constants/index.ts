import { IPackage, IPerson, IState } from "../types/models"

const STATES: IState[] = [
  {
    uf: 'AC',
    state: 'Acre'
  },
  {
    uf: 'AL',
    state: 'Alagoas'
  },
  {
    uf: 'AP',
    state: 'Amapá'
  },
  {
    uf: 'AM',
    state: 'Amazonas'
  },
  {
    uf: 'BA',
    state: 'Bahia'
  },
  {
    uf: 'CE',
    state: 'Ceará'
  },
  {
    uf: 'DF',
    state: 'Distrito Federal'
  },
  {
    uf: 'ES',
    state: 'Espírito Santo'
  },
  {
    uf: 'GO',
    state: 'Goiás'
  },
  {
    uf: 'MA',
    state: 'Maranhão'
  },
  {
    uf: 'MT',
    state: 'Mato Grosso'
  },
  {
    uf: 'MS',
    state: 'Mato Grosso do Sul'
  },
  {
    uf: 'MG',
    state: 'Minas Gerais'
  },
  {
    uf: 'PA',
    state: 'Pará'
  },
  {
    uf: 'PB',
    state: 'Paraíba'
  },
  {
    uf: 'PR',
    state: 'Paraná'
  },
  {
    uf: 'PE',
    state: 'Pernambuco'
  },
  {
    uf: 'PI',
    state: 'Piauí'
  },
  {
    uf: 'RJ',
    state: 'Rio de Janeiro'
  },
  {
    uf: 'RN',
    state: 'Rio Grande do Norte'
  },
  {
    uf: 'RS',
    state: 'Rio Grande do Sul'
  },
  {
    uf: 'RO',
    state: 'Rondônia'
  },
  {
    uf: 'RR',
    state: 'Roraima'
  },
  {
    uf: 'SC',
    state: 'Santa Catarina'
  },
  {
    uf: 'SP',
    state: 'São Paulo'
  },
  {
    uf: 'SE',
    state: 'Sergipe'
  },
  {
    uf: 'TO',
    state: 'Tocantins'
  }
]

const MASK_CPF = "999.999.999-99";
const MASK_CEP = "99999-999";
const MASK_PHONE_SIMPLE = "9999-9999";
const MASK_PHONE_SIMPLE_WITH_NINE = "99999-9999";
const MASK_PHONE = "(99) 9999-9999";
const MASK_PHONE_WITH_NINE = "(99) 99999-9999";

const DEFAULTPACKAGE: IPackage = {
  ar: false,
  height: '',
  information: {
    amount: '',
    description: '',
    quantity: ''
  },
  length: '',
  own_hands: false,
  reverse: false,
  weight: '',
  width: ''
}

const DEFAULTPERSON: IPerson = {
  address: {
    cep: '',
    city: '',
    neighborhood: '',
    number: '',
    state: '',
    street: '',
    uf: ''
  },
  cpf: '',
  email: '',
  fullname: '',
  phone: ''
}


export {
  STATES, 
  MASK_CPF, 
  MASK_CEP,
  MASK_PHONE_SIMPLE,
  MASK_PHONE_SIMPLE_WITH_NINE,
  MASK_PHONE,
  MASK_PHONE_WITH_NINE,
  DEFAULTPACKAGE,
  DEFAULTPERSON
}