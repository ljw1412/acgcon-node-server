import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const BaikeTagSchema = new Schema({
    name: String,
    value: String,
    icon: String,
    acgType: String,
    type: String,
    group: String,
    order: Number
  });
  return mongoose.model('BaikeTag', BaikeTagSchema, 'baike_tags');
};
