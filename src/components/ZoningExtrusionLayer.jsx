import { useEffect, useState } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { ThreeJSOverlayView } from '@googlemaps/three';
import * as THREE from 'three';
import mockData from '../data/bcp01_mock.json';

const ZONING_COLORS = {
  'Commercial': 0x3b82f6,
  'Residential': 0x22c55e,
  'Mixed-Use': 0xa855f7,
  'Other': 0x9ca3af
};

// eslint-disable-next-line react/prop-types
export default function ZoningExtrusionLayer({ visible = true }) {
  const map = useMap();
  const [overlay, setOverlay] = useState(null);

  useEffect(() => {
    if (!map) return;

    // Create the ThreeJSOverlayView
    const threeJSOverlayView = new ThreeJSOverlayView({
      map,
      scene: new THREE.Scene(),
      anchor: { lat: -6.2088, lng: 106.8456, altitude: 0 },
      upAxis: 'Y',
    });

    // Add Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    threeJSOverlayView.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1000, 1000);
    threeJSOverlayView.scene.add(directionalLight);

    // Build Meshes
    mockData.forEach((feature) => {
      const coords = feature.geometry.coordinates[0]; // array of [lng, lat]
      const height = parseFloat(feature.properties['Max Height']) || 20;
      const zoningType = feature.properties['Zoning_Type'] || 'Other';
      const color = ZONING_COLORS[zoningType] || ZONING_COLORS['Other'];

      // Construct a THREE.Shape from the polygon
      const shape = new THREE.Shape();
      coords.forEach((coord, index) => {
        // Convert LatLng to local scene coordinates using the overlay's latLngAltitudeToVector3 method
        const latLng = { lat: coord[1], lng: coord[0], altitude: 0 };
        const position = threeJSOverlayView.latLngAltitudeToVector3(latLng);
        
        if (index === 0) {
          shape.moveTo(position.x, position.z); // We map x,z to 2D shape points and extrude along y
        } else {
          shape.lineTo(position.x, position.z);
        }
      });

      // Extrude Geometry
      const extrudeSettings = {
        depth: height, // Extrude along up-axis? But wait, the shape is in x,z so the extrusion is along Y?
        bevelEnabled: false,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      // We need to rotate the extruded geometry since THREE.ExtrudeGeometry extrudes along Z, but our upAxis is Y.
      geometry.rotateX(Math.PI / 2); // Make it stand up

      const material = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      threeJSOverlayView.scene.add(mesh);
    });

    setOverlay(threeJSOverlayView);

    return () => {
      threeJSOverlayView.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    if (overlay) {
      if (visible) {
        overlay.setMap(map);
      } else {
        overlay.setMap(null);
      }
    }
  }, [visible, overlay, map]);

  return null;
}
