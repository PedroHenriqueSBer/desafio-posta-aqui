import { Grid, Typography } from "@mui/material";
import { IInformationProps } from "../../types/props";
import { Container } from "./style";

export const Information = ({options, title, children}: IInformationProps) => {
  return (
    <Container>
      <div id="hover">{children}</div>
      <div id="content">
        <Grid spacing={2} container>
          <Grid item xs={12}>
            <Typography variant='h5' color='primary'>{title}</Typography>
          </Grid>
          {options.map((o,index) => 
            <Grid key={index} item xs={12} md={6}>
              <Typography variant='h6' color='primary'>{o.label}</Typography>
              <Typography>{o.value !== '' ? o.value : 'não cadastrado'}</Typography>
            </Grid>
          )}
        </Grid>
      </div>
    </Container>
  )
}