import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './styling/Ownership.scss'

const Ownership = (props) => {
    const [array, handleArray] = useState({ownership: []})
    useEffect(()=> {
        const {id} = props
        console.log(id)
        axios.get(`/api/ownership/${id}`).then(res => {
            handleArray({...array, ownership: res.data})
        })
    },[])
    const mappedArr = array.ownership.map((el)=> {
        return (
            <tr>
                <td role='cell'>{el.username}</td>
            </tr>
        )
    })
    return(
        <div className='ownership-table-container'>
            <h2 className='table-name'>Ownership History</h2>
            <table role='table' className='ownership-table'>
                <thead role="rowgroup">
                    <tr role="row">
                        <th role="columnheader" className='column-header' nowrap>Usernames</th>
                    </tr>
                </thead>
                <tbody role='rowgroup'>
                    {mappedArr}
                </tbody>
            </table>
        </div>
    )
}
export default Ownership