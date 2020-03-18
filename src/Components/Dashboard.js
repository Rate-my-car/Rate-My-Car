import React, { useState, useEffect } from 'react';
// import useAxios from '../hooks/useAxios';

import axios from 'axios'
import './styling/Dashboard.scss'

const Dashboard = (props) => {
    const [featuredCars, setFeaturedCars] = useState([])

    useEffect(() => {
        axios.get('/api/forsale').then(res => {
            let list = []
            for(let i = 0; i < 4; i++){
                list.push(res.data[Math.ceil(Math.random()* list.length)])
            }
            setFeaturedCars(list)
        }).catch(err => console.log(err))
    }, [])

    console.log(featuredCars)

    // const mappedFeaturedCars = featuredCars.map((car, i) => {
    //     const year
    // })


    // const mappedCampgrounds = campgrounds.map((campground, i) => {
    //     const {campground_id, campground_img, park_name, campground_name} = campground
    //     return (
    //         <div key={i} className='campground-container' onClick={() => props.history.push(`/campground/${campground_id}`)}>
    //             <img id='campground-preview-img' src={campground_img} alt={campground_name} />
    //             <p className='preview-park-name'>{park_name}</p>
    //             <h3 className='preview-campground-name'>{campground_name}</h3>
    //         </div>
    //     )
    // })


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
            <h2>Featured Vehicles</h2>

            <div className='featured-vehicles-container'>
                
                {featuredCars.map(cars => {
                    return(
                        <div className='featured-vehicle-container'>
                            <img className='featured-vehicle-img'/>
                            <h3 className='featured-vehicle-title'>Year Make Model Model</h3>
                            <p className='featured-vehicle-mileage'>Mileage: 120,000</p>
                            <h4 className='featured-vehicle-price'>Price: $35,000</h4>
                           
                            {/* YEAR:<div>{cars.year}</div>
                            MAKE:<div>{cars.make}</div>
                            MODEL:<div>{cars.model}</div>
                            OWNER: <div>{cars.username}</div>
                            MILAGE:<div>{cars.milage}</div>
                            PRICE:<div>{cars.price}</div> */}
                            
                            {/* OWNERINFO */}
                            {/* <button> Details </button> */}
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Dashboard