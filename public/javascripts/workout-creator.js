const wgesAPI = new wgesAPI()
const searchInput = document.getElementById('search')




window.onload = () => {
  searchInput.onkeyup = () => {
    console.log(searchInput.value)
    wgesAPI.searchExercise(searchInput.value)
  }
}