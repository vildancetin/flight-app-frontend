import { BrowserRouter, Routes,Route } from "react-router-dom"
import MyFlights from "./pages/MyFlights"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    //  Redirect pages based on the path entered from the URL
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/myflights" element={<MyFlights/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
