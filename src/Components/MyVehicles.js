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
            <div className='my-vehicle-container' onClick={()=> props.history.push(`/vehicles/${el.car_id}`)}>
                <img className='my-vehicle-car-img' src={el.car_image}/>
                <div className='my-vehicle-car-info-container'>
                    <h2 className='my-vehicle-car-title'>{el.year} {el.make} {el.model}</h2>
                    <p className='my-vehicle-car-vin'>VIN: {el.vin}</p>
                </div>
                {/* <h1></h1>
                <h1></h1> */}
            </div>
        )
    })
    
    console.log(props.match.params.id)
    console.log(props.user)
    console.log(inputs.myCars)

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
                            <h1>My Vehicles</h1>
                            <hr className='centered-line' id='my-vehicles-line' />
                            {inputs.myCars[0] ? mappedUserCars : <h1>Please add a car</h1> }
                            <div className='my-vehicles-add-car-btn-container'>
                                <button className='my-vehicles-add-car-btn' onClick={changePosting}>Add Car</button>
                            </div>
                        </div>
                    ):(
                        <h1>Please Login</h1>
                    )}
                </div>
        </div>
    )
}

function mapProps(state){
    return {user: state.reducer.user}
}


export default withRouter(connect(mapProps)(MyVehicles))