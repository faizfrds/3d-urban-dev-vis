# Visualizer Project Plan

## [ ] 1. Project Setup
- Initialize Vite React app.
- Install dependencies: `@vis.gl/react-google-maps`, `three`.

## [ ] 2. Google Maps API & 3D Map
- Create `MapComponent.js`.
- Configure `Map` from `@vis.gl/react-google-maps` with:
  - `center`: `{ lat: -6.2088, lng: 106.8456 }` (Jakarta)
  - `zoom`: 15
  - `tilt`: 45
  - `mapId`: (To be provided or mocked for 3D buildings)

## [ ] 3. Data Integration (BigQuery)
- Query `urban_planning_data.building_footprints` via BigQuery MCP to get polygons and `max_height_meters`.
- *Note:* Currently blocked on querying this via MCP due to dataset location/project ID issues. Will need user clarification or I can mock the data.
- Save data as `src/data/footprints.json` for frontend consumption, avoiding the need for a full backend.

## [ ] 4. WebGL Overlay & 3D Extrusion
- Create a `WebGLOverlayView` component.
- Use `three` to parse footprint polygons, triangulate them, and extrude based on `max_height_meters`.
- Render the Three.js scene over the map.

## [ ] 5. UI Controls
- Create a floating sidebar in `App.js`.
- Add a toggle switch to enable/disable the 3D Building Extrusions layer.
