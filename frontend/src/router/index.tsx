import { BrowserRouter, Route, Routes } from "react-router-dom"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/calculator" element={<div>Calculadora</div>} />
        <Route path="/History" element={<div>Histórico</div>} />
      </Routes>
    </BrowserRouter>
  )
}