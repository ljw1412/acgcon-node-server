import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { router, controller } = app;
  // RESTful API
  router.resources('users', '/users', controller.user);
  const mapping = {
    'POST /login': controller.user.login
  };
  const subRouter = new SubRouter(app, '/users');
  subRouter.addMapping(mapping);
};
