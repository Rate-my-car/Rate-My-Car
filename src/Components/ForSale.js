import React, { Component } from 'react';
import useAxios from '../hooks/useAxios'

const ForSale = () => {
    const [carsForSale] = useAxios('/api/ForSale')
    console.log(carsForSale)

    // const pushForSale = (car_id) => {



        // axios.get('/api/forsale', {car_id})
        // .then(() => {
        //     history.push('/')
        // })
    // }


    return(
        <div>
            <div>
                {carsForSale.map(carsForSale => {
                    return(
                        <div>
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