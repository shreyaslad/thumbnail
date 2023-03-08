import { App } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { FileStack } from "./FileStack";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "python3.9",
    srcPath: "services",
    architecture: "arm_64",
  });

  app.stack(FileStack);
  app.stack(ApiStack);
}
