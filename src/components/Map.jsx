import {React, useState} from 'react'
import './Map.css'
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

function Map(){
    const center = {lat: 40.7128, lng: -74.0060};
    const API_KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_KEY;
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY,

    })
    const infoWindowOptions = {
        pixelOffset: {
            width: 0,
            height: -20
        }
    }; 

    const [open, setOpen] = useState(false);

    if(!isLoaded){
        return <div>Loading...</div>
    }
    return(
        <div id="main-container">
            <p>Map</p>
            <div id="map-container">
                <GoogleMap 
                    center={center} 
                    zoom={12} 
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    options= {{
                        mapTypeControl: false,fullscreenControl: false
                    }}
                >
                    {/* Child components, such as markers, info windows, etc. */}
                    <Marker position={center} title="idk" onClick={() => setOpen(true)}/>
                    {open && (
                        <InfoWindow onCloseClick={() => setOpen(false)} position={center} options={infoWindowOptions}>
                            <p style={{color:'black'}}>Center</p>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map;