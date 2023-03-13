import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { FileStack } from "./stacks/FileStack";

export default {
  config(_input) {
    return {
      name: "thumbnail",
      region: "us-west-2",
    };
  },
  stacks(app) {
    app.stack(ApiStack);
    app.stack(FileStack);

    app.setDefaultFunctionProps({
      runtime: "nodejs18.x",
      architecture: "arm_64"
    });
  }
} satisfies SSTConfig;
