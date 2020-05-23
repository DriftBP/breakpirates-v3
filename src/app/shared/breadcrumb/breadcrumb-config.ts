import { BreadcrumbConfigItem } from './breadcrumb-config-item';

const homeConfig: BreadcrumbConfigItem = { name: 'HOME.TITLE' };
export const homeConfigInactive: BreadcrumbConfigItem = { ...homeConfig, routerLink: '/radio' };
export const homeConfigActive: BreadcrumbConfigItem = { ...homeConfig, isActive: true };

const scheduleConfig: BreadcrumbConfigItem = { name: 'SCHEDULE.TITLE' };
export const scheduleConfigInactive = { ...scheduleConfig, routerLink: '/schedule' };
export const scheduleConfigActive = { ...scheduleConfig, isActive: true };

const socialConfig: BreadcrumbConfigItem = { name: 'SOCIAL.TITLE' };
export const socialConfigInactive = { ...socialConfig, routerLink: '/social' };
export const socialConfigActive = { ...socialConfig, isActive: true };

const toolsConfig: BreadcrumbConfigItem = { name: 'TOOLS.TITLE' };
export const toolsConfigInactive = { ...toolsConfig, routerLink: '/tools' };
export const toolsConfigActive = { ...toolsConfig, isActive: true };
