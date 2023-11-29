import React from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, Tooltip, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pin from '../assets/pin.png';
import { useNavigate } from 'react-router-dom';

const customMarkerIcon = L.icon({
    iconUrl: pin,
    iconSize: [30, 40], // Adjust the icon size
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});



const Map = ({ image, markers, bounds }) => {

    const navigate = useNavigate();

    const handleMarkerClick = (link) => {
        navigate(`/${link}`);
    };

    return (
        <MapContainer
            className='container'
            style={{ height: '600px', width: '400px' }}
            bounds={bounds}
            maxBounds={bounds}
            doubleClickZoom={false}
            zoom={false}

        >
            <img src={image} alt="Map" className="img-fluid" />
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    icon={customMarkerIcon}

                    eventHandlers={{
                        click: () => handleMarkerClick(marker.link),
                    }}
                >
                    <Tooltip permanent>
                        <div>
                            {marker.popupText}
                        </div>
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
