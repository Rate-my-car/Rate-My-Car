import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './styling/Services.scss'

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
                <td role='cell'>{(new Intl.NumberFormat().format(el.milage))}</td>
                <td role='cell'>{el.date_serviced}</td>
            </tr>
        )
    })
    return(
        <div>
            <h2 className='table-name'>Maintenance History</h2>
            <div className='maintenance-table-container'>
                <table role='table' className='maintenance-table'>
                    <thead role="rowgroup">
                        <tr role="row">
                            <th role="columnheader" nowrap>Maintenance Type</th>
                            <th role="columnheader" nowrap>Description</th>
                            <th role="columnheader" nowrap>Mileage</th>
                            <th role="columnheader" nowrap>Date Serviced</th>
                        </tr>
                    </thead>
                    <tbody role='rowgroup'>
                        {mappedArr}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Services