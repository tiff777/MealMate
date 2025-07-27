FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_BASE_URL=http://localhost:5050/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npx vite build

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]