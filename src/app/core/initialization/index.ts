import {LoadEnvironmentService} from "./services/load-environment.service";

export function initApplication(loadEnvironmentService: LoadEnvironmentService) {
  return () => loadEnvironmentService.load()
}
