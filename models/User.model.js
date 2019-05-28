const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  phone: String,
  imgPath: String,
  imgName: String,
  role: {
    type: String,
    enum: ["trainer", "admin"],
    default: "trainer"
  },
  workouts: [{
    type: Schema.Types.ObjectId,
    ref: "Workout"
  }],
  trainers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  isTrainer: Boolean,
  isAdmin: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;