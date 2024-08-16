export default function (lat: number, lon: number, maxBounds: [[number, number], [number, number]]): boolean {
  const [minLat, minLon] = maxBounds[1];
  const [maxLat, maxLon] = maxBounds[0];

  return lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon;
}
