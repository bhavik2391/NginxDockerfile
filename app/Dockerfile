# Use lightweight Node base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy dependency file first (for caching)
COPY package.json .

# Install dependencies
RUN npm install

# Copy rest of application code
COPY . .

# Expose application port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
