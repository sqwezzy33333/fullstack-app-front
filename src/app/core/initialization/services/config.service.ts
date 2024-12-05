import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private environment: Record<string, string> = {}

  get env() {
    return this.environment;
  }

  set env(value: Record<string, string>) {
    this.environment = value;
  }
}
