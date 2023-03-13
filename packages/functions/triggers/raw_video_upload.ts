import { ApiHandler } from "sst/node/api";
import { Time } from "@thumbnail/core/time";

export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"message": "Video uploaded!", "payload": _evt}),
  };
});
