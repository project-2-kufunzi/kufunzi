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
    type: {
      type: String,
      enum: ['Presencial', 'Online']
    },
    blocks: [{
      order: Number,
      description: String,
      mode: {
        name: {
          type: String,
          enum: ['Rondas', 'Tiempo']
        },
        qty: Number
      },
      exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
      }]
    }]
  }],
  client: String,
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