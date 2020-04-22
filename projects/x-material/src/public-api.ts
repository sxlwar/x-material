/**
 * !FIXME: 单独import某一个模块时，ng build报错
 * !ERROR: Unexpected value, xxx  imported by module yyy.  Please add a @NgModule annotation.
 */

export * from './lib/password/index';
export * from './lib/breadcrumb/index';
export * from './lib/message/index';
export * from './lib/date-picker/index';
export * from './lib/paginator/index';
export * from './lib/loading/index';

export { XMatModule } from './lib/x-material.module';
