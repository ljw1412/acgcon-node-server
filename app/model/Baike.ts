import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const BaikeSchema = new Schema({
    // 标题
    title: String,
    // 作者
    author: String,
    // 封面
    cover: String,
    // 描述
    desc: String,
    // 标签
    tags: [Schema.Types.ObjectId],
    // 基础信息
    basic: [{ name: String, value: String }]
  });
  return mongoose.model('Baike', BaikeSchema);
};
