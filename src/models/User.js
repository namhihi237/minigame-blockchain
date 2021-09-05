import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },

}, { timeStamps: true });

export default new model('User', UserSchema);