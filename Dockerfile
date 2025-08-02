# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install --production=false --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-slim


# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./



# Install dependencies with legacy-peer-deps to avoid NestJS schedule conflict
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist


# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start:prod"] 
