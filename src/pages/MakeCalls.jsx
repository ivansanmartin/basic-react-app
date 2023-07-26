import { useEffect, useState } from "react"

export const MakeCall = ({dataClientList, dataPhoneList}) => {

    const [finalDataPhones, setFinalPhones] = useState([])
    const [selectedPhone, setPhone] = useState("")
    const [minutesCall, setMinutesCall] = useState(0)
    const [dataCall, setDataCall] = useState({
        id_client: "",
        name: "",
        number: "",
        callTime: ""
    })
    const [sucessCreation, setSuccess] = useState(false)
    const [counterSuccess, setCounter] = useState(0)

    const onChangeOptionClient = (e) => {
        setFinalPhones(dataPhoneList.filter(data => data.cliente_id == e.target.value))
    
    }
    
    const onChangeOptionPhone = (e) => {
        try {
            setPhone(e.target.options[e.target.selectedIndex].innerText)
            
        } catch (error) {
            setPhone(undefined)
            
        }

    }

    const onSaveDataLocal = () => {

        const logCalls = [{
            clienteId: "",
            number: "",
            duration: "",
            date: ""
        }]

  
        try {
            const addLogCall = JSON.parse(localStorage.getItem("call_logs"))
            dataCall.id_client = finalDataPhones[0].cliente_id
            dataCall.name = finalDataPhones[0].cliente.nombre
            dataCall.number = selectedPhone
            dataCall.callTime = minutesCall

            
            if (addLogCall) {
                addLogCall.map(data => {
                    logCalls.push(data)
                })
            }
            
            //Call logs
            let day = new Date().getDate()
            let month = new Date().getMonth()
            let year = new Date().getFullYear()
            logCalls[0].clienteId = finalDataPhones[0].cliente_id
            logCalls[0].number = selectedPhone
            logCalls[0].duration = parseInt(minutesCall)
            logCalls[0].date = `${day}/${month+1}/${year}`
  
            
            if (dataCall.name == "" || dataCall.number == "" || dataCall.callTime == "") {
                alert("Campos sin rellenar, revisalos!")
                return
            } else {
                let newData = []
                let info
                const phones = JSON.parse(localStorage.getItem("phones"))
                info = phones.map((data) => {
                    if (data.cliente_id == dataCall.id_client && data.numero == dataCall.number) {
                        if (data.minutos_plan == 0 || parseInt(dataCall.callTime) > parseInt(data.minutos_plan)) {
                            alert("Este cliente ya no cuenta con minutos o excediste su plan")
                        } else {
                            data.minutos_plan = data.minutos_plan - dataCall.callTime
                            setSuccess(true)
                            setCounter(counterSuccess+1)
                            localStorage.setItem("call_logs", JSON.stringify(logCalls))


                        }
                    }
            
                    
                    newData.push(data)
                })
           
                
                





                localStorage.setItem("phones", JSON.stringify(newData))

            }
            
 


        } catch (error) {
            return
            
        }

    }

    const onChangeMinutes = (e) => {
        const value = e.target.value
        if (value <= 0 || value == "" || value.match(/[e|.]/)) {
            return
        } else {
            setMinutesCall(parseInt(e.target.value))
        }
        


    }

    return (
        <>
            <div className="container d-flex align-items-center flex-column mt-5 fs-3 fw-light">
                <p>Para agregar llamadas, selecciona un cliente de la lista.</p>
                <hr className="border border-primary border-3 opacity-75 w-100" />

                <select className="form-select w-50" size="5" aria-label="Clients" onChange={onChangeOptionClient}>
                    {dataClientList.map(data => (
                        <option key={data.id} value={data.id}>{data.nombre}</option>
                    ))}
                </select>

                <p className="mt-5">Seleccionar número del cliente.</p>
                <hr className="border border-primary border-3 opacity-75 w-100" />

                <select className="form-select w-50" size="5" aria-label="Phones" onBlur={onChangeOptionPhone}>
                    {
                        finalDataPhones.length == 0 ? (
                            <option>Selecciona un cliente...</option>) 

                            : (finalDataPhones.map((data, value) => (
                            <option key={value} value={data.cliente_id}>{data.numero}</option>
                        )))
                    }

                </select>

                <p className="mt-5">Ingresa lo minutos de la llamada.</p>
                <hr className="border border-primary border-3 opacity-75 w-100" />


                <div className="input-group input-group-sm mb-3 mt-5 col-xs-1 w-50">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Minutos</span>
                    <input type="number" min={0} step={1} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={onChangeMinutes} />
                    
                </div>



                {
                        minutesCall > 200 ?
                        (
                          
                        <div className="alert alert-warning p-1 d-flex align-items-center" role="alert">
                            <p className="fs-6 m-0">No puedes hacer llamadas de mas de 200 minutos</p>
                        </div>
                        )
                        :
                        (undefined)
                        
                }

                <div className="mt-5 mb-5">
                    <button type="button" className="btn btn-success" onClick={onSaveDataLocal}><a href="#notify">Crear llamada</a></button>
                </div>

                {
                    sucessCreation ? (

                        <button type="button" id="notify" className="btn btn-info position-relative mb-5">
                            ¡Llamada creada exitosamente!
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {counterSuccess}
                            </span>
                        </button>
                    )
                    :
                    undefined
                
                }


            </div>
        </>
    )
}