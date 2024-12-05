import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoadEnvironmentService} from "../../initialization/services/load-environment.service";
import {API_PATH} from "../../../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {

  getMe$() {
    return this.httpClient.get(this.getPath(''))
  }

  private getPath(method: string): string {
    return `${this.environmentService.env[API_PATH]}/user/${method}`;
  }

  constructor(
    private httpClient: HttpClient,
    private environmentService: LoadEnvironmentService) {
  }
}
