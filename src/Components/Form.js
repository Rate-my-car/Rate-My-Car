import React, {useState} from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';




const Form = (props) => {
    const [inputs, handleInputs] = useState({model: '', make: '', year: '', vin: ''})
    const postCar = () => {
        const {model, make, year, vin} = inputs
        axios.post('/api/car', {model, make, year, vin}).then(()=> {
            props.history.push('/MyVehicles')
        })
    }
    return(
        <div>
            <input placeholder='Make' onChange={(e)=>handleInputs({...inputs, make: e.target.value})} />
            <input placeholder='Model' onChange={(e)=>handleInputs({...inputs, model: e.target.value})} />
            <input placeholder='Year' type='number' onChange={(e)=>handleInputs({...inputs, year: e.target.value})} />
            <input placeholder='Vin' onChange={(e)=>handleInputs({...inputs, vin: e.target.value})} />
            <button onClick={postCar}>Add Car</button>
        </div>
    )
}
export default withRouter(Form)