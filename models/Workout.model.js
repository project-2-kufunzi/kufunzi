const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      exercises: []
    }]
  }],
  clients: [String]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;