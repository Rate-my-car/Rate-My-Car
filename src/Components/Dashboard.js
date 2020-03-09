import React from 'react';
import { Link } from 'react-router-dom';



const Dashboard = () => {


    return(
        <div>Dashboard
            <Link to='/form' >Form</Link>
            <Link to='/auth' >Auth</Link>
        </div>
    )
}

export default Dashboard