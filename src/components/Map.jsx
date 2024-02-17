import {React, useState} from 'react'
import './Map.css'
import { useJsApiLoader, GoogleMap, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';

const libraries = ['places']; 
function Map(){
    const center = {
        position: {
        lat: 40.7128,
        lng: -74.0060,
        },
        title: 'center',
    };
    const mapCenter = {lat: 40.7128, lng: -74.0060};
    const API_KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_KEY;
    const [markers, setMarkers] = useState([]);
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
              const location = results[0].geometry.location;
              console.log('Valid address:', formattedAddress);
              console.log('location coordinates:', location.lat(), location.lng());
              
              const newMarker = {
                position: {
                  lat: location.lat(),
                  lng: location.lng(),
                },
                title: formattedAddress,
              };
        
              setMarkers([...markers, newMarker]);
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
                    center={mapCenter} 
                    zoom={12} 
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    options= {{
                        mapTypeControl: false,fullscreenControl: false
                    }}
                >
                    {/* Child components, such as markers, info windows, etc. */}
                    <Marker position={center.position} title="center" onClick={() => setOpen(center)}/>
                    {markers.map((marker, index) => (
                        <Marker
                        key={index}
                        position={marker.position}
                        title={marker.title}
                        onClick={() => setOpen(marker)}
                        />
                    ))}
                    {open && 
                        <InfoWindow
                        onCloseClick={() => setOpen(false)}
                        position={open.position}
                        options={infoWindowOptions}
                        >
                        <p style={{ color: 'black' }}>{open.title}</p>
                        </InfoWindow>
                    }
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