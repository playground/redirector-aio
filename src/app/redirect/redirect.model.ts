export class Redirect {
  id: number;
  ruleName: string = '';
  path: string = '';
  query: string = '';
  active: boolean = true;
  redirectUrl: string = '';
  redirectCode: string = '301';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
