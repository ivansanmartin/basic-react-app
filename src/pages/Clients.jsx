import React, { useEffect, useState } from 'react'

export const Clients = ({dataClientList, dataPhoneList}) => {

    const [newStorageClients, setStorageClients] = useState(() => JSON.parse(localStorage.getItem("clients")))
    const [newStoragePhones, setStoragePhones] = useState(() => JSON.parse(localStorage.getItem("phones")))
    const [clientName, setName] = useState("")
    const [clientNumber, setNumber] = useState("")
    const [clientPlan, setPlan] = useState(0)
    const [newClient, setNewClient] = useState({
        id: "",
        name: "",
        number: "",
        planTime: ""
    })

    const [sucessCreation, setStatus] = useState(false)
    const [counterSuccess, setCounter] = useState(0)


    const onDeleteClient = (e) => {
        const clients = JSON.parse(localStorage.getItem("clients"))
        const phones = JSON.parse(localStorage.getItem("phones"))

        let storageClients = []
        clients.find(data =>  {
            if (data.id !== e.target.value) {
                storageClients.push(data)
            }
        })

        let storagePhones = []
        phones.find(data => {
            if (data.cliente_id !== e.target.value) {
                storagePhones.push(data)

            }
        })
    
        setStorageClients(storageClients)
        setStoragePhones(storagePhones)
        setTimeout(() => {
            window.location.reload()

        }, 1000)
        
    }
    useEffect(() => {

        localStorage.setItem("clients", JSON.stringify(newStorageClients))        
        localStorage.setItem("phones", JSON.stringify(newStoragePhones))        
        
    }, [newStorageClients])


    const onSetNewClientName = (e) => {
        setName(e.target.value)
    }

    const onSetNewClientNumber = (e) => {
        const value = e.target.value
        if (value.match(/[a-zA-Z|.\s]/)) {
            return
        } else {
            setNumber(value)
        }
       
        
    
    }

    const onSetNewPlan = (e) => {
        const value = e.target.value 
        if (value <= 0 || value == "" || value.match(/[e|.]/)) {
            return
        } else {
            setPlan(parseInt(e.target.value))
        }
        


    }

    const saveNewClient = () => {
        const client = {
            id: "",
            nombre: ""
        }

        const phoneClient = {
            numero: "",
            minutos_plan: "",
            cliente_id: "",
            cliente: {
                id: "",
                nombre: ""
            }
        }
        const currentlyDataClient = JSON.parse(localStorage.getItem("clients"))
        const currentlyDataPhones = JSON.parse(localStorage.getItem("phones"))

        const lastIdData = parseInt(currentlyDataClient.length == 0 ? "0" : currentlyDataClient[currentlyDataClient.length - 1].id)


        newClient.id = lastIdData + 1
        newClient.name = clientName
        newClient.number = clientNumber
        newClient.planTime = clientPlan
        
        if (newClient.name == "" || newClient.number == "" || newClient.planTime == "") {
            alert("Campos sin rellenar, revisalos!")
            return
        
    
        } else if (newClient.number.length < 8 || newClient.number.length > 8) {
            alert("El número no es apropieado (Minimo 8 números y máximo 8)")
            return
        

        } else if (newClient.planTime > 200) {
            alert("El plan debe ser menor igual a 200 minutos")
            return

        } else {

             // Push new clients data in localStorage
             client.id = String(newClient.id)
             client.nombre = newClient.name
             currentlyDataClient.push(client)
             localStorage.setItem("clients", JSON.stringify(currentlyDataClient))

 
             //Push new phone_clients data in localStorage
             phoneClient.numero = newClient.number
             phoneClient.minutos_plan = newClient.planTime
             phoneClient.cliente_id = String(newClient.id)
             phoneClient.cliente.id = String(newClient.id)
             phoneClient.cliente.nombre = newClient.name
             currentlyDataPhones.push(phoneClient)
             localStorage.setItem("phones", JSON.stringify(currentlyDataPhones))
             setCounter(counterSuccess + 1)
             setStatus(true)

             setTimeout(() => {
                window.location.reload()
             }, 1500)
     

        }
               

       
       

    }


  return (
    <>
        <div className="container d-flex align-items-center flex-column mt-5 fs-3 fw-light">
            <p>Ingresa clientes al sistema de llamadas.</p>
            <hr className="border border-primary border-3 opacity-75 w-100" />
            <div className='mt-5 w-50 d-flex align-items-center flex-column'>
                <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-user"></i></span>
                    <input type="text" className="form-control" onChange={onSetNewClientName} placeholder="Nombre y apellido" aria-label="Username" aria-describedby="basic-addon1" />
                </div>

            
                <div className="input-group mt-5">
                    <span className="input-group-text" id="basic-addon3"><i className="fa-solid fa-phone"></i></span>
                    <input type="text" className="form-control" maxLength={8} minLength={8} onChange={onSetNewClientNumber} placeholder="Número telefónico" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                </div>

                {
                        clientNumber.length > 8 || clientNumber.length < 8  ?
                        (
                          
                        <div className="alert alert-dark p-1 d-flex align-items-center mt-5" role="alert">
                            <p className="fs-6 m-0">El número telefónico debe ser de 8 números minimo y máximo.</p>
                        </div>
                        )
                        :
                        (undefined)
                        
                }
            

               
                <div className="input-group mt-5">
                    <span className="input-group-text" id="basic-addon3"><i className="fa-solid fa-clock"></i></span>
                    <input type="number" className="form-control" min={0} onChange={onSetNewPlan} placeholder="Minutos plan" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                </div>

                {
                        clientPlan > 200 ?
                        (
                          
                        <div className="alert alert-warning p-1 d-flex align-items-center mt-5" role="alert">
                            <p className="fs-6 m-0">El plan no puede exceder los 200 minutos.</p>
                        </div>
                        )
                        :
                        (undefined)
                        
                }

                <div className="mt-5 mb-5 d-flex justify-content-center">
                    <button type="button" className="btn btn-success" onClick={saveNewClient} ><a href="#notify">Crear cliente</a></button>
                </div>

                {
                    sucessCreation ? (

                        <button type="button" id="notify" className="btn btn-info position-relative mb-5">
                            ¡Cliente agregado correctamente!
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {counterSuccess}
                            </span>
                        </button>
                    )
                    :
                    undefined
                
                }
                
            </div>

            <p className='mt-5'>Visualización de clientes.</p>
            <hr className="border border-primary border-3 opacity-75 w-100" />

            <table className="table table-secondary mt-5 mb-5">
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataClientList.map((data, value) => (
                                
                                <tr key={value}>
                                    <td>{data.nombre}</td>
                                    <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" value={data.id} onClick={onDeleteClient}>Eliminar</button></td>
                                </tr>
                            ))
                        }       
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Operación correcta</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¡Cliente eliminado correctamente!
                        </div>
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}


