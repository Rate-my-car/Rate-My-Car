import React, { useState, useEffect } from 'react';
// import useAxios from '../hooks/useAxios';

import axios from 'axios'
import './styling/Dashboard.scss'

const Dashboard = (props) => {
    const [carsForSale, setFeatured] = useState([])

    useEffect(() => {
        axios.get('/api/forsale').then(res => {
            let list = []
            for(let i = 0; i < 4; i++){
                list.push(res.data[Math.ceil(Math.random()* list.length)])
            }
            setFeatured(list)
        }).catch(err => console.log(err))
    }, [])

    console.log(carsForSale)

    



    return(
        <div className='dashboard-container'>
            <div className='hero-container'>
                <div className='hero'>
                    <div className='hero-content'>
                        <h1 id='hero-heading-text'>Welcome to Checkup!</h1>
                        <hr id='hero-line'/>
                        <p id='hero-body-copy'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                    </div>
                </div>
            </div>
            <div>
                Featured Vehicles
                {carsForSale.map(cars => {
                    return(
                        <div>
                           
                            {/* YEAR:<div>{cars.year}</div>
                            MAKE:<div>{cars.make}</div>
                            MODEL:<div>{cars.model}</div>
                            OWNER: <div>{cars.username}</div>
                            MILAGE:<div>{cars.milage}</div>
                            PRICE:<div>{cars.price}</div> */}
                            
                            {/* OWNERINFO */}
                            <button> Details </button>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Dashboard