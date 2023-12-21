To make grpc-web work we need a proxy! This is the proxy.

You need to have docker and docker compose installed, then do

```sh
docker-compose up
```

And enjoy your proxy!

Ofcourse this proxy is useless without something to proxy to, so als start the `chat-api-grpc` server if you want to make it useful.
