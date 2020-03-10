import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  // const BaikeTagGroupSchema = new Schema({
  //   // 名称
  //   name: String,
  //   // 图标
  //   icon: String,
  //   // acg类型
  //   acgType: String,
  //   // 百科类型
  //   type: String,
  //   // 排序
  //   order: String,
  //   // 标签列表
  //   tags: [{ name: String, order: String }]
  // });

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
