FROM node:lts-alpine

WORKDIR /usr/phoenix/src

COPY pnpm-lock.yaml ./

COPY . ./

RUN pnpm i -P \
&& pnpm run build

EXPOSE 4000

CMD ["pnpm", "start"]
