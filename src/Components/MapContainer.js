import React,{useState, useEffect} from 'react'
import axios from 'axios'; 
import {GoogleApiWrapper, Map, InfoWindow, Marker} from 'google-maps-react'; 
import './styling/Maps.scss'


const MapContainer = (props) => { 
    const [style, setStyle] = useState({width: '50vw' , height: '100vh'})
    const [zipCode, setZipCode] = useState(0)
    const [showInfoWindow, toggleInfoWindow] = useState(false)
    const[activeMarker, setActiveMarker] = useState({})
    const[markerInfo, setMarkerInfo] = useState({})
    const[selectedPlace, setSelectedPlace] = useState({})
    const[locations, setLocations] = useState('')
    const[center, setCenter] = useState({})


const fetchPlaces = (mapProps, map) => { 
    const {google} = mapProps; 
    const service = new google.maps.places.PlacesService(map); 
}

// const onMarkerClick = (props, marker, e) =>

// this.setState({
//   selectedPlace: props,
//   activeMarker: marker,
//   showingInfoWindow: true
// });


const onMarkerClick = (props, marker, e) =>{
// console.log(this.state.locations[marker.getLabel() - 1])
setSelectedPlace (props)
setActiveMarker( marker)
setMarkerInfo (locations[marker.getLabel() - 1])
toggleInfoWindow(true)
}

const onMapClicked = () => {
if (showInfoWindow) {
    toggleInfoWindow(false)
    setActiveMarker(null)
}
};

const searchLocations = (zipCode) => { 
    axios.post('/api/map',{zipCode}).then(res => setLocations(res.data.results) )
   
    // setCenter(locations[0].geometry.location)
}

useEffect(() => {
    if(locations){ 
        
        setCenter(locations[0].geometry.location)
    }
}, [locations])


    return( 
        
        <div className='map-container'>
            <div className='map-container-header'>
                <h1>Service & Parts Locator</h1>
                <hr className='centered-line' id='my-vehicles-line'/>
 
                <div className='map-container-search'>
                    <h4 className='search-area-text'>Search in area:</h4>
                    <input className='zipcode-input' placeholder = 'Enter Zip Code' onChange = { e => setZipCode(e.target.value)} />
                    <button className='map-search-btn' onClick = {() => searchLocations(zipCode)}>Search</button>
                </div>
            </div>
        <div className='map-business-listing-container'>
            <div className='google-map-container'>
        <Map 
            google={props.google}
            onClick={onMapClicked}
            center = {center}
            // style = {style}
            zoom = {12}
        >
        
        {locations? locations.map((element,index) => 
        
            <Marker 
                onClick={onMarkerClick}
                position = {element.geometry.location}
                label = {(index + 1).toString()}
            />): console.log('no locations')}

        <InfoWindow
            marker={activeMarker}
            visible={showInfoWindow}>
            <div>
                <h3>{markerInfo.name}</h3>
                <p className='marker-text'>{markerInfo.formatted_address}</p>
                <p className='marker-text'>Rating: {markerInfo.rating} of 5</p>
                <a 
                    href = {`https://www.google.com/maps/place/${markerInfo.formatted_address}`} 
                    rel="noopener noreferrer"
                    target="_blank"
                    className='marker-directions-text'>
                    get directions</a>
            </div>
        </InfoWindow>

        </Map>
        </div>
        <div className='business-listings'> 
        {locations? locations.map((element,index) => 
        <div className='business-listing'> 
            <h4 className='business-listing-marker'>Marker: {index + 1} </h4>
            <h3>{element.name}</h3>
            <hr/>
            <p className='business-listing-info'>{element.formatted_address}</p>
            <p className='business-listing-info'>Rating: {element.rating} of 5</p>
        </div>
       ) : (
       <div className='business-listings-bkgd'>Search to view Service & Parts Locations</div>)
        // console.log('no locations')
        }
       
    </div>
        </div>
        </div>
    )
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyAP5TpSDFZwwgWxbVA-Ckxq-Hs1htO8BZ0')
}) (MapContainer)