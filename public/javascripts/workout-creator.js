const api = new wgesAPI()
let address

const backButton = document.querySelector('.back')
console.log(backButton)

backButton.onclick = () => {
  location.replace(document.referrer);
}
const initMap = () => {
  //console.log('entreo initmap')
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ3J1YXN0ZW8iLCJhIjoiY2p3N2lpOXc2MW1lbDQ0cXJmOHRzOWdlMyJ9.-x-wZ4ZJ4Bq7u5dEyaahNg';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-79.4512, 43.6568],
    zoom: 13
  });
  //console.log('initmap map', map)
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Lugar de entrenamiento',
    marker: {
      color: 'orange'
    }
  });

  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

  geocoder.on('result', result => {
    console.log(result)
    address = {
      name: result.result.place_name,
      location: result.result.geometry
    }
    console.log(address)
  })

}

let selects = document.querySelectorAll('select')
const workoutform = document.querySelector('form')
let addBlockButton = document.querySelector('#add-block')
const saveWorkout = document.querySelector('#add-workout')

const blocks = []

const getPhases = () => {
  const phasesDiv = document.querySelector('.phases').children
  console.log('Phases', phasesDiv)
}

const addBlock = (e) => {
  //console.log(e.target)
  e.target.classList = 'hide'
  const block = `<a class="save chip-button" name="save-block">Guardar bloque</a> 
                  <div class="col-md-6">
                    <label class="w40" for="order">Orden </label>
                    <input class="w40"  type="number" name="order" save="true">
                  </div>
                  <div class="col-md-12">
                  <label for="mode">Mode </label>
                  <select name="mode" save="true">
                    <option value="Rondas"> Rondas</option>
                    <option value="Tiempo"> Tiempo</option>
                  </select>
                  <input type="Number" save="true" name="round-qty" placeholder="Cantidad">
                </div>
                  <div class="col-md-12">
                    <label for="order">Description </label>
                    <textarea type="text" name="description" save="true"></textarea>
                  </div>
                 
                  <article>
                    <label for="exercises">Ejercicios</label>
                    <div class="row">
                      <ul class="exercises"></ul>
                    </div>
                    <input class="search-exercise" type="search" name="search-exercise">
                    <div class="results"></div>
                    
                  </article>`

  const newBlock = document.querySelector('.phases').children[2].appendChild(document.createElement('section'))
  newBlock.classList = 'block'
  newBlock.innerHTML = block
  //console.dir(newBlock)

  const searchInput = document.querySelector('.search-exercise')
  const resultsDiv = document.querySelector('.results')
  const exerciseDiv = document.querySelector('.exercises')
  const saveBlockButton = document.querySelector('[name=save-block]')
  console.dir(saveBlockButton)

  console.log('Search input', searchInput)
  searchInput.onkeydown = () => {
    if (searchInput.value.length >= 4) {
      [...resultsDiv.children].forEach(child => resultsDiv.removeChild(child))
      console.log('borrado')
    }
  }
  const exercises = []
  searchInput.onkeyup = () => {
    //console.log(searchInput.value)
    if (searchInput.value.length >= 4) {
      //buscar primero en nuestra bbdd, si no, llamar a la api.
      api.searchExercise(searchInput.value)
        .then(response => {
          console.log(response.data.suggestions)
          response.data.suggestions.forEach(suggestion => {
            //console.log(suggestion)
            const newElement = resultsDiv.appendChild(document.createElement('li'))
            newElement.innerText = suggestion.data.name
            newElement.classList = 'added'

            newElement.onclick = () => {
              searchInput.value = '';
              [...resultsDiv.children].forEach(child => resultsDiv.removeChild(child))
              addExercise(suggestion.data.id, exerciseDiv, exercises)
            }
          })
          //console.log(results.children)
        })
        .catch(err => console.log(err))
    }
  }


  saveBlockButton.onclick = () => {
    //console.log('exercises en saveBlock', exercises)
    // if (!exercises.length) {
    //   console.log('Introduce ejercicios')
    //   return
    // }
    saveBlock(exercises, newBlock)
  }



}

const saveBlock = (exercises, section) => {
  //recoger datos del form y crear el bloque
  const blockData = [...document.querySelectorAll('[save="true"]')]
  console.log('blockData querySelector', blockData)

  const block = {
    order: blockData[0].value,
    description: blockData[3].value,
    mode: {
      name: blockData[1].value,
      qty: blockData[2].value
    },
    exercises
  }
  if (!block.order || !block.mode.qty) {
    console.log('Completa todos los campos')
    document.querySelector('#error').innerText = "Completa todos los campos"
    document.querySelector('#error').classList.toggle('reveal')
    return
  }
  blocks.push(block)
  section.innerHTML = `  <p class="added"><strong>${block.order}.-</strong>  ${block.mode.qty} ${block.mode.name}  </p>
  `

  addBlockButton.classList.toggle('hide')
  addBlockButton.classList = 'chip-button'

  console.log('Bloques', blocks)
}



const addExercise = (id, exerciseDiv, exercises) => {

  //buscar primero en nuestra bbdd, si no, llamar a la api.
  api.getExerciseDetail(id)
    .then(detail => {
      console.log(exercises)
      // const newElement = exerciseDiv.appendChild(document.createElement('li'))
      // newElement.innerText = detail.data.name

      const newElement = exerciseDiv.appendChild(document.createElement('div'))
      newElement.innerHTML = `
        <p><strong>${detail.data.name}</strong></p>
          <label class="w40" for="type">Tipo </label>
            <select class="w40" name="type">
              <option value="Reps"> Reps</option>
              <option value="Time"> Time</option>
            </select>
            <label class="w40" for="measure">Unidad </label>
            <select class="w40" name="measure">
            <option value="reps"> reps</option>
              <option value="segs"> segs</option>
              <option value="min"> min</option>
            </select>
            <label class="w40" for="qty">Número </label>
              <input class="w40" type="number"  id="qty" name="qty">
            <label class="w40" for="type">Carga </label>
              <input class="w40" type="number" id="weight" placeholder="kg.">
            <a class="chip-button" name="save-exercise">Añadir</a> `
      selects = document.querySelectorAll('select')

      document.getElementsByName('save-exercise').forEach(exerc => {
        exerc.onclick = () => {
          const exercise = {
            data: detail.data,
            params: {
              name: selects[2].value,
              qty: document.getElementById('qty').value,
              measure: selects[3].value,
              weight: document.getElementById('weight').value
            }
          }
          newElement.innerHTML = `<p class="added"><strong>${detail.data.name}</strong>  ${exercise.params.qty}  ${exercise.params.measure}</p>
          `
          //puedo saber el indice?
          exercises.push(exercise)
          console.log('Guardado!', exercises)

          console.log(newElement)
          //newElement.innerHTML = `<p><strong>${detail.data.name}</strong></p>`
        }
      })

    })
}
window.onload = () => {
  initMap()
  addBlockButton.onclick = e => {
    console.log(e)
    addBlock(e)
  }

  let phases;

  workoutform.onsubmit = (e) => {
    e.preventDefault()
  }


  saveWorkout.onclick = () => {
    const workoutData = [...document.querySelectorAll('[workout="save"]')]
    console.log('Workout data', workoutData)


    const workout = {
      date: workoutData[0].value,
      address,
      client: workoutData[1].value,
      type: workoutData[2].value,
      phases: [{ //calentamiento
          name: workoutData[3].value,
          description: workoutData[4].value
        },
        { //principal
          name: workoutData[5].value,
          //description: workoutData[7].value,
          blocks
        },
        { //estiramients
          name: workoutData[6].value,
          description: workoutData[7].value
        },
      ]
    }
    console.log(workout)
    axios.post('/workouts', workout)
      .then(x => window.location.pathname = '/workouts')
      .catch(err => console.err(err))

  }



}