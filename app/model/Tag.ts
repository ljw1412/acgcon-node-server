import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const TagSchema = new Schema({
    name: String,
    order: Number,
    group: { type: Schema.Types.ObjectId, ref: 'TagGroup' }
  });

  return mongoose.model('Tag', TagSchema);
};
