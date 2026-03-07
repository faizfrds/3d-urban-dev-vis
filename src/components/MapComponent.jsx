// src/components/MapComponent.jsx

import { Map } from '@vis.gl/react-google-maps';
import { TidalSurgeOverlay } from './TidalSurgeOverlay';
import ZoningExtrusionLayer from './ZoningExtrusionLayer';

// eslint-disable-next-line react/prop-types
export const MapComponent = ({ isSurgeEnabled, isZoningEnabled }) => {
  // Center near the mock data coordinates (Jakarta)
  const mapCenter = { lat: -6.2088, lng: 106.8456 };

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
        <ZoningExtrusionLayer visible={isZoningEnabled} />
      </Map>
    </div>
  );
};
