import {Injectable} from '@angular/core';
import {ApiTemplateService} from "../template-api/api-template.service";
import {ApiRequest} from "../template-api/api-request/api.request";
import {Task} from "./models";

@Injectable({
  providedIn: 'root'
})
export class HttpTaskService {

  getMyTask$() {
    return this.apiTemplateService.request<Task[]>(new ApiRequest('task', 'my', null, "GET", true));
  }

  constructor(private apiTemplateService: ApiTemplateService) {
  }
}
