import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const BaikeTagSchema = new Schema({
    name: String,
    acgType: String,
    type: String,
    group: String
  });
  return mongoose.model('BaikeTag', BaikeTagSchema, 'baike_tags');
};
