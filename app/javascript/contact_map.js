// contact_map.js

document.addEventListener("turbo:load", function () {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  mapboxgl.accessToken = 'pk.eyJ1Ijoia2FuYWRvcjI0IiwiYSI6ImNtOGFlYmRmdDBvaDcycXFhMGp0dTNnbnIifQ.5yRITjzyzP175M0-OtChUQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-73.5949909455256, 45.52633929081981],
    zoom: 15
  });

  new mapboxgl.Marker()
    .setLngLat([-73.5949909455256, 45.52633929081981])
    .addTo(map);
});
