window.onload = () => {
  const edit = document.querySelector('[data-icon=edit]')
  const trash = document.querySelector('[data-icon=trash-alt]')
  const id = document.querySelector('#id').value
  const backButton = document.querySelector('.back')


  backButton.onclick = () => {
    window.location = "/workouts"
  }

  edit.onclick = () => {
    console.log(id)
    //axios.put('/workouts/{id}')
  }

  trash.onclick = () => {
    console.log(`/workouts/${id}`)
    axios.delete(`/workouts/${id}`)
      .then(x => window.location = "/workouts")
      .catch(err => console.log(err))
  }
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ3J1YXN0ZW8iLCJhIjoiY2p3N2lpOXc2MW1lbDQ0cXJmOHRzOWdlMyJ9.-x-wZ4ZJ4Bq7u5dEyaahNg'

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coordinates.coordinates,
    zoom: 13
  })


  drawMarker(map)
}

const drawMarker = map => {
  console.log(coordinates)

  const geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: coordinates.type,
        coordinates: coordinates.coordinates
      }
    }]
  }
  const el = document.createElement('div')
  el.className = 'marker'

  new mapboxgl.Marker(el)
    .setLngLat(geojson.features[0].geometry.coordinates)
    .addTo(map)
}



/* Date formats */
// const intlData = {
//   "locales": "es-ES",
//   "formats": {
//     "date": {
//       "short": {
//         "day": "numeric",
//         "month": "long",
//         "year": "numeric"
//       }
//     },
//     "time": {
//       "hhmm": {
//         "hour": "numeric",
//         "minute": "numeric"
//       }
//     },
//     "number": {
//       "USD": {
//         "style": "currency",
//         "currency": "USD"
//       }
//     },
//     "relative": {
//       "hours": {
//         "units": "hour",
//         "style": "numeric"
//       }
//     }
//   }
// }