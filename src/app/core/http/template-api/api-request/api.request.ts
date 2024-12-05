import { ApiOptions } from './models/api-models/api-options';

export class ApiRequest {
  controller = '';
  method = '';
  body: any = null;
  httpMethod: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' = 'POST';
  addTokenToHeaders = false;
  options: { [key: string]: any } = {};

  constructor(
    controller: string,
    method: string,
    body: any,
    httpMethod: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' = 'POST',
    addTokenToHeaders?: boolean,
    options?: ApiOptions,
  ) {
    this.controller = controller;
    this.method = method;
    this.body = body;
    this.httpMethod = httpMethod;
    this.addTokenToHeaders = addTokenToHeaders ?? false;
    this.options = options ?? {};
  }

  public get path() {
    let url = '';

    if (!this.controller) {
      throw new Error('controller data is missing');
    }

    if (this.controller) {
      url += '/' + this.controller;
    }
    if (this.method) {
      url += '/' + this.method;
    }

    return url;
  }
}
