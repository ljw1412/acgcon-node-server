import { Application } from 'egg';
import SubRouter from '../util/SubRouter';

module.exports = (app: Application) => {
  const { router, controller } = app;
  // RESTful API
  router.resources('users', '/users', controller.user);

  const mapping = {
    'GET /exists': controller.user.exists,
    'GET /whoami': controller.user.whoami,
    'POST /login': controller.user.login,
    'POST /logout': controller.user.logout
  };
  const subRouter = new SubRouter(app, '/user');
  subRouter.addMapping(mapping);
};
