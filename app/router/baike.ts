import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { router, controller } = app;
  const mapping = {};
  const subRouter = new SubRouter(app, '/baike');
  subRouter.addMapping(mapping);

  // RESTful API
  router.resources('baike', '/baike', controller.baike);
};
