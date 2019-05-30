const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  phone: String,
  imgPath: String,
  imgName: String,
  comments: String,
  role: {
    type: String,
    enum: ["trainer", "admin"],
    default: "trainer"
  },
  workouts: [{
    type: Schema.Types.ObjectId,
    ref: "Workout",
    autopopulate: true
  }],
  trainers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
  }],
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
  },
  isTrainer: Boolean,
  isAdmin: Boolean,
  firstLogin: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


userSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('User', userSchema);