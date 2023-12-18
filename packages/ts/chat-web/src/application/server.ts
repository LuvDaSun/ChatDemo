import assert from "assert";
import fs from "fs/promises";
import * as http from "http";
import path from "path";
import { projectRoot } from "../utils/root.js";
import { createRouter } from "./router.js";

export class Server {
  router = createRouter();

  public requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
    this.innerRequestHandler(request, response).catch((error) => {
      response.statusCode = 500;
      response.end();
    });
  };

  private async innerRequestHandler(request: http.IncomingMessage, response: http.ServerResponse) {
    const url = request.url;
    assert(url);

    // Is the request matches a route, server the client html
    const [route, routeParameters] = this.router.parseRoute(url);
    if (route != null) {
      response.statusCode = 200;
      response.end(this.clientHtml());
      return;
    }

    // If is matches a file, send the file!
    const filePath = path.join(projectRoot, "bundle", url);
    const fileStat = await fs.stat(filePath);
    if (fileStat.isFile()) {
      switch (path.extname(filePath)) {
        case ".js": {
          response.setHeader("content-type", "application/json");
          break;
        }
        default: {
          response.statusCode = 404;
          response.end();
          return;
        }
      }

      const fileContent = await fs.readFile(filePath);
      response.end(fileContent);
      return;
    }

    // no matches, file not foud! (404)
    response.statusCode = 404;
    response.end();
  }

  private clientHtml() {
    return `
<!DOCTYPE html>
<html>
<head>
  <link rel="icon" href="data:," />
  <script src="./browser.js"></script>
  <script>
    application.routing.setup(window, ${JSON.stringify(this.router.saveToJson())})
  </script>
</head>
<body>

<app-root></app-root>

</body>
</html>    
`.trim();
  }
}
