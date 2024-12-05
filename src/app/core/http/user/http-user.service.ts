import { Injectable } from '@angular/core';
import {User} from "./models";
import {ApiTemplateService} from "../template-api/api-template.service";
import {ApiRequest} from "../template-api/api-request/api.request";

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  getMe$() {
    return this.apiService.request<User>(new ApiRequest('user', 'me', null, 'GET', true, {}));
  }

  constructor(
    private apiService: ApiTemplateService) {
  }
}
