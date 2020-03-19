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
                
                  {/* <ul>
                    //  {searchResults.map(item => (
                    //      <li>{item}</li>
                    //  ))}
                //  </ul> */}
                {carsForSale.map(carsForSale => {
                    return(
                        <div className='car-for-sale-container'>
                            <img className='car-for-sale-img' src='' />
                            <div className='car-for-sale-info-container'>
                                <div className='car-for-sale-title-location'>
                                    <h2 className='car-for-sale-title'>Year Make Model Filler-Text</h2>
                                    <p className='car-for-sale-location'>Sandy, UT</p>
                                </div>
                                <p className='car-for-sale-description'>
                                    Description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description.
                                </p>
                                <h3 className='car-for-sale-price'>Price: $39,999</h3>
                            </div>
                            <button className='car-for-sale-details-btn'>Details</button>
                            {/* <div>{carsForSale.image}</div>
                            MAKE: <div>{carsForSale.make}</div>
                            MODEL: <div>{carsForSale.model}</div>
                            YEAR: <div>{carsForSale.year}</div>
                            LOCATION:<div>{carsForSale.location}</div>
                            DESCRIPTION:<div>{carsForSale.description}</div>
                            MILAGE:<div>{carsForSale.milage}</div>
                            PRICE:<div>{carsForSale.price}</div> */}
                            
                            {/* OWNERINFO */}
                            
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}
export default ForSale