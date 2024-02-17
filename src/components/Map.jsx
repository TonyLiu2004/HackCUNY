import {React, useState} from 'react'
import './Map.css'
import { useJsApiLoader, GoogleMap, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';

const libraries = ['places']; 
function Map(){
    const center = {lat: 40.7128, lng: -74.0060};
    const API_KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_KEY;
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: libraries,

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

    const handleSubmit = () => {
        let address = document.getElementById('location-autocomplete').value;
        if(!address){
            alert("Please enter address");
        }

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK' && results.length > 0) {
              const formattedAddress = results[0].formatted_address;
              console.log('Valid address:', formattedAddress);
              // Perform any additional actions with the valid address
            } else {
              console.log('Invalid address');
            }
          });
    };

    return(
        <div id="main-container">
            <p style={{color:'white'}}>Map</p>
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
            <div>
                <Autocomplete>
                    <input id="location-autocomplete" type='text' placeholder='location'></input>
                </Autocomplete>
                    <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Map;