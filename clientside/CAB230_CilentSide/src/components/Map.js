import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from "react-google-maps";
import React, {useState} from 'react';

export function Map(props) {
    const content = JSON.parse(props.data).result;
    const filterContents = content.filter(c =>c.total !==0);
    const [selectedMarker, setSelectedMarker] = useState(null);
    return (
        <GoogleMap
            defaultZoom={4.75}
            defaultCenter={{ lat: -20.917574, lng: 142.702789 }}>
            {filterContents.map(x => (
                <Marker
                    key={filterContents.index}
                    position={{
                        lat: parseFloat(x.lat),
                        lng: parseFloat(x.lng)
                    }}
                    onClick={() =>{
                        setSelectedMarker(x);
                    }}
                />
            ))}
            {selectedMarker && (
            <InfoWindow
            position={{
                lat: parseFloat(selectedMarker.lat),
                lng: parseFloat(selectedMarker.lng)
            }}
            onCloseClick={() =>{
                setSelectedMarker(null);
            }}
            >
               <div> 
                <h2>{selectedMarker.LGA}</h2>
                <p>Total Number of Cases: {selectedMarker.total}</p>
                <p>Position:{selectedMarker.lat},{selectedMarker.lng}</p>
                </div>
            </InfoWindow>
        )}
        </GoogleMap>
    );
}

export default Map;