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
  type: {
    type: String,
    enum: ['Presencial', 'Online']
  },
  duration: {
    type: Number
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
        name: {
          type: String,
          enum: ['Rondas', 'Tiempo']
        },
        qty: Number,
        rest: String
      },
      exercises: [{
        refId: {
          type: Schema.Types.ObjectId,
          ref: "Exercise",
          autopopulate: true
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
      }]
    }]
  }],
  client: String,
  trainerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

workoutSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Workout', workoutSchema);