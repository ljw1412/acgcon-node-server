import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const InformationSchema = new Schema({
    // 地址
    url: String,
    // acg类型
    acgType: String,
    // 来源
    origin: String,
    // 标题
    title: String,
    // 封面
    cover: String,
    // 时间
    time: { type: Date, default: Date.now },
    // 描述
    desc: String,
    // 状态 -1=隐藏 0=待审核 1=上线
    state: Number
  });

  return mongoose.model('Information', InformationSchema);
};
