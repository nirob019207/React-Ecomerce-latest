
import { BrowserRouter,  Route,  Routes } from "react-router-dom"
import { UserLayout } from "./layout/publicLayout/UserLayout"
import Login from "./store/pages/auth/Login"
import Register from "./store/pages/auth/Register"


function App() {
  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLayout/>}/>
      <Route path="/login" element={<Login/>}/>

      <Route path="/login" element={<Register/>}/>

  
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App