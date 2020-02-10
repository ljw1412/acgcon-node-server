import { Application } from 'egg';

module.exports = (app: Application) => {
  const { router, controller } = app;
  const subRouter = router.namespace('/base');
  subRouter.get('bg_bing', controller.base.fetchBingBackground);
};
