// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCurrentUser from '../../../app/middleware/CurrentUser';

declare module 'egg' {
  interface IMiddleware {
    currentUser: typeof ExportCurrentUser;
  }
}
