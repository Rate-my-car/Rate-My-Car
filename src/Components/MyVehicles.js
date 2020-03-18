import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux"
import './styling/MyVehicles.scss'
import Form from './Form'


const MyVehicles = (props) => {
    useEffect(()=> {
        const {user_id} = props.user
        axios.get(`api/user/cars/${user_id}`).then(res=> { console.log(res.data)
            handleInputs({...inputs, myCars: res.data})
        })
    }, [])
    
    const [inputs, handleInputs] = useState({myCars: [], description: '', milage: '', price:'', location: '', sold: '', car_id: 0, posting: false})
    let mappedUserCars = inputs.myCars.map((el)=> {
        return(
            <div onClick={()=> props.history.push(`/vehicles/${el.car_id}`)}>
                <h1>{el.make}</h1>
                <h1>{el.model}</h1>
                <h1>{el.year}</h1>
                <img src = {el.car_image}/> 
            </div>
        )
    })
    
    console.log(props.match.params.id)
    console.log(props.user)
    console.log(inputs.posting)

    const changePosting = () => {
        props.history.push('/form')
    }
    
    console.log(props.user)
    return(
        console.log(inputs.myCars[0]), 
        <div className='my-vehicles-container'>
            
                <div>
                    {props.user.user_id ? (
                        <div>
                            {inputs.myCars[0] ? mappedUserCars : <h1>Please add a car</h1> }
                            
                        </div>
                    ):(
                        <h1>Please Login</h1>
                    )}
                </div>
                <button onClick={changePosting}>Add Car</button>
        </div>
    )
}

function mapProps(state){
    return {user: state.reducer.user}
}


export default withRouter(connect(mapProps)(MyVehicles))