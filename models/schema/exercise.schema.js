const exerciseSchema = {
  name: String,
  category: [{
    id: Number,
    name: String,
  }],
  description: String,
  muscles: [{
    id: Number,
    name: String,
    is_front: Boolean
  }],
  muscles_secondary: [{
    id: Number,
    name: String,
    is_front: Boolean
  }],
  equipment: [{
    id: Number,
    name: String
  }]
}

module.exports = exerciseSchema