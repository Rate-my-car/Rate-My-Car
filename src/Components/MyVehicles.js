import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux"
import './styling/MyVehicles.scss'
import Form from './Form'


const MyVehicles = (props) => {
    useEffect(()=> {
        const {user_id} = props.user
        axios.get(`api/users/cars/${user_id}`).then(res=> {
            handleInputs({...inputs, myCars: res.data})
        })
    }, [])
    
    const [inputs, handleInputs] = useState({myCars: [], description: '', milage: '', price:'', location: '', sold: '', car_id: 0, posting: false})
    const postCar = () => {
        const {description, milage, price, location, sold} = inputs
        const {user_id} = props.user
        axios.post('/api/sale', {user_id, description, milage, price, location, sold}).then(()=> {
            props.history.push('/')
        })
    }
    let mappedUserCars = inputs.myCars.map((el)=> {
        return(
            <div onClick={()=> props.history.push(`/vehicles/${el.car_id}`)}>
                <h1>{el.make}</h1>
                <h1>{el.model}</h1>
                <h1>{el.year}</h1>
            </div>
        )
    })
    
    console.log(props.match.params.id)
    console.log(props.user)
    console.log(inputs.posting)

    const changePosting = () => {
        handleInputs({...inputs, posting: !inputs.posting})
    }
    
    console.log(props.user.reducer.user.user_id)
    return(

        <div className='my-vehicles-container'>
            
                <div>
                    {props.user.reducer.user.user_id ? (
                        <div>
                            <h1>Please add a car</h1>
                        </div>
                    ):(
                        <h1>Please Login</h1>
                    )}
                </div>
            
                <div>
                    {mappedUserCars}
                    {inputs.posting ? (
                        <Form />
                    ):(    
                        <button onClick={changePosting}>Add Car</button>
                    )}
                </div>
            
        </div>
    )
}

function mapProps(state){
    return {user: state}
}


export default withRouter(connect(mapProps)(MyVehicles))