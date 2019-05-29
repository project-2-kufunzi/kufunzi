let map
window.onload = () => {
  //console.log('entreo initmap')
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ3J1YXN0ZW8iLCJhIjoiY2p3N2lpOXc2MW1lbDQ0cXJmOHRzOWdlMyJ9.-x-wZ4ZJ4Bq7u5dEyaahNg';

  map = new mapboxgl.Map({
    container: 'workouts',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-3.7492199, 40.4636688],
    zoom: 5
  });


  drawMarkers(map)
}

const drawMarkers = map => {
  axios.get('/workouts/api')
    .then(response => {
      console.log('entro en get')
      console.log(response)
      const geojson = {
        type: 'FeatureCollection',
        features: []
      }
      if (!response.data) {
        console.log('No hay workouts')
        return
      }
      response.data.forEach(workout => {
        const date = new Date(workout.date)
        const options = {
          //weekday: 'long',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hours: 'numeric'
        };
        console.log(date.getMinutes())
        geojson.features.push({
          type: 'Feature',
          geometry: {
            type: workout.address.location.type,
            coordinates: workout.address.location.coordinates
          },
          properties: {
            title: workout.client,
            description: `${date.toLocaleDateString('es-ES', options)} ${date.getHours()}:${date.getMinutes()}`
          }
        })
      })
      console.log('Geojson features', geojson.features)
      // add markers to map
      geojson.features.forEach((marker, i) => {
        console.log('Marker:', i)
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';


        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({
              offset: 25
            }) // add popups
            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
          .addTo(map);
      });
    })
    .catch(err => console.log(err))
}

//   map.on('load', () => {
//     map.addLayer({
//       "id": "points",
//       "type": "symbol",
//       "source": {
//         "type": "geojson",
//         "data": {
//           "type": "FeatureCollection",
//           "features": [{
//             "type": "Feature",
//             "geometry": {
//               "type": "Point",
//               "coordinates": [-77.03238901390978, 38.913188059745586]
//             },
//             "properties": {
//               "title": "Mapbox DC",
//               "icon": "monument"
//             }
//           }, {
//             "type": "Feature",
//             "geometry": {
//               "type": "Point",
//               "coordinates": [-122.414, 37.776]
//             },
//             "properties": {
//               "title": "Mapbox SF",
//               "icon": "harbor"
//             }
//           }]
//         }
//       },
//       "layout": {
//         "icon-image": "{icon}-15",
//         "text-field": "{title}",
//         "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
//         "text-offset": [0, 0.6],
//         "text-anchor": "top"
//       }
//     });
//   });