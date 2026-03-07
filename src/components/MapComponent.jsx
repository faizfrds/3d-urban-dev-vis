// src/components/MapComponent.jsx
import React from 'react';
import { Map } from '@vis.gl/react-google-maps';
import { TidalSurgeOverlay } from './TidalSurgeOverlay';

export const MapComponent = ({ isSurgeEnabled }) => {
  // Center of Muara Baru, Jakarta
  const mapCenter = { lat: -6.1082, lng: 106.8000 };

  // Use environment variables or pass explicitly
  const mapId = import.meta.env.VITE_GOOGLE_MAP_ID || "DEMO_MAP_ID";

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Map
        defaultCenter={mapCenter}
        defaultZoom={15}
        defaultTilt={45}
        mapId={mapId}
        disableDefaultUI={false}
        // This attribution identifies traffic from this tool
        internalUsageAttributionIds={['gmp_mcp_codeassist_v0.1_github']}
      >
        <TidalSurgeOverlay isSurgeEnabled={isSurgeEnabled} />
      </Map>
    </div>
  );
};
