import React, {useState} from 'react';
import axios from 'axios'


const ServiceForm = (props) => {
    const [inputs, handleInputs] = useState({description: '', service_done: '', milage: '', date_serviced: '', receipt: ''})
    const submit = () => {
        const {description, service_done, milage, date_serviced, receipt} = inputs
        const {id} = props
        axios.post('/api/maintenance', {id, description, service_done, milage, date_serviced, receipt}).then(props.clicker)
    }
    return(
        <div>
            <input onChange={(e)=> handleInputs({...inputs, service_done: e.target.value})} placeholder='Service Completed' />
            <textarea onChange={(e)=> handleInputs({...inputs, description: e.target.value})} placeholder='Description' />
            <input onChange={(e)=> handleInputs({...inputs, milage: e.target.value})} placeholder='Milage' type='number'/>
            <input onChange={(e)=> handleInputs({...inputs, date_serviced: e.target.value})} placeholder='Date Serviced' type='date' />
            <h1>S3 thing i don't know how to do</h1>
            <button onClick={submit}>Add Maintenance</button>
        </div>
    )
}
export default ServiceForm