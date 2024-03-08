FROM node:18-alpine

ENV SHOPIFY_API_KEY=99855a0593168b7a8e5b31bba6b9574d
ENV SHOPIFY_API_SECRET=bf2ccaa622839c270b47ccddbb0c1e62
ENV SCOPES=read_customer_events,write_pixels,write_products,read_products,write_checkouts,write_orders,write_metaobjects,read_metaobjects
ENV OCTY_APP_HOST=https://pod1.sonity.net/octy-shopify
ENV SHOPIFY_APP_URL=https://pod1.sonity.net/octy-app
ENV SHOPIFY_CLI_PARTNERS_TOKEN=atkn_bf22aa2d6cca659e620b9062221485fe65e40d0c2671847923fa52da7c7fbde7
ENV OCTY_ANALYTICS_URL=https://pod1.sonity.net/octy-analytics

EXPOSE 3000
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

RUN npx prisma migrate dev --name init

CMD ["npm", "run", "start"]

