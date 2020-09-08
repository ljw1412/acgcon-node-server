import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const BaikeSchema = new Schema({
    // 标题
    title: String,
    // 作者
    author: String,
    // 作者id，用来关联
    authorId: String,
    // 封面
    cover: String,
    // 描述
    desc: String,
    // 标签
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    // 基础信息
    basic: [{ name: String, value: String }],
    // 创建者id
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    // acg类型
    acgType: String,
    // 百科类型
    subType: String
  });
  return mongoose.model('Baike', BaikeSchema);
};
