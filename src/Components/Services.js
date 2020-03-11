import React, {useEffect, useState} from 'react';
import axios from 'axios'

const Services = (props) => {
    useEffect(()=> {
        const {id} = props
        axios.get(`/api/maintenance/${id}`).then(res=> {
            handleArray({...array, maintenance: res.data})
        })
    })
    const [array, handleArray] = useState({maintenance: []})
    const mappedArr = array.maintenance.map((el)=> {
        return (
            <div>
                <span>{el.description}</span>
                <span>{el.service_done}</span>
                <span>{el.date_serviced}</span>
                <span>{el.millage}</span>
            </div>
        )
    })
    return(
        <div>
            {mappedArr}
        </div>
    )
}
export default Services