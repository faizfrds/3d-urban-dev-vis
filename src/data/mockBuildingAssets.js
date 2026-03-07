// src/data/mockBuildingAssets.js

// Mocking some building footprints in Muara Baru, Jakarta
// These would normally come from the BigQuery BCP-01 table.
export const mockBuildingAssets = [
  {
    id: 'bcp-01-001',
    name: 'Warehouse Facility A',
    lat: -6.1082,
    lng: 106.8000,
    baseElevation: 0.5, // meters above sea level
    priority: 'High',
  },
  {
    id: 'bcp-01-002',
    name: 'Pumping Station',
    lat: -6.1075,
    lng: 106.8010,
    baseElevation: 1.2,
    priority: 'Critical',
  },
  {
    id: 'bcp-01-003',
    name: 'Fish Market Building',
    lat: -6.1105,
    lng: 106.8025,
    baseElevation: 0.8,
    priority: 'Medium',
  },
  {
    id: 'bcp-01-004',
    name: 'Residential Block C',
    lat: -6.1090,
    lng: 106.7985,
    baseElevation: 1.5,
    priority: 'High',
  },
  {
    id: 'bcp-01-005',
    name: 'Elevated Office Space',
    lat: -6.1060,
    lng: 106.7990,
    baseElevation: 3.5, // Above the 2m surge
    priority: 'Low',
  },
];
