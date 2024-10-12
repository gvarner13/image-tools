// Haversine formula to calculate the distance between two points
const toRadians = (degrees: number) => degrees * (Math.PI / 180);

export const calculateDistance = (lat1, lon1, lat2, lon2, unit = "km") => {
  const R = unit === "km" ? 6371 : 3958.8; // Radius of the Earth in kilometers or miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in the specified unit
};

export const testData = {
  cities: [
    {
      name: "New York",
      coordinates: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    },
    {
      name: "Los Angeles",
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
    },
    {
      name: "Chicago",
      coordinates: {
        latitude: 41.8781,
        longitude: -87.6298,
      },
    },
    {
      name: "Houston",
      coordinates: {
        latitude: 29.7604,
        longitude: -95.3698,
      },
    },
    {
      name: "Phoenix",
      coordinates: {
        latitude: 33.4484,
        longitude: -112.074,
      },
    },
    {
      name: "Philadelphia",
      coordinates: {
        latitude: 39.9526,
        longitude: -75.1652,
      },
    },
    {
      name: "San Antonio",
      coordinates: {
        latitude: 29.4241,
        longitude: -98.4936,
      },
    },
    {
      name: "San Diego",
      coordinates: {
        latitude: 32.7157,
        longitude: -117.1611,
      },
    },
  ],
};
