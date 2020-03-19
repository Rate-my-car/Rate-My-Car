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


    console.log(featuredCars)


    // maint_id: 4
    // car_id: 6
    // user_id: 13
    // sold: false
    // description: "really cool car"
    // milage: 100
    // price: 120000
    // location: "AF"
    // make: "Ford"
    // model: "Raptor"
    // vin: "1234596867"
    // year: 2020
    // car_image
let number = 56000

console.log(new Intl.NumberFormat().format(number));
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
                            <img className='featured-vehicle-img' src={cars.car_image}/>
                            <h3 className='featured-vehicle-title'>{cars.year} {cars.make} {cars.model}</h3>
                            <p className='featured-vehicle-mileage'>Mileage: {cars.milage}</p>
                            <h4 className='featured-vehicle-price'>Price: ${(new Intl.NumberFormat().format(cars.price))}</h4> 
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Dashboard