import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { router, controller } = app;
  // RESTful API
  router.resources('cache', '/cache', controller.cache);

  const mapping = {};
  const subRouter = new SubRouter(app, '/cache');
  subRouter.addMapping(mapping);
};
