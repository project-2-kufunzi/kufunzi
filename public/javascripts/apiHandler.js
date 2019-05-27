//https://wger.de/api/v2/

class wgesAPI {
  constructor() {
    this.BASE_URL = 'https://wger.de/api/v2/'
    this.api = axios.create({
      baseURL: this.BASE_URL
    })
  }

  /*   getFullList() {

    } */
  searchExercise(term) {
    return this.api.get(`exercise/search?term=${term}`)
  }

  /*   getOneRegister(id) {

    }

    createOneRegister(data) {

    }

    updateOneRegister(id) {

    }

    deleteOneRegister(id) {

    } */
}