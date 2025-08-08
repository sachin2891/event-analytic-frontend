# Use lightweight Node base image
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Allow Vite server to be accessible via Docker
RUN npm install -g vite

# Expose Vite default port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]
