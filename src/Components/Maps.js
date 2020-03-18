import React from 'react';
import MapContainer from './MapContainer';
import './styling/Maps.scss'


const Maps = () => {

    return(
        <div className='service-locator-container'>
            <h1>Service Locator</h1>
            <MapContainer />
        </div>
    )
}
export default Maps