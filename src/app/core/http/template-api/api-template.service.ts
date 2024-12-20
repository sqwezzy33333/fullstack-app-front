import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiRequest} from "./api-request/api.request";
import {API_PATH} from "../../../shared/constants";
import {ConfigService} from "../../initialization/services/config.service";
import {UserService} from "../../state/user-state/user.service";

@Injectable({
  providedIn: 'root',
})
export class ApiTemplateService {

  public request<T>(req: ApiRequest): Observable<T> {
    let request: Observable<T>;
    switch (req.httpMethod) {
      case 'POST':
        request = this.requestPost<T>(req);
        break;
      case 'GET':
        request = this.requestGet<T>(req);
        break;
      case 'PUT':
        request = this.requestPut<T>(req);
        break;
      case 'PATCH':
        request = this.requestPatch<T>(req);
        break;
      case 'DELETE':
        request = this.requestDelete<T>(req);
        break;
    }

    return request;
  }

  private requestPost<T>(req: ApiRequest): Observable<T> {
    let httpOptions = this.headers(req.addTokenToHeaders);

    httpOptions = {
      ...httpOptions,
      ...req.options,
    };
    const url = `${this.configService.env[API_PATH] + req.path}`;
    return this.httpClient.post<T>(url, req.body, httpOptions);
  }

  private requestGet<T>(req: ApiRequest): Observable<T> {
    let httpOptions = this.headers(req.addTokenToHeaders);
    httpOptions = {
      ...httpOptions,
      ...req.options,
    };
    const url = `${this.configService.env[API_PATH] + req.path + this.queryParams(req.body)}`;
    return this.httpClient.get<T>(url, httpOptions);
  }

  private requestPut<T>(req: ApiRequest): Observable<T> {
    let httpOptions = this.headers(req.addTokenToHeaders);
    httpOptions = {
      ...httpOptions,
      ...req.options,
    };
    const url = `${this.configService.env[API_PATH] + req.path}`;
    return this.httpClient.put<T>(url, req.body, httpOptions);
  }

  private requestDelete<T>(req: ApiRequest): Observable<T> {
    let httpOptions = this.headers(req.addTokenToHeaders);
    httpOptions = {
      ...httpOptions,
      ...req.options,
    };
    const url = `${this.configService.env[API_PATH] + req.path + this.queryParams(req.body)}`;
    return this.httpClient.delete<T>(url, httpOptions);
  }

  private requestPatch<T>(req: ApiRequest): Observable<T> {
    let httpOptions = this.headers(req.addTokenToHeaders);
    httpOptions = {
      ...httpOptions,
      ...req.options,
    };
    const url = `${this.configService.env[API_PATH] + req.path}`;
    return this.httpClient.patch<T>(url, req.body, httpOptions);
  }

  private headers(requiredToken: boolean) {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    if (requiredToken) {
      httpOptions.headers = httpOptions.headers.append('Authorization', 'Bearer ' + this.userState.accessToken);
    }
    return httpOptions;
  }

  private queryParams(data: any) {
    if (!data) {
      return '';
    } else {
      return '?' + new URLSearchParams(data).toString();
    }
  }

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private userState: UserService
  ) {}
}
