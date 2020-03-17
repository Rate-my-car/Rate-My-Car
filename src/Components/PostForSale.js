// import React, { useState, useEffect } from 'react';
// import useAxios from '../hooks/useAxios'
// import { withRouter } from 'react-router-dom'
// import axios from 'axios'

// const PostForSale = (props, history) => {
//     useEffect(() => {
//         const {id} = props 
//         axios.get(`/api/cars/${id}`).then(res => {
            
//         })
//     })
//     const [vehicleForSale] = useAxios('/api/sale')

//     const pushForSale = (id) => {
//         axios.post('/api/sale')
//         .then(() => {
//             history.push('/ForSale')
//         })
//     }

//     return(
//         <div>
//             {/* SOLD: <input placeholder= 'sold'></input> */}
//             DESCRIPTION: <input placeholder='description'></input>
//             MILAGE: <input placeholder= 'milage'></input>
//             PRICE: <input placeholder= 'price'></input>
//             LOCATION: <input placeholder= 'location'></input>
//             <button onClick = {() => 
//             pushForSale(id)}>POST FOR SALE</button>

//         </div>
//     )

// }

// export default PostForSale 