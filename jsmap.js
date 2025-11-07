window.addEventListener('load', function () {
  if (!window.ol) {
    console.error('OpenLayers not loaded.');
    return;
  }

  const lonLat = [32.6500, 39.8700]; // Hacettepe University
  const view = new ol.View({
    center: ol.proj.fromLonLat(lonLat),
    zoom: 15
  });

  // ✅ Alternative tile provider (Carto)
  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: 'https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          attributions: '© OpenStreetMap contributors, © Carto'
        })
      })
    ],
    view: view
  });

  // Marker
  const marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(lonLat)),
    name: 'Hacettepe University'
  });

  const markerStyle = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({ color: '#e74c3c' }),
      stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
    }),
    text: new ol.style.Text({
      text: 'Hacettepe University',
      offsetY: -15,
      font: 'bold 13px Arial, sans-serif',
      fill: new ol.style.Fill({ color: '#000' }),
      stroke: new ol.style.Stroke({ color: '#fff', width: 3 })
    })
  });

  const vectorSource = new ol.source.Vector({ features: [marker] });
  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: markerStyle
  });

  map.addLayer(vectorLayer);
});
