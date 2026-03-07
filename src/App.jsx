// src/App.jsx
import React, { useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { MapComponent } from './components/MapComponent';
import './App.css'; 

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [isSurgeEnabled, setIsSurgeEnabled] = useState(false);

  if (!apiKey) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Missing Google Maps API Key</h2>
        <p>Please add <code>VITE_GOOGLE_MAPS_API_KEY</code> and <code>VITE_GOOGLE_MAP_ID</code> to a <code>.env</code> file in your project root.</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        
        {/* The 3D Map Component */}
        <MapComponent isSurgeEnabled={isSurgeEnabled} />

        {/* Floating Sidebar UI */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 10,
          width: '320px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h1 style={{ margin: '0 0 10px', fontSize: '1.2rem', color: '#333' }}>
            3D Urban Visualizer
          </h1>
          <p style={{ margin: '0 0 20px', fontSize: '0.9rem', color: '#666' }}>
            Muara Baru - Climate Risk Assessment
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '500', color: '#444' }}>Simulate 2m Tidal Surge</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={isSurgeEnabled}
                onChange={(e) => setIsSurgeEnabled(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          
          {isSurgeEnabled && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#ffecec', borderRadius: '8px', borderLeft: '4px solid #ff4444' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cc0000' }}>
                <strong>Warning:</strong> The simulated 2-meter surge marks highlighted properties at risk of significant flooding.
              </p>
            </div>
          )}
        </div>
      </div>
    </APIProvider>
  );
}

export default App;
