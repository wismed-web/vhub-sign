// `deno run -A server.ts`

/////////////////////////////////////////////////////////////////////////////

// import express from "npm:express"

// // optional: allow environment to specify port
// const port = Deno.env.get("PORT") || 8080;

// // create server instance
// const app = express();

// // bind the request to an absolute path or relative to the CWD
// app.use(express.static("dist"));

// // start the server
// app.listen(port, () => console.log(`Listening on port ${port}`));

/////////////////////////////////////////////////////////////////////////////

import { opine, serveStatic } from "https://deno.land/x/opine@2.3.3/mod.ts"

const port = Deno.env.get("PORT") || 8080;

const app = opine();

app.use(serveStatic("dist"));

app.listen(port, () => console.log(`Listening on port ${port}`));
