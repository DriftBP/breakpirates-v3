export class BreadcrumbConfigItem {
  constructor(
    public name: string,
    public routerLink?: string,
    public isActive?: boolean
  ) {
    if (!isActive) {
      this.isActive = false;
    }
  }
}
