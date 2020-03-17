import React,{useState, useEffect} from 'react'
import axios from 'axios'; 
import {GoogleApiWrapper, Map, InfoWindow, Marker} from 'google-maps-react'; 

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
        
        <div> 
            <p>Search in area:</p>
            <input placeholder = 'Enter Zip Code' onChange = { e => setZipCode(e.target.value)} />
            <button onClick = {() => searchLocations(zipCode)}>Search</button>

        <Map 
            google={props.google}
            onClick={onMapClicked}
            center = {center}
            style = {style}
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
                <h1>{markerInfo.name}</h1>
                <p>Address:</p>
                <p>{markerInfo.formatted_address}</p>
                <p>Rating:</p>
                <p>{markerInfo.rating}</p>
                <a 
                    href = {`https://www.google.com/maps/place/${markerInfo.formatted_address}`} 
                    rel="noopener noreferrer"
                    target="_blank">
                    get directions</a>
            </div>
        </InfoWindow>

        </Map>

        </div>
    )
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyAP5TpSDFZwwgWxbVA-Ckxq-Hs1htO8BZ0')
}) (MapContainer)