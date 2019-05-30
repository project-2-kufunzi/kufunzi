//https://wger.de/api/v2/

class wgesAPI {
  constructor() {
    this.BASE_URL = 'https://wger.de/api/v2/'
    this.api = axios.create({
      baseURL: this.BASE_URL
    })
  }

  searchExercise(term) {
    return this.api.get(`exercise/search?term=${term}`)
  }

  getExerciseDetail(id) {
    return axios.get(`/exercise/api/${id}`)
  }
}