# Visualizer Project Plan

## [x] 1. Project Setup
- Initialize Vite React app.
- Install dependencies: `@vis.gl/react-google-maps`, `three` or `deck.gl`.

## [x] 2. Google Maps API & 3D Map
- Create `MapComponent.js`.
- Configure `Map` from `@vis.gl/react-google-maps` with:
  - `center`: `{ lat: -6.1082, lng: 106.8000 }` (Muara Baru, Jakarta)
  - `zoom`: 15
  - `tilt`: 45
  - `mapId`: (Ensure 3D buildings are enabled)
  - Add `internalUsageAttributionIds='gmp_mcp_codeassist_v0.1_github'`

## [x] 3. Data Integration (BigQuery)
- Request BigQuery Project ID from user.
- Query `BCP-01` table to get building assets in Muara Baru.
- Query sea-level rise projections to simulate a 2-meter tidal surge.
- Save data for frontend consumption or fetch dynamically.

## [x] 4. WebGL Overlay & 3D Extrusion
- Create a `TidalSurgeOverlay` component.
- Use WebGL Overlay View (`deck.gl` or `three.js`) to parse footprint polygons.
- Render a translucent blue plane at 2-meter height to simulate the surge.
- Highlight at-risk building assets from `BCP-01` (elevation < 2m) in a warning color (e.g., Red).

## [x] 5. UI Controls
- Create a floating sidebar in `App.jsx`.
- Add a toggle switch to enable/disable the 2-meter Tidal Surge simulation layer.

## Review
- Dependencies `@vis.gl/react-google-maps` and `@googlemaps/three` installed successfully.
- Code successfully builds (`npm run build`).
- Fixed all unused React import errors and prop-types linting warnings (`npm run lint` passes).
- Tidal Surge visualization using `ThreeJSOverlayView` starts properly without errors.
