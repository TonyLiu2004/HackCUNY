import React from 'react'
import './Map.css'
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

function Map(){
    const center = {lat: 40.7128, lng: -74.0060};
    const API_KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_KEY;
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY,

    })

    if(!isLoaded){
        return <div>Loading...</div>
    }
    return(
        <div id="main-container">
            <p>Map</p>
            <div id="map-container">
                <GoogleMap center={center} zoom={12} mapContainerStyle={{width: '100%', height: '100%'}}>

                </GoogleMap>
            </div>
        </div>
    )
}

export default Map;