import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Services from './Services'
import ServiceForm from './ServiceForm'; 
import {connect} from 'react-redux'; 
import Ownership from './Ownership'
import './styling/InvVehicle.scss';


const InvVehicle = (props) => {
    useEffect(()=> {
        console.log(props.match.params.id)
        const {id} = props.match.params
        axios.get(`/api/cars/${id}`).then(res=> {
            // console.log(res.data)
            handleMount({...mounting, make: res.data[0].make,
                                      model: res.data[0].model,
                                      year: res.data[0].year,
                                      vin: res.data[0].vin,
                                      car_id: res.data[0].car_id
                                     
            })
        })
    },[])

    const [currentOwner, setCurrentOwner] = useState(0)

    useEffect(() => { 
        const {id} = props.match.params
        // console.log(id)
        axios.post('/api/owner',{id}).then(res => {setCurrentOwner(res.data[0].user_id) })

    },[])
   
    const [mounting, handleMount] = useState({car_image: '', make: '', model: '', year: 0, vin: '', car_id: null})
    const [rendering, changeRender] = useState({bool: false, posting: false})
    const [inputs, handleInputs] = useState({car_image: '', description: '', milage: '', price:'', location: '', sold: false})


    const postCar = () => {
        const {car_image, description, milage, price, location, sold} = inputs
        const {car_id} = mounting
        const {user_id} = props.user
        // console.log(inputs,car_id,user_id)
        axios.post('/api/sale', {car_id, user_id, car_image, description, milage, price, location, sold}).then(()=> {
            props.history.push('/')
        })
    }

    // console.log(props.user)
    
    const clicker = () => {
        changeRender({...rendering, bool: !rendering.bool})
    }
    const clicker2 = () => {
        changeRender({...rendering, posting: !rendering.posting})
    }
    return(
        <div className='inv-vehicle-container'>
            <img src = {mounting.car_image}/>
            <span>{mounting.make}</span>
            <span>{mounting.model}</span>
            <span>{mounting.year}</span>
            <span>{mounting.vin}</span>
            
            <Services id={props.match.params.id} />

           {/* {console.log(currentOwner,props.user.user_id)} */}
            { currentOwner === props.user.user_id ? 
            !rendering.bool ? (
                <button onClick={clicker}>Post Maintenance</button>
            ):(
                <ServiceForm clicker={clicker} id={props.match.params.id} />
            ) : null} 

                    

                {/* {console.log(mounting.car_id)} */}
            <Ownership id={props.match.params.id}/>
            {/* <button onClick= {() => this.props.history.push(`/postforsale`)}> SELL VEHICLE </button> */}

            {currentOwner === props.user.user_id ? 
            rendering.posting ? (
                <div>
                    <input placeholder='Description' onChange={(e)=>handleInputs({...inputs, description: e.target.value})} />                        
                    <input placeholder='Milage' onChange={(e)=>handleInputs({...inputs, milage: e.target.value})} />
                    <input placeholder='Price' type='number' onChange={(e)=>handleInputs({...inputs, price: e.target.value})} />
                    <input placeholder='Location' onChange={(e)=>handleInputs({...inputs, location: e.target.value})} />
                  
                    <button onClick={postCar}>Add Car For Sale</button>
                </div>):(
                    <button onClick={clicker2}>Post for Sale</button>
                ):
                null
            }
        </div>
    )
}

function mapProps(state){
    return {user: state.reducer.user}
}

export default connect(mapProps)(InvVehicle)