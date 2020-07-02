// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaike from '../../../app/model/Baike';
import ExportInformation from '../../../app/model/Information';
import ExportTagGroup from '../../../app/model/TagGroup';
import ExportUser from '../../../app/model/User';

declare module 'egg' {
  interface IModel {
    Baike: ReturnType<typeof ExportBaike>;
    Information: ReturnType<typeof ExportInformation>;
    TagGroup: ReturnType<typeof ExportTagGroup>;
    User: ReturnType<typeof ExportUser>;
  }
}
