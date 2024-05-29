import { Button, Modal } from "@mui/material"
import { ButtonContent, Container, Content } from "./style"
import { IPopupProps } from "../../types/props"

export const Popup = ({
  isOpen,
  onClose,
  title,
  description,
}: IPopupProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Container>
          <h1>{title}</h1>
          <Content id="popupText">
            {description}
          </Content>
          <ButtonContent>
            <Button onClick={onClose}>Fechar</Button>
          </ButtonContent>
        </Container>
    </Modal>
  )
}