FROM node:16-alpine As build

WORKDIR /usr/src/app1234567

COPY --chown=node:node . .

RUN yarn install --immutable

RUN yarn build

ENV NODE_ENV production

RUN yarn cache clean

USER node

FROM node:16-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app1234567/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app1234567/dist ./dist
COPY --chown=node:node --from=build /usr/src/app1234567/tsconfig.json ./

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
