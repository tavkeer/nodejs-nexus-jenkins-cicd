FROM node:22-alpine

WORKDIR /user/src/app
ENV NODE_ENV=production


# Install dependencies first so this layer caches when only source changes

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY server.js ./

USER node
EXPOSE 3000


HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/api/health',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["node", "server.js"]
