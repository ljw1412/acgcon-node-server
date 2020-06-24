import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { router, controller } = app;
  // RESTful API
  router.resources('information', '/information', controller.information);

  const mapping = {};
  const subRouter = new SubRouter(app, '/information');
  subRouter.addMapping(mapping);
};
