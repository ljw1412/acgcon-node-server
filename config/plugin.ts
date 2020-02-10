import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus'
  }
};

export default plugin;
