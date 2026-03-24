FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the frontend
RUN npm run build

# Expose port
EXPOSE 7860

# Start the server
CMD ["node", "server.js"]