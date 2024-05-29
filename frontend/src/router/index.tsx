import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  Home,
  Calculator,
  Result
} from './../pages/index'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/history" element={<div>Histórico</div>} />
      </Routes>
    </BrowserRouter>
  )
}