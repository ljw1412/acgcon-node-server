import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const UserSchema = new Schema({
    username: String,
    nickname: String,
    email: String,
    password: String,
    salt: String,
    avatar: String,
    role: { type: String, default: 'user' },
    regtime: { type: Date, default: Date.now }
  });
  return mongoose.model('User', UserSchema);
};
