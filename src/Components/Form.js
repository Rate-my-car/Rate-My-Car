import React, {useState} from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import './styling/Form.scss'




const Form = (props) => {
    const [inputs, handleInputs] = useState({model: '', make: '', year: '', vin: ''})
    const postCar = () => {
        const {model, make, year, vin} = inputs
        axios.post('/api/car', {model, make, year, vin}).then((res)=> {
            props.history.push(`/vehicles/${res.data[0].car_id}`)
        })
    }
    return(
        <div className='form-container'>
            <input value={inputs.make} placeholder='Make' onChange={(e)=>handleInputs({...inputs, make: e.target.value})} />
            <input value={inputs.model} placeholder='Model' onChange={(e)=>handleInputs({...inputs, model: e.target.value})} />
            <input value={inputs.year} placeholder='Year' type='number' onChange={(e)=>handleInputs({...inputs, year: e.target.value})} />
            <input value={inputs.vin} placeholder='Vin' onChange={(e)=>handleInputs({...inputs, vin: e.target.value})} />
            <button onClick={postCar}>Add Car</button>
        </div>
    )
}
export default withRouter(Form)