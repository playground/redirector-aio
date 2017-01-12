export class Redirect {
  id: number;
  ruleName: string = '';
  path: string = '';
  query: string = '';
  active: boolean = true;
  redirectUrl: string = '';
  redirectCode: number = 301;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  clear() {
    this.active = true;
    this.redirectCode = 301;
    this.id = this.ruleName = this.path = this.query = this.redirectUrl = undefined;
  }
}
