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
            description: `${date.toLocaleDateString('es-ES', options)} ${date.getHours()}:${date.getMinutes()}`,
            id: workout._id
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

        const markerHTML = `<a href="/workouts/${marker.properties.id}">
                              <h3>${marker.properties.title } </h3>
                              <p> ${marker.properties.description}</p>
                            </a>`
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({
              offset: 25
            }) // add popups
            .setHTML(markerHTML))
          .addTo(map);
      });
    })
    .catch(err => console.log(err))
}