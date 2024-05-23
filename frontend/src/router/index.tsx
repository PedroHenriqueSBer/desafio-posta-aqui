import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/calculator" element={<div>Calculadora</div>} />
        <Route path="/history" element={<div>Histórico</div>} />
      </Routes>
    </BrowserRouter>
  )
}