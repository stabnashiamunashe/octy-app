FROM node:18-alpine

ENV SHOPIFY_API_KEY=9ff0974b54554e8f77107be0bef2c9d7
ENV SHOPIFY_API_SECRET=e1e6c834e3bc4c1cbc8dcd2f83a833b5
ENV SCOPES=read_customer_events,write_pixels,write_products,read_products,write_checkouts,write_orders,write_metaobjects,read_metaobjects
ENV OCTY_APP_HOST=https://pod1.sonity.net/octy-shopify
ENV SHOPIFY_APP_URL=https://pod1.sonity.net
ENV SHOPIFY_CLI_PARTNERS_TOKEN=atkn_bf22aa2d6cca659e620b9062221485fe65e40d0c2671847923fa52da7c7fbde7
ENV OCTY_ANALYTICS_URL=https://pod1.sonity.net/octy-analytics

EXPOSE 3000
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

RUN npx prisma migrate dev --name init

CMD ["npm", "run", "start"]

