import React from 'react'
import './Home.css'

function Home(){
    return(
        <p className="container">
            <div className="about-us">
                <h2>
                    About Us
                </h2>
            </div>
            <div className="content">
            With the growing issue of self-isolation, especially post-covid, it has become harder and harder for people to connect socially with one another. This problem is especially evident in NYC where urban planning tends to create a much more secluded lifestyle. We aim to help mitigate this problem by creating an easy way for users to find local events to partake in.
            <img className='image' src="assets\example-map.png"></img>
            </div>
        </p>
    )
}

export default Home;