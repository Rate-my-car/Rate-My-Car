import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios'
import ReactDOM from 'react-dom'

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
        <div>
            <div>
                <input 
                type = 'text'
                placeholder= 'SEARCH VEHICLES' 
                // value= {searchTerm}
                // onChange = {handleChange}
                />
                
                //  {/* <ul>
                    //  {searchResults.map(item => (
                    //      <li>{item}</li>
                    //  ))}
                //  </ul> */}
                {carsForSale.map(carsForSale => {
                    return(
                        <div>
                            <div>{carsForSale.image}</div>
                            MAKE: <div>{carsForSale.make}</div>
                            MODEL: <div>{carsForSale.model}</div>
                            YEAR: <div>{carsForSale.year}</div>
                            LOCATION:<div>{carsForSale.location}</div>
                            DESCRIPTION:<div>{carsForSale.description}</div>
                            MILAGE:<div>{carsForSale.milage}</div>
                            PRICE:<div>{carsForSale.price}</div>
                            
                            {/* OWNERINFO */}
                            <button> Details </button>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}
export default ForSale