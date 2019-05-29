const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const exerciseSchema = new Schema({
  id: Number,
  data: {
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
  },
  params: {
    name: {
      type: String,
      enum: ['Reps', 'Tiempo']
    },
    qty: Number,
    measure: {
      type: String,
      enum: ['reps', 'segs', 'mins']
    },
    weight: Number
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


module.exports = mongoose.model('Exercise', exerciseSchema);