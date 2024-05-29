import { Button, FormControlLabel, Grid, InputAdornment, Switch, TextField, Typography } from "@mui/material"
import { Container } from "./style"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { IPackage } from "../../types/models"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useCustomSteper } from "../CustomSteper";
import { IPackageFormProps } from "../../types/props";

export const PackageForm = ({
  defaultPackage,
  onSubmit
}: IPackageFormProps) => {

  const {activeStep, setActiveStep} = useCustomSteper()

  const schema = yup.object<IPackage>().shape({
    weight: yup.string().required('Campo obrigatório'),
    height: yup.string().required('Campo obrigatório'),
    width: yup.string().required('Campo obrigatório'),
    length: yup.string().required('Campo obrigatório'),
    reverse: yup.bool().required('Campo obrigatório'),
    ar: yup.bool().required('Campo obrigatório'),
    own_hands: yup.bool().required('Campo obrigatório'),
    information: yup.object({
      amount: yup.string().required('Campo obrigatório'),
      quantity: yup.string().required('Campo obrigatório'),
      description: yup.string().required('Campo obrigatório')
    })
  })

  const [defaultValues] = useState<IPackage>(defaultPackage)

  const { 
    control,
    formState: { errors },
    watch,
    setValue,
    handleSubmit
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema as unknown as yup.ObjectSchema<IPackage, yup.AnyObject, any, "">)
  })

  const {
    information: {
      amount,
      quantity
    },
    width,
    height,
    weight,
    length
  } = watch()

  useEffect(()=>{
    if(amount === '')
      setValue('information.amount','0')
  },[amount])

  useEffect(()=>{
    if(quantity === '')
      setValue('information.quantity','0')
  },[quantity])

  useEffect(()=>{
    if(width === '')
      setValue('width','0')
  },[width])

  useEffect(()=>{
    if(height === '')
      setValue('height','0')
  },[height])

  useEffect(()=>{
    if(weight === '')
      setValue('weight','0')
  },[weight])

  useEffect(()=>{
    if(length === '')
      setValue('length','0')
  },[length])

  const onHandleSubmit = (value: IPackage) => {
    onSubmit(value)
  }

  return (
    <Container onSubmit={handleSubmit(onHandleSubmit)}>
      <Grid spacing={2} container>
        <Grid item xs={12} sm={3}>
          <Controller 
            control={control}
            name="weight"
            render={({field}) => 
              <TextField 
                label="Peso"
                fullWidth
                error={!!errors.weight?.message}
                helperText={errors.weight?.message}
                {...field}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Controller 
            control={control}
            name="height"
            render={({field}) => 
              <TextField 
                label="Altura"
                fullWidth
                error={!!errors.height?.message}
                helperText={errors.height?.message}
                {...field}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Controller 
            control={control}
            name="width"
            render={({field}) => 
              <TextField 
                label="Largura"
                fullWidth
                error={!!errors.width?.message}
                helperText={errors.width?.message}
                {...field}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Controller 
            control={control}
            name="length"
            render={({field}) => 
              <TextField 
                label="Comprimento"
                fullWidth
                error={!!errors.length?.message}
                helperText={errors.length?.message}
                {...field}
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller 
            control={control}
            name="ar"
            render={({field}) => 
              <FormControlLabel
                control={<Switch color="primary" {...field} />}
                label="Ar"
                labelPlacement="end"
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller 
            control={control}
            name="reverse"
            render={({field}) => 
              <FormControlLabel
                control={<Switch color="primary" {...field} />}
                label="Reverso"
                labelPlacement="end"
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller 
            control={control}
            name="own_hands"
            render={({field}) => 
              <FormControlLabel
                control={<Switch color="primary" {...field} />}
                label="Próprias mãos"
                labelPlacement="end"
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller 
            control={control}
            name="information.amount"
            render={({field: {value, ...field}}) => 
              <TextField 
                label="Custo"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                fullWidth
                error={!!errors.information?.amount?.message}
                helperText={errors.information?.amount?.message}
                type="number"
                {...field}
                value={parseFloat(value).toFixed(2)}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller 
            control={control}
            name="information.quantity"
            render={({field}) => 
              <TextField 
                label="Quantidade"
                fullWidth
                error={!!errors.information?.quantity?.message}
                helperText={errors.information?.quantity?.message}
                type="number"
                {...field}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Controller 
            control={control}
            name="information.description"
            render={({field: {value, ...field}}) => (
              <>
                <TextField 
                  label="Descrição"
                  fullWidth
                  error={!!errors.information?.description?.message}
                  helperText={errors.information?.description?.message}
                  value={value.substring(0,99)}
                  {...field}
                />
                <Typography color="primary">{value.length}/100</Typography>
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="footer">
            <Button type="submit">Finalizar</Button>
            {activeStep !== 0 &&
              <Button onClick={() => setActiveStep(activeStep - 1)} type="button">Voltar</Button>
            }
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}