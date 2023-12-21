# Generating code

To (re) generate server code, run the npm codegen script.

```sh
npm run codegen
```

Or use the configured vscode task to do this.

The code will be generated in the `src/types` folder. You will need to fix the imports after the code is generated. This:

```ts
import type {
  ChatDemoClient as _ChatDemoClient,
  ChatDemoDefinition as _ChatDemoDefinition,
} from "./ChatDemo";
```

needs to be transformed into this:

```ts
import type {
  ChatDemoClient as _ChatDemoClient,
  ChatDemoDefinition as _ChatDemoDefinition,
} from "./ChatDemo.js";
```

So, add `.js`.

To generate client code for web, first we need install `protoc`, on arch this can be done via

```sh
sudo pacman -S protoc
```

Then we need to install a plugin! Go to https://github.com/grpc/grpc-web/releases and download the plugin. Put it in a folder that is in your path, I like to put it in `/usr/local/bin/protoc-gen-grpc-web`, then make is executable via

```sh
chmod +x /usr/local/bin/protoc-gen-grpc-web
```

Then, another plugin! Go to https://github.com/protocolbuffers/protobuf-javascript/releases and download the plugin, untar it and put the file in the bin folder (protoc-gen-js) in your path, I put it in use `/usr/local/bin/protoc-gen-js`.

Then, to generate the web client code, run the npm `codegen-web` script via:

```sh
npm run codegen-web
```

or use the vscode task.

This will put the generated code in the `web` folder.

Then, fix the imports, imports to files should end with `.js`.
