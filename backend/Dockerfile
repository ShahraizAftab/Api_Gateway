# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose the backend port (default 5010, but configurable via env)
EXPOSE 5010

# Set default port environment variable
ENV PORT=5010

# Start the server
CMD ["npm", "run", "dev"]