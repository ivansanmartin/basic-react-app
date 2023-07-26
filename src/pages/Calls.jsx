import { useEffect, useState } from "react"

export const Calls = ({dataClientList}) => {

    const [dataPhoneSelect, setPhone] = useState([])
    const [dataPhoneList, setPhoneList] = useState([])
    const [statusPlan, setStatus] = useState([])
    const [callLogs, setLogs] = useState([])


    const onChangeOptionClient = (e) => {
        const dataClient = []
        const logsClient = []
        const callLogs = JSON.parse(localStorage.getItem("call_logs"))

        window.location.href = "#logs"

        try {
            dataPhoneList.find(data => {
                if (data.cliente_id == e.target.value) {
                    dataClient.push(data)
                }
         
            })

            if (callLogs) {
                callLogs.find(logs => {
                    if (logs.clienteId == e.target.value) {
                        logsClient.push(logs)
    
                    }
                })
            } 
            
        } catch (error) {
            alert("Error fatal con `localStorage`, recargando página!")
            window.location.reload()
            
        }
        
        setPhone(dataClient)
        setLogs(logsClient)
        
        let totalPorcent = []

        for (let index = 0; index < dataClient.length; index++) {
            totalPorcent.push((dataClient[index].minutos_plan / 200 ) * 100)
            
        }

        const status = []
        for (let index = 0; index < totalPorcent.length; index++) {
   
         
            if (totalPorcent[index] > 30) {
                status.push("table-success")
                setStatus(status)

            } else if (totalPorcent[index] >= 10 && totalPorcent[index] <= 30) {
                status.push("table-warning")
                setStatus(status)


            } else if (totalPorcent[index] < 10) {
                status.push("table-danger")
                setStatus(status)


            }
            
        }  


    }

    useEffect(() => {
        setPhoneList(JSON.parse(localStorage.getItem("phones")))
        
    }, [dataPhoneSelect])   



    return (
        <>
            <div className="container d-flex align-items-center flex-column mt-5 fs-3 fw-light">
                <p>Para ver las llamadas, selecciona un cliente de la lista.</p>
                <hr className="border border-primary border-3 opacity-75 w-100" />

                <select className="form-select w-50" size="5" aria-label="size 3 select example" onChange={onChangeOptionClient}>
                    {dataClientList.map((data, value) => (
                        <option key={value} value={data.id}>{data.nombre}</option>
                    ))}
                </select>


                <table className="table table-secondary mt-5">
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Número</th>
                        <th scope="col">Minutos plan</th>
                        <th scope="col">Total minutos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataPhoneSelect.map((data, value) => (
                                
                                <tr key={value} className={statusPlan[value]}>
                                    <td>{data.cliente.nombre}</td>
                                    <td>{data.numero}</td>
                                    <td>{data.minutos_plan}</td>
                                    <td>200</td>
                                </tr>
                            ))
                        }       
                    </tbody>
                </table>


                <p className="mt-5">Registro de llamadas.</p>
                <hr className="border border-primary border-3 opacity-75 w-100" />
                
                <table className="table table-secondary mt-5 mb-5" id="logs">
                    <thead>
                        <tr>
                        <th scope="col">Duración (minutos)</th>
                        <th scope="col">Número</th>
                        <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            callLogs.length > 0 ? 
                            (
                             
                                callLogs.map((data, value) => (
                                    <tr key={value}>
                                        <td>{data.duration}</td>
                                        <td>{data.number}</td>
                                        <td>{data.date}</td>
                                    </tr>
                                ))
    
                            )
                            :
                              undefined
                        }       
                    </tbody>
                </table>

                {
                    callLogs.length == 0 ? 
                    (
                        <div className="alert alert-warning" role="alert">
                            No se encontraron registros.
                        </div>

                    )
                    :
                    undefined

                }

                
            </div>
        </>
    )
}