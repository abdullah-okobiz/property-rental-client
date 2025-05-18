'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Input, Typography } from 'antd';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const { Title } = Typography;

// Configure Leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: '/marker-icon.png',
    iconRetinaUrl: '/marker-icon-2x.png',
    shadowUrl: '/marker-shadow.png',
});

function LocationPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

const Location = () => {
    const [position, setPosition] = useState<[number, number]>([23.8103, 90.4125]); // Dhaka default
    const [address, setAddress] = useState('');

    const handleMapClick = async (lat: number, lng: number) => {
        setPosition([lat, lng]);

        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
            const data = await res.json();
            setAddress(data.display_name || '');
        } catch (err) {
            console.error('Error fetching address:', err);
        }
    };

    return (
        <div className="relative h-[500px] w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <Title level={4} className="mb-2">Pick Location</Title>

          
            <div className="absolute z-[1000] top-8 left-4 right-4 max-w-md mx-auto">
                <Input
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    size="large"
                    placeholder="Selected location"
                    className="shadow-lg"
                />
            </div>

            {/* Map */}
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom
                className="h-full w-full z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                <Marker position={position} />
                <LocationPicker onLocationSelect={handleMapClick} />
            </MapContainer>
        </div>
    );
};

export default Location;
