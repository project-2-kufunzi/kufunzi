const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  address: {
    name: String,
    location: {
      type: {
        type: String
      },
      coordinates: [Number]
    }
  },
  capacity: Number,
  workouts: [], //será array de id de los workouts
  clients: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  isTrainer: Boolean,
  isClient: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;