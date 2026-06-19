export class BreadcrumbConfigItem {
  constructor(
    public name: string,
    public routerLink?: string,
    public isActive: boolean = false
  ) {}
}
