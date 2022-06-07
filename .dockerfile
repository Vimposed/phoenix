FROM node:lts-alpine

WORKDIR /usr/phoenix/src

COPY pnpm-lock.yaml ./

COPY . ./

RUN pnpm i \
&& pnpm run build \
pnpm i -P

CMD ["pnpm", "start"]
