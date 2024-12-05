import {Injectable} from '@angular/core';
import {ApiTemplateService} from "../template-api/api-template.service";
import {LoginResponse, LoginUser, RegisterUser} from "./models";
import {ApiRequest} from "../template-api/api-request/api.request";
import {User} from "../user/models";

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {


  register$(payload: RegisterUser) {
    return this.apiService.request<User>(new ApiRequest('auth', 'register', payload, 'POST'));
  }

  login$(payload: LoginUser) {
    return this.apiService.request<LoginResponse>(new ApiRequest('auth', 'login', payload, 'POST'));
  }

  constructor(
    private apiService: ApiTemplateService) {
  }
}
