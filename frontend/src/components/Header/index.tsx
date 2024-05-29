import { useNavigate } from "react-router-dom"
import { Button, Container } from "./style"
import { IconButton, Menu, MenuItem } from "@mui/material"
import {
  MoreVert
} from '@mui/icons-material'
import { useState } from "react"

export const Header = () => {

  interface IOption{
    name: string
    route: string
  }

  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const option: IOption[] = [
    {
      name: 'Calculadora de frete',
      route: '/calculator'
    },
    {
      name: 'Histórico',
      route: '/history'
    }
  ]

  return (
    <Container>
      <button onClick={()=> navigate('/')}>
        <img src="/assets/header_logo.png" alt="" className="desktop" />
        <img src="/assets/logo.png" alt="" className="mobile" />
      </button>
      {option.map((o, index) => 
        <Button key={index} onClick={()=> navigate(o.route)} className="desktop">{o.name}</Button>
      )}
      <div className="mobile menuBar">
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
          <MoreVert />
        </IconButton>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {option.map((o,index) => 
          <MenuItem key={index} onClick={() => {handleClose(); navigate(o.route)}}>{o.name}</MenuItem>
      )}
      </Menu>
    </Container>
  )
}