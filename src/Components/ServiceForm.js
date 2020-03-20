import React, {useState} from 'react';
import axios from 'axios'


const ServiceForm = (props) => {
    const [inputs, handleInputs] = useState({description: '', service_done: '', milage: '', date_serviced: '', receipt: ''})
    const submit = () => {
        const {description, service_done, milage, date_serviced, receipt} = inputs
        const {id} = props
        axios.post('/api/maintenance', {id, description, service_done, milage, date_serviced, receipt}).then(props.clicker)
    }

    console.log(props)
    return(
        <div>
            <div className='pop-up-container'>
                <h2 className='popup-heading'>Add Maintenance</h2>
                <hr className='centered-line' id='inv-popup-line'/>
                <input className='popup-input' onChange={(e)=> handleInputs({...inputs, service_done: e.target.value})} placeholder='Service Completed' />
                <textarea className='popup-input' onChange={(e)=> handleInputs({...inputs, description: e.target.value})} placeholder='Description' />
                <input className='popup-input' onChange={(e)=> handleInputs({...inputs, milage: e.target.value})} placeholder='Mileage' type='number'/>
                <input className='popup-input' onChange={(e)=> handleInputs({...inputs, date_serviced: e.target.value})} placeholder='Date Serviced' type='date' />
                <div className='popup-buttons-container'>
                    <button className='cancel-btn' onClick={props.clicker}>Cancel</button>
                    <button className='save-btn' onClick={submit}>Add</button>
                </div>
            </div>
            <div className='background-overlay' onClick={props.clicker}></div>
        </div>
    )
}
export default ServiceForm
