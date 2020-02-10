import { Application } from 'egg';

module.exports = (app: Application) => {
  const { router, controller } = app;
  router.resources('user', '/user', controller.user);
};
