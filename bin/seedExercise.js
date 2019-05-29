const mongoose = require('mongoose');
const Exercise = require('../models/Exercise.model')


const exercises = [{
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
    "name": "Decline Bench Press Barbell",
    "category": {
      "id": 11,
      "name": "Chest"
    },
    "description": "<p>Lay down on a decline bench, the bar should be directly above your eyes, the knees are somewhat angled and the feet are firmly on the floor. Concentrate, breath deeply and grab the bar more than shoulder wide. Bring it slowly down till it briefly touches your chest at the height of your nipples. Push the bar up.</p>",
    "muscles": [{
      "id": 4,
      "name": "Pectoralis major",
      "is_front": true
    }],
    "muscles_secondary": [],
    "equipment": [{
      "id": 1,
      "name": "Barbell"
    }]
  }, {
    "name": "Barbell Hack Squats",
    "category": {
      "id": 9,
      "name": "Legs"
    },
    "description": "<p>Perform leg squats with barbell behind your legs</p>",
    "muscles": [{
      "id": 10,
      "name": "Quadriceps femoris",
      "is_front": true
    }],
    "muscles_secondary": [{
      "id": 8,
      "name": "Gluteus maximus",
      "is_front": false
    }],
    "equipment": [{
      "id": 1,
      "name": "Barbell"
    }]
  }
]


Exercise.create(exercises)
  .then(exercises => {
    console.log(`Created ${exercises.length} exercises`)
    mongoose.connection.close()
  })
  .catch(err => console.log(err))