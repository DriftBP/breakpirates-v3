import { BreadcrumbConfigItem } from './breadcrumb-config-item';

const homeConfig: BreadcrumbConfigItem = { name: 'HOME.TITLE' };
export const homeConfigInactive: BreadcrumbConfigItem = { ...homeConfig, routerLink: '/radio' };
export const homeConfigActive: BreadcrumbConfigItem = { ...homeConfig, isActive: true };

const scheduleConfig: BreadcrumbConfigItem = { name: 'SCHEDULE.TITLE' };
export const scheduleConfigInactive = { ...scheduleConfig, routerLink: '/schedule' };
export const scheduleConfigActive = { ...scheduleConfig, isActive: true };

const profilesConfig: BreadcrumbConfigItem = { name: 'PROFILES.TITLE' };
export const profilesConfigInactive = { ...profilesConfig, routerLink: '/profiles' };
export const profilesConfigActive = { ...profilesConfig, isActive: true };

const socialConfig: BreadcrumbConfigItem = { name: 'SOCIAL.TITLE' };
export const socialConfigInactive = { ...socialConfig, routerLink: '/social' };
export const socialConfigActive = { ...socialConfig, isActive: true };

const newsConfig: BreadcrumbConfigItem = { name: 'NEWS.TITLE' };
export const newsConfigInactive = { ...newsConfig, routerLink: '/news' };
export const newsConfigActive = { ...newsConfig, isActive: true };

const videoConfig: BreadcrumbConfigItem = { name: 'VIDEO.TITLE' };
export const videoConfigInactive = { ...videoConfig, routerLink: '/video' };
export const videoConfigActive = { ...videoConfig, isActive: true };

const musicConfig: BreadcrumbConfigItem = { name: 'MUSIC.TITLE' };
export const musicConfigInactive = { ...musicConfig, routerLink: '/music' };
export const musicConfigActive = { ...musicConfig, isActive: true };

const shopConfig: BreadcrumbConfigItem = { name: 'SHOP.TITLE' };
export const shopConfigInactive = { ...shopConfig, routerLink: '/shop' };
export const shopConfigActive = { ...shopConfig, isActive: true };

const toolsConfig: BreadcrumbConfigItem = { name: 'TOOLS.TITLE' };
export const toolsConfigInactive = { ...toolsConfig, routerLink: '/tools' };
export const toolsConfigActive = { ...toolsConfig, isActive: true };
