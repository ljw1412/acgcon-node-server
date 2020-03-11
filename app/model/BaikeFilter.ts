import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const BaikeFilterSchema = new Schema({
    // 名称
    name: String,
    // 图标
    icon: String,
    // acg类型
    acgType: String,
    // 百科类型
    type: String,
    // 排序
    order: Number,
    // 标签列表
    tags: [{ name: String, order: Number }]
  });

  return mongoose.model('BaikeFilter', BaikeFilterSchema, 'baike_filter');
};
