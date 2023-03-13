import { ApiHandler } from "sst/node/api";
import { Time } from "@thumbnail/core/time";

export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Hello world. The time is ${Time.now()}`,
  };
});
