// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportUser from '../../../app/controller/user';
import ExportBaikeIndex from '../../../app/controller/Baike/index';
import ExportBaikeTag from '../../../app/controller/Baike/Tag';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    user: ExportUser;
    baike: {
      index: ExportBaikeIndex;
      tag: ExportBaikeTag;
    }
  }
}
