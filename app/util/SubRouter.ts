import { Application, Router, IController } from 'egg';

export default class SubRouter {
  app: Application;
  namespace: string;
  router: Router;
  controller: IController;
  mapping?: Record<string, any>;

  constructor(app: Application, namespace: string) {
    this.app = app;
    this.namespace = namespace;
    this.controller = app.controller;
    this.router = app.router.namespace(namespace);
  }

  // 添加多个路由映射
  addMapping(mapping: Record<string, any>) {
    for (const key in mapping) {
      // if (mapping.hasOwnProperty(key)) {
      const [method, path] = key.split(' ');
      this.addRoute(method, path, mapping[key]);
      // }
    }
  }

  // 添加路由映射
  addRoute(method: string, path: string, fn: Function) {
    this.router[method.toLowerCase()](path, fn);
  }
}
