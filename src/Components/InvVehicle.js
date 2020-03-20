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
                                      car_id: res.data[0].car_id,
                                      car_image: res.data[0].car_image,
                                     
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
            <div className='inv-vehicle-img-info-container'>
                <img className='inv-vehicle-img' src = {mounting.car_image}/>
                <div className='inv-vehicle-info-container'>
                    <h1 className='inv-vehicle-name'>{mounting.year} {mounting.make} {mounting.model}</h1>
                    <h3 className='inv-vehicle-vin'>VIN: {mounting.vin}</h3>
                    <hr/>
                    {currentOwner === props.user.user_id ? 
                        rendering.posting ? (
                            <div>
                                <div className='pop-up-container'>
                                    <h2 className='popup-heading'>Post Vehicle<br/>For Sale</h2>
                                    <hr className='centered-line' id='inv-popup-line'/>
                                    <textarea className='popup-input' placeholder='Vehicle Description and Contact Info' onChange={(e)=>handleInputs({...inputs, description: e.target.value})} />                        
                                    <input className='popup-input' placeholder='Mileage' onChange={(e)=>handleInputs({...inputs, milage: e.target.value})} />
                                    <input className='popup-input' placeholder='Price' type='number' onChange={(e)=>handleInputs({...inputs, price: e.target.value})} />
                                    <input className='popup-input' placeholder='Location' onChange={(e)=>handleInputs({...inputs, location: e.target.value})} />
                                    <div className='popup-buttons-container'>
                                        <button className='cancel-btn' onClick={clicker2}>Cancel</button>
                                        <button className='save-btn' onClick={postCar}>Post For Sale</button>
                                    </div>
                                </div>
                                <div className='background-overlay' onClick={clicker2}></div>
                            </div>
                        ):(
                            <button className='post-vehicle-for-sale-btn' onClick={clicker2}>Post Vehicle for Sale</button>
                        ):
                        null
                    }
                    <Ownership id={props.match.params.id}/>
                </div>
                
            </div>

            <Services id={props.match.params.id} />

            { currentOwner === props.user.user_id ? 
            !rendering.bool ? (
                <div className='add-maintenance-btn-container'>
                    <button className='add-maintenance-btn' onClick={clicker}>Add Maintenance</button>
                </div>
            ):(
                <ServiceForm clicker={clicker} id={props.match.params.id} />
            ) : null} 

                    

            
        </div>
    )
}

function mapProps(state){
    return {user: state.reducer.user}
}

export default connect(mapProps)(InvVehicle)