const mongoose = require('mongoose');
const Workout = require('../models/Workout.model')


mongoose.connect(`mongodb://localhost/kufunzi`, {
  useNewUrlParser: true
});


const workouts = [{
  "date": "2019-05-24",
  "trainerId": "5cebcc002183b4efc8757a9c",
  "address": {
    "name": "Calle Valle de Cerrato",
    "location": {
      "type": "Point",
      "coordinates": [40.33, -4.53]
    }
  },
  "phases": [{
    "name": "Calentamiento",
    "description": "Movilidad articular"
  }, {
    "name": "Principal",
    "description": "Intensdiad baja",
    "blocks": [{
      "order": 1,
      "description": "HIIT",
      "mode": "Rondas",
      "type": "Presencial",
      "exercises": [{
          "name": "Bench Press Narrow Grip",
          "category": {
            "id": 8,
            "name": "Arms"
          },
          "description": "<p>Lay down on a bench, the bar is directly over your eyes, the knees form a slight angle and the feet are firmly on the ground. Hold the bar with a narrow grip (around 20cm.). Lead the weight slowly down till the arms are parallel to the floor (elbow: right angle), press then the bar up. When bringing the bar down, don't let it down on your nipples as with the regular bench pressing, but somewhat lower.</p>",
          "muscles": [{
            "id": 5,
            "name": "Triceps brachii",
            "is_front": false
          }],
          "muscles_secondary": [{
              "id": 2,
              "name": "Anterior deltoid",
              "is_front": true
            },
            {
              "id": 4,
              "name": "Pectoralis major",
              "is_front": true
            }
          ],
          "equipment": [{
              "id": 1,
              "name": "Barbell"
            },
            {
              "id": 8,
              "name": "Bench"
            }
          ]
        },
        {
          "name": "Bench Press Narrow Grip",
          "category": {
            "id": 8,
            "name": "Arms"
          },
          "description": "<p>Lay down on a bench, the bar is directly over your eyes, the knees form a slight angle and the feet are firmly on the ground. Hold the bar with a narrow grip (around 20cm.). Lead the weight slowly down till the arms are parallel to the floor (elbow: right angle), press then the bar up. When bringing the bar down, don't let it down on your nipples as with the regular bench pressing, but somewhat lower.</p>",
          "muscles": [{
            "id": 5,
            "name": "Triceps brachii",
            "is_front": false
          }],
          "muscles_secondary": [{
              "id": 2,
              "name": "Anterior deltoid",
              "is_front": true
            },
            {
              "id": 4,
              "name": "Pectoralis major",
              "is_front": true
            }
          ],
          "equipment": [{
              "id": 1,
              "name": "Barbell"
            },
            {
              "id": 8,
              "name": "Bench"
            }
          ]
        }
      ]
    }]
  }, {
    "name": "Estiramientos",
    "description": "Todo el cuerpo"
  }],
  "clients": ['leti', 'ale', 'sandra']
}, {
  "date": "2019-05-25",
  "trainerId": "5cebcc002183b4efc8757a9c",
  "address": {
    "name": "Calle Valle de Cerrato",
    "location": {
      "type": "Point",
      "coordinates": [40.33, -4.53]
    }
  },
  "phases": [{
    "name": "Calentamiento",
    "description": "Movilidad articular"
  }, {
    "name": "Principal",
    "description": "Intensdiad baja",
    "blocks": [{
      "order": 1,
      "description": "HIIT",
      "mode": "Rondas",
      "type": "Presencial",
      "exercises": [{
          "name": "Bench Press Narrow Grip",
          "category": {
            "id": 8,
            "name": "Arms"
          },
          "description": "<p>Lay down on a bench, the bar is directly over your eyes, the knees form a slight angle and the feet are firmly on the ground. Hold the bar with a narrow grip (around 20cm.). Lead the weight slowly down till the arms are parallel to the floor (elbow: right angle), press then the bar up. When bringing the bar down, don't let it down on your nipples as with the regular bench pressing, but somewhat lower.</p>",
          "muscles": [{
            "id": 5,
            "name": "Triceps brachii",
            "is_front": false
          }],
          "muscles_secondary": [{
              "id": 2,
              "name": "Anterior deltoid",
              "is_front": true
            },
            {
              "id": 4,
              "name": "Pectoralis major",
              "is_front": true
            }
          ],
          "equipment": [{
              "id": 1,
              "name": "Barbell"
            },
            {
              "id": 8,
              "name": "Bench"
            }
          ]
        },
        {
          "name": "Bench Press Narrow Grip",
          "category": {
            "id": 8,
            "name": "Arms"
          },
          "description": "<p>Lay down on a bench, the bar is directly over your eyes, the knees form a slight angle and the feet are firmly on the ground. Hold the bar with a narrow grip (around 20cm.). Lead the weight slowly down till the arms are parallel to the floor (elbow: right angle), press then the bar up. When bringing the bar down, don't let it down on your nipples as with the regular bench pressing, but somewhat lower.</p>",
          "muscles": [{
            "id": 5,
            "name": "Triceps brachii",
            "is_front": false
          }],
          "muscles_secondary": [{
              "id": 2,
              "name": "Anterior deltoid",
              "is_front": true
            },
            {
              "id": 4,
              "name": "Pectoralis major",
              "is_front": true
            }
          ],
          "equipment": [{
              "id": 1,
              "name": "Barbell"
            },
            {
              "id": 8,
              "name": "Bench"
            }
          ]
        }
      ]
    }]
  }, {
    "name": "Estiramientos",
    "description": "Todo el cuerpo"
  }],
  "clients": ['leti', 'ale', 'sandra']
}]

Workout.create(workouts)
  .then(workouts => {
    //console.log(`Created ${workouts.length} workouts`)
    mongoose.connection.close()
  })
  .catch(err => console.log(err))