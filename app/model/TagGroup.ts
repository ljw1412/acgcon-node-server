import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const TagSchema = new Schema({
    name: String,
    order: Number,
    isAll: { type: Boolean, default: false }
  });

  const TagGroupSchema = new Schema({
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
    // 是否允许多选
    multiple: { type: Boolean, default: false },
    // 标签列表
    tags: [TagSchema]
  });

  mongoose.model('Tag', TagSchema);
  return mongoose.model('TagGroup', TagGroupSchema, 'tag_groups');
};
