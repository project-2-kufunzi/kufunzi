const api = new wgesAPI()



let selects = document.querySelectorAll('select')
const workoutform = document.querySelector('form')
const addBlockButton = document.querySelector('#add-block')

const blocks = []

const getPhases = () => {
  const phasesDiv = document.querySelector('.phases').children
  console.log('Phases', phasesDiv)
}

const addBlock = (e) => {
  //console.log(e.target)
  e.target.classList = 'hide'
  const block = `<div class="col-md-12">
  <a class="save" name="save-block">Guardar bloque</a> 
                    <label for="order">Orden </label>
                    <input type="number" name="order" save="true">
                  </div>
                  <div class="col-md-12">
                    <label for="order">Description </label>
                    <textarea type="text" name="description" save="true"></textarea>
                  </div>
                  <div class="col-md-12">
                    <label for="mode">Mode </label>
                    <select name="mode" save="true">
                      <option value="Rondas"> Rondas</option>
                      <option value="Tiempo"> Tiempo</option>
                    </select>
                    <input type="Number" save="true" name="round-qty" >
                  </div>
                  <div class="col-md-12">
                    <label for="type">Tipo </label>
                    <select name="type" save="true">
                      <option value="Presencial"> Presencial</option>
                      <option value="Online"> Online</option>
                    </select>
                  </div>
                  <article>
                    <label for="exercises">Ejercicios</label>
                    <div class="row">
                      <ul class="exercises"></ul>
                    </div>
                    <input class="search-exercise" type="text" name="search-exercise">
                    <div class="results"></div>
                    
                  </article>`

  const newBlock = document.querySelector('.phases').children[1].appendChild(document.createElement('section'))
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

            newElement.onclick = () => addExercise(suggestion.data.id, exerciseDiv, exercises)
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
    saveBlock(exercises)
  }



}

const saveBlock = (exercises) => {
  //recoger datos del form y crear el bloque
  const blockData = [...document.querySelectorAll('[save="true"]')]
  console.log('blockData querySelector', blockData)

  const block = {
    order: blockData[0].value,
    description: blockData[1].value,
    mode: {
      name: blockData[2].value,
      qty: blockData[3].value
    },
    type: blockData[4].value,
    exercises
  }
  blocks.push(block)
  console.log(blocks)
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
          <label for="type">Tipo </label>
            <select name="type">
              <option value="Reps"> Reps</option>
              <option value="Time"> Time</option>
            </select>
            <select name="measure">
              <option value="segs"> segs</option>
              <option value="min"> min</option>
              <option value="reps"> reps</option>
            </select>
            <input type="number" id="qty">
            <label for="type">Carga </label>
            <input type="number" id="weight">
            <a name="save-exercise">Añadir</a> `
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
          exercises.push(exercise)
          console.log(newElement)
          //newElement.innerHTML = `<p><strong>${detail.data.name}</strong></p>`
          console.log('Guardado!', exercises)
        }
      })

    })
}

window.onload = () => {

  addBlockButton.onclick = e => {
    console.log(e)
    addBlock(e)
  }

  let phases;

  workoutform.onsubmit = () => {

    e.preventDefault()
    const workout = {
      date: document.getElementById('date').value,
      address: {
        name: document.getElementById('address').value,
        location: {
          type: 'Point',
          coordinates: [45.64, 32.34] //falta hacer geocode con maps
        }
      },
      cliente: document.getElementById('client').value,
      phases: [{
          name: 'Calentamiento',
          description: document.getElementById('todo')
        },
        {
          name: 'Estiramientos',
          description: document.getElementById('todo')
        },
        {
          name: 'Principal',
          description: document.getElementById('todo'),
          blocks
        },

      ]
    }
  }



}