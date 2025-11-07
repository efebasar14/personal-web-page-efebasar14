// jsmap.js
// OpenLayers map centered on the specified coordinates (39.8657, 32.7339)

window.addEventListener('load', function () {
  if (!window.ol) {
    console.error('OpenLayers not loaded.');
    return;
  }

  // Yeni koordinatlar (Hacettepe Beytepe Kampüsü civarı)
  const lonLat = [32.73393902884206, 39.865727847557125];

  // Harita görünümü
  const view = new ol.View({
    center: ol.proj.fromLonLat(lonLat),
    zoom: 17
  });

  // ✅ Carto Light base map (mobilde Access blocked hatası vermez)
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

  // Marker oluştur
  const marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(lonLat)),
    name: 'Hacettepe University - Beytepe'
  });

  // Marker stili
  const markerStyle = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 8,
      fill: new ol.style.Fill({ color: '#e74c3c' }),
      stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
    }),
    text: new ol.style.Text({
      text: 'Hacettepe University - Beytepe',
      offsetY: -18,
      font: 'bold 13px Arial, sans-serif',
      fill: new ol.style.Fill({ color: '#000' }),
      stroke: new ol.style.Stroke({ color: '#fff', width: 3 })
    })
  });

  // Katman ekle
  const vectorSource = new ol.source.Vector({ features: [marker] });
  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: markerStyle
  });

  map.addLayer(vectorLayer);
});
