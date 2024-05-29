import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  Home,
  Calculator
} from './../pages/index'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/history" element={<div>Histórico</div>} />
      </Routes>
    </BrowserRouter>
  )
}