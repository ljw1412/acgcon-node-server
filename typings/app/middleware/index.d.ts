// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCurrentUser from '../../../app/middleware/CurrentUser';
import ExportTagCache from '../../../app/middleware/TagCache';

declare module 'egg' {
  interface IMiddleware {
    currentUser: typeof ExportCurrentUser;
    tagCache: typeof ExportTagCache;
  }
}
