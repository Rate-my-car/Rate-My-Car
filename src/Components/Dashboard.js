import React, { useState, useEffect } from 'react';
// import useAxios from '../hooks/useAxios';

import axios from 'axios'


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
        <div>Dashboard
            <div>
                INFO Container
            </div>
            <div>
                Featured
                {carsForSale.map(cars => {
                    return(
                        <div>
                           
                            YEAR:<div>{cars.year}</div>
                            MAKE:<div>{cars.make}</div>
                            MODEL:<div>{cars.model}</div>
                            OWNER: <div>{cars.username}</div>
                            MILAGE:<div>{cars.milage}</div>
                            PRICE:<div>{cars.price}</div>
                            
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