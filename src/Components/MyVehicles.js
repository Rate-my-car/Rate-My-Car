import React, {useState} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux"


const MyVehicles = (props) => {
    const [inputs, handleInputs] = useState({description: '', milage: '', price:'', location: '', sold: ''})
    const postCar = () => {
        const {description, milage, price, location, sold} = inputs
        const {user_id} = props.user
        axios.post('/api/sale', {user_id, description, milage, price, location, sold}).then(()=> {
            props.history.push('/forSale')
        })
    }


    console.log(props.user)

    return(

        <div>
            <input placeholder='Description' onChange={(e)=>handleInputs({...inputs, description: e.target.value})} />
            <input placeholder='Milage' onChange={(e)=>handleInputs({...inputs, milage: e.target.value})} />
            <input placeholder='Price' type='number' onChange={(e)=>handleInputs({...inputs, price: e.target.value})} />
            <input placeholder='Location' onChange={(e)=>handleInputs({...inputs, location: e.target.value})} />
            <input placeholder='Sold' onChange={(e)=>handleInputs({...inputs, sold: e.target.value})} />
            <button onClick={postCar}>Add Car For Sale</button>
        </div>
    )
}

function mapProps(state){
    return {user: state}
}


export default withRouter(connect(mapProps)(MyVehicles))