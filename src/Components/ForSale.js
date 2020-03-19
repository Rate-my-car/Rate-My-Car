import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios'
import ReactDOM from 'react-dom'
import './styling/ForSale.scss'

const ForSale = (props) => {
    const [inputs, handleInputs] = useState({search: ''})
    const [carsForSale] = useAxios('/api/forsale')
    console.log(carsForSale)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const handleChange = e => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        const results = carsForSale.filter(vehicle =>
            vehicle.toLowerCase().includes(searchTerm)
        )
        setSearchResults(results);
    }, [searchTerm]);

   


    return(
        <div className='for-sale-container'>
            <div>
                <h1 className='vehicles-for-sale-heading-text'>Vehicles for Sale</h1>
                <hr className='centered-line' id='my-vehicles-line'/>
                <input 
                type = 'text'
                placeholder= 'SEARCH VEHICLES' 
                value= {searchTerm}
                onChange = {handleChange}
                />
                
                {/* maint_id: 4
                car_id: 6
                user_id: 13
                sold: false
                description: "really cool car"
                milage: 100
                price: 120000
                location: "AF"
                make: "Ford"
                model: "Raptor"
                vin: "1234596867"
                year: 2020
                car_image */}


                {carsForSale.map(carsForSale => {
                    return(
                        <div className='car-for-sale-container'>
                            <img className='car-for-sale-img' src={carsForSale.car_image} />
                            <div className='car-for-sale-info-container'>
                                <div className='car-for-sale-title-location'>
                                    <h2 className='car-for-sale-title'>{carsForSale.year} {carsForSale.make} {carsForSale.model}</h2>
                                    <p className='car-for-sale-location'>{carsForSale.location}</p>
                                </div>
                                <p className='car-for-sale-description'>{carsForSale.description}</p>
                                <h3 className='car-for-sale-price'>Price: ${carsForSale.price}</h3>
                            </div>
                            <button className='car-for-sale-details-btn'>Details</button>
                            
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}
export default ForSale