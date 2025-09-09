# Build stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Copy source code
COPY tsconfig.json ./
COPY src ./src

# Build the TypeScript code
RUN npm run build

# Production stage
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Make the index.js executable
RUN chmod +x /app/build/index.js

# Set environment variables (can be overridden at runtime)
ENV DREAMFACTORY_URL=""
ENV DREAMFACTORY_API_KEY=""

# The MCP server communicates via stdio, so we use the default entrypoint
ENTRYPOINT ["node", "/app/build/index.js"]