FROM node:18-alpine as builder
WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run builder

FROM node:18-alpine as runner
WORKDIR /src/app
COPY --from=builder /src/app/package.json .
COPY --from=builder /src/app/package-lock.json .
COPY --from=builder /src/app/next.config.js ./
COPY --from=builder /src/app/.next/standalone ./
COPY --from=builder /src/app/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]