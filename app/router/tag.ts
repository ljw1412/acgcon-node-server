import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { controller, router } = app;
  // 标签组路由
  const groupMapping = {
    'POST /rename': controller.tagGroup.rename,
    'POST /update_multiple': controller.tagGroup.updateMultiple,
    'POST /update_order': controller.tagGroup.updateOrder,
    'POST /reset_cache': controller.tagGroup.resetCache
  };
  const groupRouter = new SubRouter(app, '/tag-group');
  groupRouter.addMapping(groupMapping);
  router.resources('tag-group', '/tag-group', controller.tagGroup);
  // 标签路由
  const tagMapping = {
    'POST /update_order': controller.tag.updateOrder
  };
  const tagRouter = new SubRouter(app, '/tag');
  tagRouter.addMapping(tagMapping);
  router.resources('tag', '/tag', controller.tag);
};
