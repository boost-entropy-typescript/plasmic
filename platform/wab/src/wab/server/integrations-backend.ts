// tslint:disable:ordered-imports
import "./integrations-backend-real";
import { spawn } from "../common";
import { serverDataBackendMain } from "./integrations-backend-real";
if (require.main === module) {
  spawn(serverDataBackendMain());
}
