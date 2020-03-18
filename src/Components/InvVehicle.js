import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Services from './Services'
import ServiceForm from './ServiceForm'



const InvVehicle = (props) => {
    useEffect(()=> {
        console.log(props.match.params.id)
        const {id} = props.match.params
        axios.get(`/api/cars/${id}`).then(res=> {
            console.log(res.data)
            handleMount({...mounting, make: res.data[0].make,
                                      model: res.data[0].model,
                                      year: res.data[0].year,
                                      vin: res.data[0].vin
            })
        })
    },[])
    console.log()
    const [mounting, handleMount] = useState({make: '', model: '', year: 0, vin: ''})
    const [rendering, changeRender] = useState({bool: false})
    const clicker = () => {
        changeRender({...rendering, bool: !rendering.bool})
    }
    return(
        <div>
            <span>{mounting.make}</span>
            <span>{mounting.model}</span>
            <span>{mounting.year}</span>
            <span>{mounting.vin}</span>
            <Services id={props.match.params.id} />
            {!rendering.bool ? (
                <button onClick={clicker}>Post Maintenance</button>
            ):(
                <ServiceForm clicker={clicker} id={props.match.params.id} />
            )}
            <button onClick= {() => this.props.history.push(`/postforsale`)}> SELL VEHICLE </button>
        </div>
    )
}
export default InvVehicle