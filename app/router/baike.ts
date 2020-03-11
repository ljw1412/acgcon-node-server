import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { controller } = app;
  const mapping = {};
  const subRouter = new SubRouter(app, '/baike');
  subRouter.addMapping(mapping);
  subRouter.resources('filter', '/filter', controller.baike.filter);
  subRouter.resources('tags', '/tags', controller.baike.tag);
};
