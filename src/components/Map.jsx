import {React, useState, useEffect, useRef } from 'react'
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { database } from "../firebase";
import './Map.css'
import { useJsApiLoader, GoogleMap, Marker, InfoWindow, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

const libraries = ['places']; 
function Map(){
    const [posts, setPosts] = useState([]);
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const originRef = useRef();
    const destinationRef = useRef();
    const [markers, setMarkers] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            let postQuery = query(collection(database, "posts"));
    
            const querySnapshot = await getDocs(postQuery);
            const postData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
    
            setPosts(postData);

            for (const post of postData) {
                try {
                  const geocodePromise = new Promise((resolve, reject) => {
                    let geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ address: post.location }, (results, status) => {
                      if (status === 'OK' && results.length > 0) {
                        const formattedAddress = results[0].formatted_address;
                        const location = results[0].geometry.location;
                        // console.log('Valid address:', formattedAddress);
                        // console.log('location coordinates:', location.lat(), location.lng());
                        // console.log('post',post);
                        const newMarker = {
                          position: {
                            lat: location.lat(),
                            lng: location.lng(),
                          },
                          title: formattedAddress,
                          name: post.event,
                          description: post.description,
                          time: post.eventTime,
                        };
          
                        resolve(newMarker);
                      } else {
                        console.log('Invalid address', post.location);
                        reject(new Error('Invalid address'));
                      }
                    });
                  });
          
                  const newMarker = await geocodePromise;
                  setMarkers(prevMarkers => [...prevMarkers, newMarker]);
                } catch (error) {
                  console.error('Error geocoding:', error);
                }
              }
          } catch (error) {
            console.error("Error fetching posts: ", error);
          }
        };
    
        fetchPosts();
      }, []); 

    const center = {
        position: {
        lat: 40.7128,
        lng: -74.0060,
        },
        title: 'center',
    };
    const mapCenter = {lat: 40.7128, lng: -74.0060};
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
        let address = document.getElementById('origin-autocomplete').value;
        if(!address){
            alert("Please enter address");
        }

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK' && results.length > 0) {
              const formattedAddress = results[0].formatted_address;
              const location = results[0].geometry.location;
            //   console.log('Valid address:', formattedAddress);
            //   console.log('location coordinates:', location.lat(), location.lng());
              
            
            } else {
              console.log('Invalid address');
            }
          });
    };

    function formatTime(dateTimeString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', options);
        return formattedDate;
      }

    async function calculateRoute(){
        if(originRef.current.value === '' || destinationRef.current.value === ''){
            return;
        }
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirections(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    }

    function clearRoute(){
        setDirections(null);
        setDistance('');
        setDuration('');
        originRef.current.value = '';
        destinationRef.current.value = '';
    }
    return(
        <div id="main-container">
            <div id="routing-container">
                <div id="input-container">
                    <Autocomplete>
                        <input id="origin-autocomplete" type='text' placeholder='origin' ref = {originRef}></input>
                    </Autocomplete>
                    <Autocomplete>
                        <input id="destination-autocomplete" type='text' placeholder='destination' ref = {destinationRef}></input>
                    </Autocomplete>
                    <button className="route-button" id="calculate-route-button" onClick={calculateRoute}>Calculate Route</button>
                    <button className="route-button" onClick={clearRoute}>Clear</button>
                </div>
                <div id="route-information">
                    <p style={{marginRight:"100px"}}>Distance: {distance}</p>
                    <p>Duration: {duration}</p>
                </div>
            </div>
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
                        <div>
                            <p style={{ color: 'black', fontWeight:'bold'}}>{open.name}</p>
                            <p style={{ color: 'black'}}>{open.title}</p>
                            <p style={{ color: 'black'}}>{formatTime(open.time)}</p>
                            <p style={{ color: 'black'}}>{open.description}</p>
                        </div>
                        </InfoWindow>
                    }
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map;