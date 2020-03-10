import { Application } from 'egg';

module.exports = (app: Application) => {
  const { router, controller } = app;
  router.resources('users', '/users', controller.user);
};
