import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios'
import axios from 'axios'
import ReactDOM from 'react-dom'
import './styling/ForSale.scss'

const ForSale = (props) => {
    const [inputs, handleInputs] = useState({search: ''})
    const [carsForSale] = useAxios('/api/forsale')
    console.log(carsForSale)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const handleChange = e => {
        let model = e.target.value
        axios.post('/api/search', {model}).then(res => {
            setSearchResults({searchResults: res.data})
        })
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



                {carsForSale.map(carsForSale => {
                    return(
                        <div className='car-for-sale-container' >
                            <img className='car-for-sale-img' src={carsForSale.car_image} />
                            <div className='car-for-sale-info-container'>
                                <div className='car-for-sale-title-location'>
                                    <h2 className='car-for-sale-title'>{carsForSale.year} {carsForSale.make} {carsForSale.model}</h2>
                                    <p className='car-for-sale-location'>{carsForSale.location}</p>
                                </div>
                                <p className='car-for-sale-description'>{carsForSale.description}</p>
                                <h3 className='car-for-sale-price'>Price: ${(new Intl.NumberFormat().format(carsForSale.price))}</h3>
                            </div>
                            <button className='car-for-sale-details-btn' onClick={() => props.history.push(`/vehicles/${carsForSale.car_id}`)}>Details</button>                            
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}
export default ForSale