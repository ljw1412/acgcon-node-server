import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus'
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  }
};

export default plugin;
