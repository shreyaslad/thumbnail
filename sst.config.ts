import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";

export default {
  config(_input) {
    return {
      name: "thumbnail",
      region: "us-west-2",
    };
  },
  stacks(app) {
    app.stack(ApiStack);

    app.setDefaultFunctionProps({
      runtime: "nodejs18.x",
      architecture: "arm_64"
    });
  }
} satisfies SSTConfig;
