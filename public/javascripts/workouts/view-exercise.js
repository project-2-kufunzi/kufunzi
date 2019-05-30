const backButton = document.querySelector('.back')


backButton.onclick = () => {
  location.replace(document.referrer);
}


/* axios.get(`/:id/workouts`)

const newBlock = document.querySelector('.workouts ul').appendChild(document.createElement('li'))
newBlock.classList = 'block'
newBlock.innerHTML = block
//console.dir(newBlock)

const searchInput = document.querySelector('.search-exercise')
const resultsDiv = document.querySelector('.results')
const exerciseDiv = document.querySelector('.exercises')
const saveBlockButton = document.querySelector('[name=save-block]') */