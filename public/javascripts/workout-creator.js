const api = new wgesAPI()
const searchInput = document.getElementById('search')
const resultsDiv = document.querySelector('.results')
const exerciseDiv = document.querySelector('.exercises')
let selects = document.querySelectorAll('select')
const workoutform = document.querySelector('form')

console.log(selects)


const blocks = []
const getPhases = () => {
  const phasesDiv = document.querySelector('.phases').children
  console.log('Phases', phasesDiv)
}


const addBlock = () => {

}



const exercises = []



const addExercise = (id) => {

  console.log(selects)
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
            <a name="save-exercise"></a> `
      selects = document.querySelectorAll('select')

      document.getElementsByName('save-exercise')[0].onclick = () => {
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
}

window.onload = () => {

  getPhases()
  searchInput.onkeydown = () => {
    if (searchInput.value.length >= 4) {
      [...resultsDiv.children].forEach(child => resultsDiv.removeChild(child))
      console.log('borrado')
    }
  }
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
            newElement.onclick = () => addExercise(suggestion.data.id)

          })
          //console.log(results.children)
        })
        .catch(err => console.log(err))
    }
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
      phases
    }
  }



}