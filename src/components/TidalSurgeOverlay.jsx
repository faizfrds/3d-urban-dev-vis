// src/components/TidalSurgeOverlay.jsx
import { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import * as THREE from 'three';
import { ThreeJSOverlayView } from '@googlemaps/three';
import { mockBuildingAssets } from '../data/mockBuildingAssets';

const TIDAL_SURGE_HEIGHT = 2; // meters

// eslint-disable-next-line react/prop-types
export const TidalSurgeOverlay = ({ isSurgeEnabled }) => {
  const map = useMap();
  const overlayRef = useRef(null);
  const meshGroupRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // Initialize the ThreeJSOverlayView
    // @googlemaps/three helps us sync the Three.js scene to the Map's lat/lng/altitude
    const overlay = new ThreeJSOverlayView({
      map,
      anchor: { lat: -6.1082, lng: 106.8000, altitude: 0 },
      THREE, // pass the explicitly imported THREE library
    });
    overlayRef.current = overlay;

    // Group to hold our meshes so we can toggle visibility easily
    const group = new THREE.Group();
    meshGroupRef.current = group;

    // 1. Create the Tidal Surge Plane (2 meters above ground)
    // A large plane covering the immediate area
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000); 
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const surgePlane = new THREE.Mesh(planeGeometry, waterMaterial);
    
    // The anchor altitude is 0, so moving it up on the Z axis elevates it relative to the ground.
    // We rotate the plane to lay flat (X-axis rotation)
    // In ThreeJSOverlayView, Z is typically up depending on how latLngAltitudeToVector3 defines space.
    // By default, Three.js axes map to East (X), North (Y), Up (Z) when anchored.
    surgePlane.rotation.x = -Math.PI / 2;
    surgePlane.position.z = TIDAL_SURGE_HEIGHT;
    group.add(surgePlane);

    // 2. Mock 'At-Risk' Building Indicators
    const boxGeometry = new THREE.BoxGeometry(15, 15, 15);
    const riskMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    mockBuildingAssets.forEach(asset => {
      // For buildings that are below the surge level, highlight them
      if (asset.baseElevation < TIDAL_SURGE_HEIGHT) {
        const marker = new THREE.Mesh(boxGeometry, riskMaterial);
        
        // Convert lat/lng to the offset vector relative to the anchor
        overlay.latLngAltitudeToVector3({
          lat: asset.lat,
          lng: asset.lng,
          altitude: asset.baseElevation
        }, marker.position);

        // Move marker center slightly up so it's not buried
        marker.position.z += 7.5; 
        group.add(marker);
      }
    });

    // Simple ambient light so we can see colors clearly
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    group.add(ambientLight);

    overlay.scene.add(group);

    // Initial state
    group.visible = isSurgeEnabled;

    return () => {
      if (overlayRef.current) {
        overlayRef.current.setMap(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    // Toggle the entire Three.js group visibility when the prop changes
    if (meshGroupRef.current && overlayRef.current) {
      meshGroupRef.current.visible = isSurgeEnabled;
      overlayRef.current.requestRedraw(); 
    }
  }, [isSurgeEnabled]);

  return null; // This component doesn't render React DOM, just WebGL
};
