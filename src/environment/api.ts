import { APIEnvironment } from "./apiEnvironment";
import * as environments from "./environment.json";

export const apiEnv: APIEnvironment = APIEnvironment.DEV;
export const getAPIBaseUrl = (module: string): string => {
  const runningEnv = environments.runningEnv;
  if (runningEnv) {
    const environment = environments.environments.find(
      (environment) => environment.type === runningEnv
    );
    if (environment) {
      const baseUri = eval(`environment.baseAPIUrls.modules.${module}`);
      return baseUri;
    }
  }
  return "";
};
