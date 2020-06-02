// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportUser from '../../../app/controller/user';
import ExportBaikeFilter from '../../../app/controller/Baike/Filter';
import ExportBaikeTag from '../../../app/controller/Baike/Tag';
import ExportBaikeIndex from '../../../app/controller/Baike/index';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    user: ExportUser;
    baike: {
      filter: ExportBaikeFilter;
      tag: ExportBaikeTag;
      index: ExportBaikeIndex;
    }
  }
}
