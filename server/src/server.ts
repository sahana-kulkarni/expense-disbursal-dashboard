import "dotenv/config";
import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();
const port = Number(env.PORT) || 4000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
