This is the GRPC api server. It needs an envoy proxy in front of it to work.

The envoy proxy can be started via

```sh
docker compose up
```

This will configure and start the envoy proxy to work with the server in this package.
