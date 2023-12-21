import assert from "assert";
import fs from "fs/promises";
import * as http from "http";
import path from "path";
import { projectRoot } from "../utils/root.js";
import { createRouter } from "./router.js";

/**
 * This is the server that will serve the front-end
 */
export class Server {
  router = createRouter();

  /**
   * this is a requestHandler that is compatible with request event that node http servers
   * send
   *
   * @param request http request
   * @param response htt response
   */
  public requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
    this.innerRequestHandler(request, response).catch((error) => {
      // any error will be a 500
      response.statusCode = 500;
      response.end();
    });
  };

  /**
   * async request handler, to be called from the request handler.
   *
   * @param request
   * @param response
   * @returns promise that resolves when the request is ready.
   */
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

    // If it matches a file, send the file!
    const filePath = path.join(projectRoot, "bundle", url);
    const fileStat = await fs.stat(filePath);
    if (fileStat.isFile()) {
      switch (path.extname(filePath)) {
        case ".js": {
          response.setHeader("content-type", "application/javascript");
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

    // no matches, file not found! (404)
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
