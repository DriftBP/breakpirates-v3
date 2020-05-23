import { BreadcrumbConfigItem } from './breadcrumb-config-item';

const homeConfig: BreadcrumbConfigItem = { name: 'HOME.TITLE' };
export const homeConfigInactive = { ...homeConfig, routerLink: '/radio' };
export const homeConfigActive = { ...homeConfig, isActive: true };

const scheduleConfig: BreadcrumbConfigItem = { name: 'SCHEDULE.TITLE' };
export const scheduleConfigInactive = { ...scheduleConfig, routerLink: '/schedule' };
export const scheduleConfigActive = { ...scheduleConfig, isActive: true };

const toolsConfig: BreadcrumbConfigItem = { name: 'TOOLS.TITLE' };
export const toolsConfigInactive = { ...toolsConfig, routerLink: '/tools' };
export const toolsConfigActive = { ...toolsConfig, isActive: true };
