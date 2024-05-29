import { Button, Grid, Autocomplete, TextField } from "@mui/material"
import { Container } from "./style"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { cpf } from 'cpf-cnpj-validator';
import { IPerson } from "../../types/models"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { consultCep } from "../../services/consultCep";
import { MASK_CEP, MASK_CPF, MASK_PHONE, MASK_PHONE_SIMPLE, MASK_PHONE_SIMPLE_WITH_NINE, MASK_PHONE_WITH_NINE, STATES } from "../../constants";
import { toPattern } from "vanilla-masker"
import { useCustomSteper } from "../CustomSteper";
import { IPersonFormProps } from "../../types/props";

export const PersonForm = ({
  defaultPerson,
  onSubmit
}: IPersonFormProps) => {

  const {activeStep, setActiveStep} = useCustomSteper()

  const isValidCEP = (cep: string): boolean => {
    const cepRegex = /^\d{5}-\d{3}$/;
    return cepRegex.test(cep);
  }

  const isValidPhone = (phone: string): boolean => {
    const phoneRegexs = [
      /^\d{4}-\d{4}$/,
      /^\d{5}-\d{4}$/,
      /^\(\d{2}\)\s?\d{4}-\d{4}$/,
      /^\(\d{2}\)\s?\d{5}-\d{4}$/
    ];

    for (const regex of phoneRegexs)
      if (regex.test(phone)) return true;
    return false;
  }

  const schema = yup.object<IPerson>().shape({
    cpf: yup
      .string()
      .test('cnpjValid','Digite um cnpj válido',(value) => cpf.isValid(value ?? ''))
      .required('Campo Obrigatório'),
    email: yup
      .string()
      .email('Precisa ser um email válido')
      .required('Campo Obrigatório'),
    fullname: yup
      .string()
      .required('Campo Obrigatório'),
    phone: yup
      .string()
      .test('phoneValid','Digite um telefone válido',(value) => isValidPhone(value ?? '')).required('Campo Obrigatório')
      .required('Campo Obrigatório'),
    address: yup
      .object({
      cep: yup
        .string()
        .test('cepValid','Digite um cep válido',(value) => isValidCEP(value ?? '')).required('Campo Obrigatório')
        .required('Campo Obrigatório'),
      state: yup
        .string()
        .required('Campo Obrigatório'),
      uf: yup
        .string()
        .required('Campo Obrigatório'),
      city: yup
        .string()
        .required('Campo Obrigatório'),
      neighborhood: yup
        .string()
        .required('Campo Obrigatório'),
      street: yup
        .string()
        .required('Campo Obrigatório'),
      number: yup
        .number()
        .required('Campo Obrigatório'),
      complement: yup
        .string()
    })
  })

  const [defaultValues] = useState<IPerson>(defaultPerson)

  const { 
    control,
    formState: { errors },
    watch,
    setValue,
    handleSubmit
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema as unknown as yup.ObjectSchema<IPerson, yup.AnyObject, any, "">)
  })

  const {
    address: {
      cep,
      uf,
      number
    }
  } = watch()

  useEffect(()=>{
    const newState = STATES.filter(s => s.uf.toLocaleLowerCase() === uf.toLocaleLowerCase())[0]
    setValue('address.state',newState?.state ?? '')
  },[uf])

  useEffect(()=>{
    if(number === '')
      setValue('address.number','0')
  },[number])

  useEffect(() => {
    if(isValidCEP(cep)){
      consultCep(cep).then(response => {
        setValue('address.city', response.city)
        setValue('address.neighborhood', response.neighborhood)
        setValue('address.street', response.street)
        setValue('address.uf', response.uf)
      })
    }
  }, [cep])

  const onHandleSubmit = (value: IPerson) => {
    onSubmit(value)
    setActiveStep(activeStep + 1)
  }

  return (
    <Container onSubmit={handleSubmit(onHandleSubmit)}>
      <Grid spacing={2} container>
        <Grid item xs={12} md={6}>
          <Controller 
            control={control}
            name="fullname"
            render={({field}) =>
              <TextField
                label="nome"
                fullWidth
                error={!!errors.fullname?.message}
                helperText={errors.fullname?.message}
                {...field}
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller 
            control={control}
            name="email"
            render={({field}) =>
              <TextField
                label="Email"
                fullWidth
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                {...field}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller 
            control={control}
            name="phone"
            render={({field: {value, ...field}}) =>
              <TextField
                label="Telefone"
                fullWidth
                error={!!errors.phone?.message}
                helperText={errors.phone?.message}
                {...field}
                value={toPattern(value, 
                  value.length < 9
                    ? MASK_PHONE_SIMPLE
                    : value.length < 10
                    ? MASK_PHONE_SIMPLE_WITH_NINE
                    : value.length < 14
                    ? MASK_PHONE
                    : MASK_PHONE_WITH_NINE
                )}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller 
            control={control}
            name="cpf"
            render={({field: {value, ...field}}) =>
              <TextField
                label="Cpf"
                fullWidth
                error={!!errors.cpf?.message}
                helperText={errors.cpf?.message}
                {...field}
                value={toPattern(value, MASK_CPF)}
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller 
            control={control}
            name="address.cep"
            render={({field: {value ,...field}}) =>
              <TextField
                label="Cep"
                fullWidth
                error={!!errors.address?.cep?.message}
                helperText={errors.address?.cep?.message}
                {...field}
                value={toPattern(value, MASK_CEP)}
              />
            }
          />
        </Grid>
        {isValidCEP(cep) &&
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Controller 
                control={control}
                name="address.city"
                render={({field}) =>
                  <TextField
                    label="Cidade"
                    fullWidth
                    error={!!errors.address?.city?.message}
                    helperText={errors.address?.city?.message}
                    {...field}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller 
                control={control}
                name="address.neighborhood"
                render={({field}) =>
                  <TextField
                    label="Bairro"
                    fullWidth
                    error={!!errors.address?.neighborhood?.message}
                    helperText={errors.address?.neighborhood?.message}
                    {...field}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller 
                control={control}
                name="address.uf"
                render={({field}) =>
                  <Autocomplete 
                    fullWidth
                    options={STATES.map(s => s.uf)}
                    renderInput={(params) => 
                      <TextField
                        label="Uf"
                        error={!!errors.address?.uf?.message}
                        helperText={errors.address?.uf?.message}
                        {...field}
                        {...params}
                      />
                    }
                  />
              }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Controller 
                control={control}
                name="address.number"
                render={({field: {value,...field}}) =>
                  <TextField
                    label="Número"
                    type="number"
                    fullWidth
                    value={parseInt(value)}
                    error={!!errors.address?.number?.message}
                    helperText={errors.address?.number?.message}
                    {...field}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <Controller 
                control={control}
                name="address.complement"
                render={({field}) =>
                  <TextField
                    label="Complemento"
                    fullWidth
                    error={!!errors.address?.complement?.message}
                    helperText={errors.address?.complement?.message}
                    {...field}
                  />
                }
              />
            </Grid>
          </>
        }
        <Grid item xs={12}>
          <div className="footer">
            <Button type="submit">Próximo</Button>
            {activeStep !== 0 &&
              <Button onClick={() => setActiveStep(activeStep - 1)} type="button">Voltar</Button>
            }
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}