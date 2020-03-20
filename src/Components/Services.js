import React, {useEffect, useState} from 'react';
import axios from 'axios'

const Services = (props) => {
    useEffect(()=> {
        const {id} = props
        axios.get(`/api/maintenance/${id}`).then(res=> {
            handleArray({...array, maintenance: res.data})
        })
    },[])
    const [array, handleArray] = useState({maintenance: []})
    const mappedArr = array.maintenance.map((el)=> {
        return (
            <tr>
                <td role='cell'>{el.service_done}</td>
                <td role='cell'>{el.description}</td>
                <td role='cell'>{el.milage}</td>
                <td role='cell'>{el.date_serviced}</td>
            </tr>
        )
    })
    return(
        <div>
            <table role='table'>
            <thead role="rowgroup">
                <tr role="row">
                    <th role="columnheader">Service Done</th>
                    <th role="columnheader">Description</th>
                    <th role="columnheader">Milage</th>
                    <th role="columnheader">Date Serviced</th>
                </tr>
            </thead>
                <tbody role='rowgroup'>
                    
                    {mappedArr}
                </tbody>
            </table>
        </div>
    )
}
export default Services