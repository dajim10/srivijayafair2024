// src/components/SongkhlaMap.js
import React from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pin from '../assets/pin.png';
import { useNavigate } from 'react-router-dom';

// Define a custom marker icon with your image
const customMarkerIcon = L.icon({
    iconUrl: pin,
    iconSize: [30, 40], // Adjust the icon size
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const Map = ({ image, bounds, markers }) => {
    const navigate = useNavigate();

    const handleMarkerClick = (link) => {
        navigate(`/${link}`);
    };

    return (
        <>
            <MapContainer
                className='container'
                style={{ height: '550px', width: '300px' }}
                bounds={bounds}
                maxBounds={bounds}
                doubleClickZoom={false}
            >
                <ImageOverlay url={image} bounds={bounds} />
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        icon={customMarkerIcon}
                        eventHandlers={{
                            click: () => handleMarkerClick(marker.link),
                        }}
                    >
                        <Popup>
                            <div>
                                {marker.popupText}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    );
};

export default Map;
