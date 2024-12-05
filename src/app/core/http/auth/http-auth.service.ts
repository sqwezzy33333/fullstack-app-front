import {Injectable} from '@angular/core';
import {ApiTemplateService} from "../template-api/api-template.service";
import {RegisterUser} from "./models";
import {ApiRequest} from "../template-api/api-request/api.request";

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {


  register$(payload: RegisterUser) {
    return this.apiService.request(new ApiRequest('auth', 'register', payload, 'POST'));
  }

  constructor(
    private apiService: ApiTemplateService) {
  }
}
