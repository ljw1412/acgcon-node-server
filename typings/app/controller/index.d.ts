// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportCache from '../../../app/controller/Cache';
import ExportTag from '../../../app/controller/Tag';
import ExportTagGroup from '../../../app/controller/TagGroup';
import ExportUser from '../../../app/controller/User';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    cache: ExportCache;
    tag: ExportTag;
    tagGroup: ExportTagGroup;
    user: ExportUser;
  }
}
