// js/map.js
// Basic OpenLayers map with OSM layer and a centered view.
// Make sure you included ol.css and ol.js in the page (CDN).
window.addEventListener('load', function () {
  if (!window.ol) {
    console.error('OpenLayers not loaded. Did you include ol.js?');
    return;
  }

  const mapDiv = document.getElementById('map');
  if (!mapDiv) return;

  // Create a view (use coordinates in EPSG:3857)
  const view = new ol.View({
    center: ol.proj.fromLonLat([32.6258472, 39.8858304]), // example lon,lat (your campus)
    zoom: 15
  });

  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: view
  });

  // Example: add a marker as a feature
  const marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([32.6258472, 39.8858304]))
  });

  const vectorSource = new ol.source.Vector({
    features: [marker]
  });

  const markerStyle = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 8,
      fill: new ol.style.Fill({ color: '#ff5722' }),
      stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
    })
  });

  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: markerStyle
  });

  map.addLayer(vectorLayer);
});
