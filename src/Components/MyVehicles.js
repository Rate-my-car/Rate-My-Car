import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux"
import './styling/MyVehicles.scss'


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

    const changePosting = () => {
        handleInputs({...inputs, posting: !inputs.posting})
    }
    
    console.log(props.user.reducer.user.user_id)
    return(

        <div className='my-vehicles-container'>
            {!mappedUserCars[0] ? (
                <div>
                    {props.user.reducer.user.user_id ? (
                        <div>
                            <h1>Please add a car</h1>
                            <button onClick={changePosting}>Add Car</button>
                        </div>
                    ):(
                        <h1>Please Login</h1>
                    )}
                </div>
            ):(
                <div>
                    {mappedUserCars}
                    <button onClick={changePosting}>Add Car</button>
                    {inputs.posting ? (
                        <div>
                            <input placeholder='Description' onChange={(e)=>handleInputs({...inputs, description: e.target.value})} />
                            <input placeholder='Milage' onChange={(e)=>handleInputs({...inputs, milage: e.target.value})} />
                            <input placeholder='Price' type='number' onChange={(e)=>handleInputs({...inputs, price: e.target.value})} />
                            <input placeholder='Location' onChange={(e)=>handleInputs({...inputs, location: e.target.value})} />
                            <input placeholder='Sold' onChange={(e)=>handleInputs({...inputs, sold: e.target.value})} />
                            <button onClick={postCar}>Add Car For Sale</button>
                        </div>
                    ):(
                        <div></div>
                    )}
                </div>
            )}
        </div>
    )
}

function mapProps(state){
    return {user: state}
}


export default withRouter(connect(mapProps)(MyVehicles))