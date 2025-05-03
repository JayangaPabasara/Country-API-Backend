import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    unique: true,
    require: true
  },
  favorites: {
    type: [String],
    default: []
  }
});

const User = mongoose.model('User', userSchema);

export default User;
