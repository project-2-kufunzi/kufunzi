const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exerciseSchema = require('../models/schema/exercise.schema')


const workoutSchema = new Schema({
  date: Date,
  address: {
    name: String,
    location: {
      type: {
        type: String
      },
      coordinates: [Number]
    }
  },
  phases: [{
    name: {
      type: String,
      enum: ['Calentamiento', 'Principal', 'Estiramientos']
    },
    description: String,
    blocks: [{
      order: Number,
      description: String,
      mode: {
        type: String,
        enum: ['Rondas', 'Tiempo']
      },
      type: {
        type: String,
        enum: ['Presencial', 'Online']
      },
      exercises: [exerciseSchema]
    }]
  }],
  clients: [String],
  trainerId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


module.exports = mongoose.model('Workout', workoutSchema);