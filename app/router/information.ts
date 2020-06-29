import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { router, controller } = app;

  const mapping = {
    'GET /lastest': controller.information.listLastest,
    'GET /list_from': controller.information.listAllFrom
  };
  const subRouter = new SubRouter(app, '/information');
  subRouter.addMapping(mapping);

  // RESTful API
  router.resources('information', '/information', controller.information);
};
