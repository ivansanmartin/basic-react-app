import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Calls} from "./pages/Calls"
import {MakeCall} from "./pages/MakeCalls"
import {Landa} from "./pages/Landa"
import {Navegation} from "./Navegation"
import { useEffect, useState } from 'react';
import { Clients } from './pages/Clients';



function App() {
  const [clients, setClient] = useState([])
  const [phones, setPhone] = useState([])

  const getClients = async () => {
    const response = await fetch("http://example/api-prueba/llamadas.php?action=clientes")
    const data = await response.json()

    return data

  }

  const getPhones = async () => {
    const response = await fetch("http://example/api-prueba/llamadas.php?action=telefonos")
    const data = await response.json()

    return data
  }

  const verifyStorageClients = JSON.parse(localStorage.getItem("clients"))
  const verifyStoragePhones = JSON.parse(localStorage.getItem("phones"))

  useEffect(() => {
    
    const loadClients = async () => {
      const dataClients = await getClients()
      
      if (verifyStorageClients) {
        console.log("Is currently loaded clients")
        localStorage.setItem("clients", JSON.stringify(verifyStorageClients))

      } else {
        localStorage.setItem("clients", JSON.stringify(dataClients))
      }

      setClient(JSON.parse(localStorage.getItem("clients")))
      

    }

    const loadPhones = async () => {
      const dataPhones = await getPhones()
      
      if (verifyStoragePhones) {
        console.log("Is currently loaded phones")
        localStorage.setItem("phones", JSON.stringify(verifyStoragePhones))

      } else {
        localStorage.setItem("phones", JSON.stringify(dataPhones))
      }

      setPhone(JSON.parse(localStorage.getItem("phones")))
      

    }
    loadClients()
    loadPhones()
    
  }, [])

  return (

    <BrowserRouter>
      <Navegation />

      <Routes>
        <Route path='/' element={<Landa/>}/>
        <Route path='/dashboard/make-call' element={<MakeCall dataClientList={clients} dataPhoneList={phones}/>}/>

        <Route path='/dashboard/calls' element={<Calls dataClientList={clients} dataPhoneList={phones}/>}/>
        <Route path='/dashboard/clients' element={<Clients dataClientList={clients} dataPhoneList={phones}/>}/>

      </Routes>
    
    
    </BrowserRouter>
 

  );
}

export default App;
