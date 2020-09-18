// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaike from '../../../app/controller/Baike';
import ExportBase from '../../../app/controller/base';
import ExportBasic from '../../../app/controller/Basic';
import ExportCache from '../../../app/controller/Cache';
import ExportCrawler from '../../../app/controller/Crawler';
import ExportInformation from '../../../app/controller/Information';
import ExportTag from '../../../app/controller/Tag';
import ExportTagGroup from '../../../app/controller/TagGroup';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    baike: ExportBaike;
    base: ExportBase;
    basic: ExportBasic;
    cache: ExportCache;
    crawler: ExportCrawler;
    information: ExportInformation;
    tag: ExportTag;
    tagGroup: ExportTagGroup;
    user: ExportUser;
  }
}
