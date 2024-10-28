## Objective
Purpose of this project is to learn how kafka can be used to optimise API performance on scale.

I've used bun, hono, hono-zod, mongoose, kafkajs, k6

For 1000vu for 4m, achieved ~300ms of req duration with total reqs of 171706


To run zookeeper and kafka:
```sh
docker-compose up
```

To run test.js:
```sh
k6 run test.js
```

